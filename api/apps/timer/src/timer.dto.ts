import { ApiProperty } from '@nestjs/swagger';

export class CreateTimer {
  @ApiProperty() label: string;
  @ApiProperty() at: string;
  @ApiProperty() payload: any;
  @ApiProperty() callbackUrl: string;
}
