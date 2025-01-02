import { Get, Query } from '@nestjs/common';
import { EndTontineService } from './end-tontine.service';
import { ActionName, SecureController } from '@app/decorators';
import { Pagination } from '@app/shared/types/pagination';

@SecureController('end-tontines')
export class EndTontineController {
  constructor(protected service: EndTontineService) {}

  @Get()
  @ActionName('Getting all end tontines')
  async findAll(@Query() args: Pagination) {
    await this.service.sync();
    return this.service.findAndCount({
      paginationArgs: args,
      paginationOptions: {
        includes: ['auth', 'individual', 'annual'],
      },
      query: { confirmed: false },
    });
  }

  @Get('sync')
  sync() {
    return this.service.sync();
  }
}
