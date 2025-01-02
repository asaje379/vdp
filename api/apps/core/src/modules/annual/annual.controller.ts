import { GenericController } from '@app/base-controller';
import { ActionName, SecureController } from '@app/decorators';
import { AnnualService } from './annual.service';
import {
  Body,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  CheckPenalityPayload,
  CreateAnnual,
  CreateAnnualOwner,
  IdPayload,
  MakeAnnualPaiement,
  UpdateAnnual,
} from './annual.dto';
import { sendPushEvent } from '@asaje/sse-push-event-server';
import { Pagination } from '@app/shared/types/pagination';
import { CloseTontine } from '../individual/individual.dto';
import { AuthService } from '../auth/auth.service';

const event = 'annuals.update';

@SecureController('annuals')
export class AnnualController extends GenericController<AnnualService> {
  constructor(protected service: AnnualService, private auth: AuthService) {
    super(service);
  }

  @Post()
  @ActionName('Create new annual tontine')
  async createAnnual(@Body() data: CreateAnnual) {
    const result = await this.service.create(data);
    sendPushEvent({ event, data: {} });
    return result;
  }

  @Patch(':id')
  @ActionName('Update annual tontine')
  async updateAnnual(@Body() data: UpdateAnnual, @Param('id') id: string) {
    const result = await this.service.update(id, data);
    sendPushEvent({ event, data: {} });
    return result;
  }

  @Get()
  @ActionName('Getting all annuals')
  findAll(@Query() args: Pagination) {
    return this.service.findAndCount({
      query: { closed: false },
      paginationArgs: args,
      paginationOptions: {
        search: ['label'],
      },
    });
  }

  @Get('all/pendings')
  @ActionName('Getting all pending annuals')
  findAllPendings() {
    return this.service.getAllPendings();
  }

  @Get(':id')
  @ActionName('Getting all user annuals')
  findOne(@Param('id') id: string) {
    return this.service.getById(id, {
      include: { annualOwners: { include: { annual: true, owner: true } } },
    });
  }

  @Get('owner/:id')
  @ActionName('Getting all user annuals')
  findAllOwnedBy(@Param('id') id: string) {
    return this.service.userAnnuals(id);
  }

  @Get('annual/:id')
  @ActionName('Getting user annual')
  findUserAnnual(@Param('id') id: string) {
    return this.service.userAnnual(id);
  }

  @Post('join')
  @ActionName('Join new annual tontine')
  async joinAnnual(@Body() data: CreateAnnualOwner) {
    const result = await this.service.joinAnnual(data);
    sendPushEvent({ event, data: {} });
    return result;
  }

  @Post('make-paiement')
  async makePaiement(@Body() data: MakeAnnualPaiement) {
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

  @Post('send-notifications')
  async sendNotifications(@Body() { id }: IdPayload) {
    return await this.service.sendNotifications(id);
  }

  @Post('check-penalities')
  async checkPenalities(@Body() { id, data }: CheckPenalityPayload) {
    console.log('\n\n Checking penality', data, typeof data);
    const result = await this.service.checkPenalities(id, data);
    sendPushEvent({ event, data: {} });
    return result;
  }
}
