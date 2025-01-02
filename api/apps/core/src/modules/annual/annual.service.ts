import { PrismaService } from '@app/prisma';
import { PrismaGenericRepository } from '@asaje/prisma-generic-repository';
import { Injectable } from '@nestjs/common';
import { Annual, PaiementStatus, Prisma } from '@prisma/client';
import {
  CreateAnnual,
  CreateAnnualOwner,
  IdIndexPayload,
  MakeAnnualPaiement,
} from './annual.dto';
import { CloseTontine } from '../individual/individual.dto';
import { TimerConsumerService } from '@app/timer-consumer';
import { Env } from '@app/shared';

@Injectable()
export class AnnualService extends PrismaGenericRepository<
  Prisma.AnnualDelegate<any>,
  Annual,
  Prisma.AnnualUncheckedCreateInput,
  Prisma.AnnualUncheckedUpdateInput,
  Prisma.AnnualWhereInput,
  Prisma.AnnualSelect
> {
  constructor(
    private readonly prisma: PrismaService,
    private timer: TimerConsumerService,
  ) {
    super();
    this.model = this.prisma.annual;
  }

  calculateDeadline(date: string | Date, index: number, period: number) {
    const _date = new Date(date);
    const timestamp = _date.setDate(_date.getDate() + index * period);
    return new Date(timestamp);
  }

  async create(data: CreateAnnual) {
    const annual = await super.create(data);
    const indexes = new Array(data.periodSize).fill(0).map((_, i) => i);

    console.log(data.startAt, 'startAt');

    const startAt = new Date(data.startAt);
    for (const index of indexes) {
      const notificationDate = new Date(
        // new Date().setSeconds(startAt.getSeconds() + (1 * index + 30)),
        new Date(startAt).setDate(startAt.getDate() + (7 * index + 6)),
      );
      const penalityDate = new Date(
        // new Date().setSeconds(startAt.getSeconds() + (1 * index + 40)),
        new Date(startAt).setDate(startAt.getDate() + (7 * index + 8)),
      );

      await this.timer.registerTask({
        at: notificationDate.toISOString(),
        label: `Notification event for '${data.label}' annual tontine`,
        payload: { id: annual.id },
        callbackUrl: `${Env.msUrls.core}/annuals/send-notifications`,
      });

      await this.timer.registerTask({
        at: penalityDate.toISOString(),
        label: `Penality check event for '${data.label}' annual tontine`,
        payload: { id: annual.id, index: index + 1 },
        callbackUrl: `${Env.msUrls.core}/annuals/check-penalities`,
      });
    }
  }

  async sendNotifications(id: string) {
    const annualOwners = await this.prisma.annualOwner.findMany({
      where: { annualId: id },
      include: { owner: true },
    });
    // Send notification
    console.log(annualOwners);
  }

  async checkPenalities(id: string, data: IdIndexPayload) {
    const annualOwners = await this.prisma.annualOwner.findMany({
      where: { annualId: data.id },
      include: { owner: true },
    });

    console.log('\n\n');
    console.log('Owners', annualOwners.length);

    for (const annualOwner of annualOwners) {
      const paiement = await this.prisma.annualOwnerPaiement.findFirst({
        where: { annualOwnerId: annualOwner.id, index: data.index },
      });
      console.log('Paiement status, ', paiement.status, annualOwner.label);
      if (paiement.status === PaiementStatus.INACTIVE) {
        await this.prisma.annualOwnerPaiement.update({
          where: { id: paiement.id },
          data: { status: PaiementStatus.DEBT },
        });
      }
    }

    await this.timer.completeTask(id);
  }

  async joinAnnual(data: CreateAnnualOwner) {
    const annual = await this.getById(data.annualId);
    const counts = new Array(data.count).fill(0).map((_, i: number) => i + 1);
    delete data.count;

    for (const count of counts) {
      const annualOwner = await this.prisma.annualOwner.create({
        data: {
          ...data,
          label: `${annual.label}${count === 1 ? '' : ' - Mise ' + count}`,
        },
      });

      const indexes = new Array(annual.periodSize)
        .fill(0)
        .map((_, i: number) => i + 1);
      for (const index of indexes) {
        await this.prisma.annualOwnerPaiement.create({
          data: {
            annualOwnerId: annualOwner.id,
            index,
            deadline: this.calculateDeadline(annual.startAt, index, 7),
          },
        });
      }
    }
  }

  async userAnnuals(authId: string) {
    const count = await this.prisma.annualOwner.count({
      where: { ownerId: authId },
    });
    const values = await this.prisma.annualOwner.findMany({
      where: { ownerId: authId },
      include: { annual: true },
      orderBy: { createdAt: 'desc' },
    });
    return { count, values };
  }

  async userAnnual(id: string) {
    return await this.prisma.annualOwner.findFirst({
      where: { id },
      include: { paiements: true, annual: true },
    });
  }

  async updateCurrentlyPaid(id: string) {
    const currentlyPaid = await this.prisma.annualOwnerPaiement.findMany({
      where: { annualOwnerId: id, status: PaiementStatus.PAID },
    });
    const annualOwner = await this.prisma.annualOwner.findUnique({
      where: { id },
    });
    const individual = await this.getById(annualOwner.annualId);
    return await this.prisma.annualOwner.update({
      where: { id },
      data: {
        currentlyPaid: currentlyPaid.length * individual.unitAmount,
      },
    });
  }

  async makePaiement({ annualOwnerId, indexes }: MakeAnnualPaiement) {
    const paiements = await this.prisma.annualOwnerPaiement.findMany({
      where: { annualOwnerId, index: { in: indexes } },
      select: { id: true },
    });

    const ids = paiements.map((p) => p.id);

    return await this.prisma.annualOwnerPaiement.updateMany({
      where: { id: { in: ids } },
      data: { status: PaiementStatus.PENDING, initiateAt: new Date() },
    });
  }

  async confirmPaiement(id: string) {
    const result = await this.prisma.annualOwnerPaiement.update({
      where: { id },
      data: { status: PaiementStatus.PAID, confirmedAt: new Date() },
    });
    this.updateCurrentlyPaid(result.annualOwnerId);
    return result;
  }

  async confirmAllPaiements(id: string) {
    const result = await this.prisma.annualOwnerPaiement.updateMany({
      where: {
        annualOwnerId: id,
        status: PaiementStatus.PENDING,
      },
      data: { status: PaiementStatus.PAID, confirmedAt: new Date() },
    });
    this.updateCurrentlyPaid(id);
    return result;
  }

  async unconfirmPaiement(id: string) {
    return await this.prisma.annualOwnerPaiement.update({
      where: { id },
      data: { status: PaiementStatus.INACTIVE },
    });
  }

  async unconfirmAllPaiements(id: string) {
    return await this.prisma.annualOwnerPaiement.updateMany({
      where: {
        annualOwnerId: id,
        status: PaiementStatus.PENDING,
      },
      data: { status: PaiementStatus.INACTIVE },
    });
  }

  async initiateClosing(id: string, data: CloseTontine) {
    const annual = await this.prisma.annualOwner.findUnique({
      where: { id },
      include: { annual: true },
    });
    await this.prisma.endTontine.create({
      data: {
        amount: annual.annual.totalAmountToGive,
        receiver: data.phone,
        authId: data.authId,
        tontine: id,
      },
    });
    return await this.prisma.annualOwner.update({
      where: { id },
      data: { isClosing: true },
    });
  }

  async confirmClosing(id: string) {
    const endTontine = await this.prisma.endTontine.findFirst({
      where: { tontine: id },
    });
    if (endTontine) {
      await this.prisma.endTontine.update({
        where: { id: endTontine.id },
        data: { confirmed: true },
      });
    }
    return await this.prisma.annualOwner.update({
      where: { id },
      data: { closed: true, isClosing: false },
    });
  }

  async getAllPendings() {
    return await this.prisma.annualOwnerPaiement.findMany({
      where: { status: PaiementStatus.PENDING },
      include: { annualOwner: { include: { annual: true, owner: true } } },
      orderBy: { index: 'asc' },
    });
  }
}
