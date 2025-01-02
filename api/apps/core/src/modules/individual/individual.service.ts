import { PrismaService } from '@app/prisma';
import { PrismaGenericRepository } from '@asaje/prisma-generic-repository';
import { Injectable } from '@nestjs/common';
import { Individual, PaiementStatus, Prisma } from '@prisma/client';
import {
  AmountCalculatorDto,
  CloseTontine,
  CreateIndividual,
  MakePaiement,
} from './individual.dto';
import { frequencyMapping } from './individual.vars';

@Injectable()
export class IndividualService extends PrismaGenericRepository<
  Prisma.IndividualDelegate<any>,
  Individual,
  Prisma.IndividualUncheckedCreateInput,
  Prisma.IndividualUncheckedUpdateInput,
  Prisma.IndividualWhereInput,
  Prisma.IndividualSelect
> {
  constructor(private readonly prisma: PrismaService) {
    super();
    this.model = this.prisma.individual;
  }

  calculateAmount({ frequency, unitAmount, periodSize }: AmountCalculatorDto) {
    return frequencyMapping[frequency](unitAmount, periodSize).execute();
  }

  async createIndividual({
    frequency,
    unitAmount,
    periodSize,
    label,
    ownerId,
  }: CreateIndividual) {
    const amountInfo = this.calculateAmount({
      frequency,
      unitAmount,
      periodSize,
    });
    const individual = await this.create({
      label,
      frequency,
      ownerId,
      ...amountInfo,
    });

    const indexes = new Array(amountInfo.periodSize)
      .fill(0)
      .map((_, i: number) => i + 1);
    for (const index of indexes) {
      await this.prisma.individualPaiement.create({
        data: { index, individualId: individual.id },
      });
    }

    return individual;
  }

  async updateCurrentlyPaid(id: string) {
    const currentlyPaid = await this.prisma.individualPaiement.findMany({
      where: { individualId: id, status: PaiementStatus.PAID },
    });
    const individual = await this.getById(id);
    return await this.update(id, {
      currentlyPaid: currentlyPaid.length * individual.unitAmount,
    });
  }

  async makePaiement({ individualId, indexes }: MakePaiement) {
    const paiements = await this.prisma.individualPaiement.findMany({
      where: { individualId, index: { in: indexes } },
      select: { id: true },
    });

    const ids = paiements.map((p) => p.id);

    return await this.prisma.individualPaiement.updateMany({
      where: { id: { in: ids } },
      data: { status: PaiementStatus.PENDING, initiateAt: new Date() },
    });
  }

  async confirmPaiement(id: string) {
    const result = await this.prisma.individualPaiement.update({
      where: { id },
      data: { status: PaiementStatus.PAID, confirmedAt: new Date() },
    });
    this.updateCurrentlyPaid(result.individualId);
    return result;
  }

  async confirmAllPaiements(id: string) {
    const result = await this.prisma.individualPaiement.updateMany({
      where: {
        individualId: id,
        status: PaiementStatus.PENDING,
      },
      data: { status: PaiementStatus.PAID, confirmedAt: new Date() },
    });
    this.updateCurrentlyPaid(id);
    return result;
  }

  async unconfirmPaiement(id: string) {
    return await this.prisma.individualPaiement.update({
      where: { id },
      data: { status: PaiementStatus.INACTIVE },
    });
  }

  async unconfirmAllPaiements(id: string) {
    return await this.prisma.individualPaiement.updateMany({
      where: {
        individualId: id,
        status: PaiementStatus.PENDING,
      },
      data: { status: PaiementStatus.INACTIVE },
    });
  }

  async initiateClosing(id: string, data: CloseTontine) {
    const individual = await this.getById(id);
    await this.prisma.endTontine.create({
      data: {
        amount: individual.totalAmountToGive,
        receiver: data.phone,
        authId: data.authId,
        tontine: id,
      },
    });
    return await this.update(id, { isClosing: true });
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
    return await this.update(id, { closed: true, isClosing: false });
  }

  async getAllPendings() {
    return await this.prisma.individualPaiement.findMany({
      where: { status: PaiementStatus.PENDING },
      include: { individual: { include: { owner: true } } },
      orderBy: { index: 'asc' },
    });
  }
}
