import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BasicRole } from '@prisma/client';
import { IsEmail, IsEnum, IsOptional, Matches } from 'class-validator';

export class BasicAuthId {
  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional()
  email?: string;

  @IsOptional()
  @ApiPropertyOptional()
  username?: string;
}

export class BasicAuthRegister extends BasicAuthId {
  @IsEnum(BasicRole)
  @ApiProperty({ enum: BasicRole })
  role: BasicRole;

  @ApiProperty() phone: string;
  @ApiProperty() password: string;
  @ApiProperty() fullname: string;
}

export class BasicAuthCredentials extends BasicAuthId {
  @ApiProperty()
  password: string;
}

export class BasicAuthSetPassword {
  @ApiProperty() id: string;
  @ApiProperty()
  password: string;
}

export class CallbackUrlHeader {
  @IsOptional()
  @Matches(/^(https?):\/\/.*/, { message: 'callbackUrl is not a valid URL' })
  @ApiPropertyOptional()
  callbackUrl: string;
}
