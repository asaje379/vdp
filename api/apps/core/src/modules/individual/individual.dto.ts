import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Frequency } from '@prisma/client';

export class AmountCalculatorDto {
  @ApiProperty({ enum: Frequency })
  frequency: Frequency;

  @ApiProperty()
  unitAmount: number;

  @ApiPropertyOptional()
  periodSize?: number;
}

export class CreateIndividual extends AmountCalculatorDto {
  @ApiProperty()
  label: string;

  @ApiProperty()
  ownerId: string;
}

export class UpdateIndividual {
  @ApiProperty()
  label: string;
}

export class MakePaiement {
  @ApiProperty() individualId: string;
  @ApiProperty() indexes: number[];
}

export class CloseTontine {
  phone: string;
  authId: string;
  code: string;
}
