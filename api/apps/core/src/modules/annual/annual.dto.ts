import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Frequency } from '@prisma/client';

export class CreateAnnual {
  @ApiProperty() label: string;
  @ApiProperty({ enum: Frequency }) frequency: Frequency;
  @ApiProperty() penalityAmount: number;
  @ApiProperty() unitAmount: number;
  @ApiProperty() unitAmountWithFees: number;
  @ApiProperty() totalAmountToGive: number;
  @ApiProperty() totalAmount: number;
  @ApiProperty() benefice: number;
  @ApiProperty() periodSize: number;
  @ApiProperty() startAt: string;
}

export class UpdateAnnual {
  @ApiPropertyOptional() label?: string;
  @ApiPropertyOptional({ enum: Frequency }) frequency?: Frequency;
  @ApiPropertyOptional() penalityAmount?: number;
  @ApiPropertyOptional() unitAmount?: number;
  @ApiPropertyOptional() unitAmountWithFees?: number;
  @ApiPropertyOptional() totalAmountToGive?: number;
  @ApiPropertyOptional() totalAmount?: number;
  @ApiPropertyOptional() benefice?: number;
  @ApiPropertyOptional() periodSize?: number;
  @ApiPropertyOptional() startAt?: string;
}

export class CreateAnnualOwner {
  @ApiProperty() annualId: string;
  @ApiProperty() ownerId: string;
  @ApiProperty() count: number;
}

export class UpdateAnnualOwner {
  @ApiProperty() label: string;
}

export class MakeAnnualPaiement {
  @ApiProperty() annualOwnerId: string;
  @ApiProperty() indexes: number[];
}

export class IdPayload {
  @ApiProperty() id: string;
}

export class IdIndexPayload extends IdPayload {
  @ApiProperty() index: number;
}

export class CheckPenalityPayload {
  @ApiProperty() id: string;
  @ApiProperty() data: IdIndexPayload;
}
