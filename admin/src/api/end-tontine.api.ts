import { BaseApi } from './base.api';
import { EndTontine } from './typings';

export class EndTontineApi extends BaseApi<EndTontine, unknown> {
  constructor() {
    super('end-tontines');
  }
}

export const endTontineApi = new EndTontineApi();
