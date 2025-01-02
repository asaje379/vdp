import { PrismaService } from '@app/prisma';
import { PrismaGenericRepository } from '@asaje/prisma-generic-repository';
import { Injectable } from '@nestjs/common';
import { EndTontine, Prisma } from '@prisma/client';

@Injectable()
export class EndTontineService extends PrismaGenericRepository<
  Prisma.EndTontineDelegate<any>,
  EndTontine,
  Prisma.EndTontineUncheckedCreateInput,
  Prisma.EndTontineUncheckedUpdateInput,
  Prisma.EndTontineWhereInput,
  Prisma.EndTontineSelect
> {
  constructor(private readonly prisma: PrismaService) {
    super();
    this.model = this.prisma.endTontine;
  }

  async sync() {
    const endTontines = await this.prisma.endTontine.findMany();

    for (const endTontine of endTontines) {
      const individual = await this.prisma.individual.findFirst({
        where: { id: endTontine.tontine },
      });
      if (individual) {
        await this.prisma.endTontine.update({
          where: { id: endTontine.id },
          data: { individualId: endTontine.tontine },
        });
      } else {
        const annual = await this.prisma.annual.findFirst({
          where: { id: endTontine.tontine },
        });
        if (annual) {
          await this.prisma.endTontine.update({
            where: { id: endTontine.id },
            data: { annualId: endTontine.tontine },
          });
        }
      }
    }
  }
}
