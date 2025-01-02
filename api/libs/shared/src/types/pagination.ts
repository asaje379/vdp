import { ApiPropertyOptional } from '@nestjs/swagger';
import { Frequency } from '@prisma/client';

export class Pagination {
  @ApiPropertyOptional() page?: number;
  @ApiPropertyOptional() limit?: number;
  @ApiPropertyOptional() search?: string;
  @ApiPropertyOptional() from?: string;
  @ApiPropertyOptional() to?: string;
  @ApiPropertyOptional() take?: number;
  @ApiPropertyOptional() skip?: number;
}

export class PaginationWithFrequency extends Pagination {
  @ApiPropertyOptional() frequency?: Frequency;
}
