import { GenericController } from '@app/base-controller';
import { IndividualService } from './individual.service';
import { ActionName, SecureController } from '@app/decorators';
import {
  Body,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  AmountCalculatorDto,
  CloseTontine,
  CreateIndividual,
  MakePaiement,
  UpdateIndividual,
} from './individual.dto';
import { PaginationWithFrequency } from '@app/shared/types/pagination';
import { sendPushEvent } from '@asaje/sse-push-event-server';
import { AuthService } from '../auth/auth.service';

const event = 'individuals.update';

@SecureController('individuals', 'Tontines individuelles')
export class IndividualController extends GenericController<IndividualService> {
  constructor(protected service: IndividualService, private auth: AuthService) {
    super(service);
  }

  @Get()
  @ActionName('Getting all individuals')
  findAll(@Query() args: PaginationWithFrequency) {
    return this.service.findAndCount({
      paginationArgs: args,
      paginationOptions: {
        search: ['label'],
        includes: ['owner', 'paiements'],
      },
      ...(args.frequency && { query: { frequency: args.frequency } }),
    });
  }

  @Get('owner/:id')
  @ActionName('Getting all individuals by owner')
  findAllByOwner(@Param('id') id: string) {
    return this.service.findAndCount({
      paginationArgs: { limit: -1 },
      paginationOptions: {
        search: ['label'],
      },
      query: { ownerId: id, closed: false },
    });
  }

  @Get('all/pendings')
  @ActionName('Getting all pending individuals')
  findAllPendings() {
    return this.service.getAllPendings();
  }

  @Get('calculate-amount')
  @ActionName('Calculation of amount')
  calculateAmount(@Query() data: AmountCalculatorDto) {
    return this.service.calculateAmount(data);
  }

  @Post()
  @ActionName('Create a new individual tontine')
  async create(@Body() data: CreateIndividual) {
    const result = await this.service.createIndividual(data);
    sendPushEvent({ event, data: {} });
    return result;
  }

  @Get(':id')
  @ActionName('Getting one')
  async findOne(@Param('id') id: string) {
    const data = await this.service.getById(id, {
      include: { paiements: true, owner: true },
    });
    if (!data) {
      throw new NotFoundException();
    }
    return data;
  }

  @Patch(':id')
  async update(@Body() data: UpdateIndividual, @Param('id') id: string) {
    const result = await this.service.update(id, data);
    sendPushEvent({ event, data: {} });
    return result;
  }

  @Post('make-paiement')
  async makePaiement(@Body() data: MakePaiement) {
    const result = await this.service.makePaiement(data);
    sendPushEvent({ event, data: {} });
    return result;
  }

  @Patch('confirm-paiement/:id')
  async confirmPaiement(@Param('id') id: string) {
    const result = await this.service.confirmPaiement(id);
    sendPushEvent({ event, data: {} });
    return result;
  }

  @Patch('confirm-all-paiements/:id')
  async confirmAllPaiements(@Param('id') id: string) {
    const result = await this.service.confirmAllPaiements(id);
    sendPushEvent({ event, data: {} });
    return result;
  }

  @Patch('unconfirm-paiement/:id')
  async unconfirmPaiement(@Param('id') id: string) {
    const result = await this.service.unconfirmPaiement(id);
    sendPushEvent({ event, data: {} });
    return result;
  }

  @Patch('unconfirm-all-paiements/:id')
  async unconfirmAllPaiements(@Param('id') id: string) {
    const result = await this.service.unconfirmAllPaiements(id);
    sendPushEvent({ event, data: {} });
    return result;
  }

  @Patch('init-closing/:id')
  async initClosing(@Param('id') id: string, @Body() data: CloseTontine) {
    const isValidPassword = await this.auth.isValidPassword(
      data.authId,
      data.code,
    );
    if (!isValidPassword) throw new ForbiddenException('Invalid code');
    const result = await this.service.initiateClosing(id, data);
    sendPushEvent({ event, data: {} });
    return result;
  }

  @Patch('confirm-closing/:id')
  async confirmClosing(@Param('id') id: string) {
    const result = await this.service.confirmClosing(id);
    sendPushEvent({ event, data: {} });
    return result;
  }
}
