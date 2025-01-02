import { api } from '.';
import { BaseApi } from './base.api';
import { CreateAnnual, UpdateAnnual } from './typings';

export class AnnualApi extends BaseApi<CreateAnnual, UpdateAnnual> {
  constructor() {
    super('annuals');
  }

  async findAllPending() {
    try {
      const response = await api.get(`${this.basePath}/all/pendings`);
      return response.data;
    } catch (error) {
      return [];
    }
  }

  async confirmPaiement(id: string) {
    if (id) {
      try {
        const response = await api.patch(
          `${this.basePath}/confirm-paiement/${id}`,
        );
        return response.data;
      } catch (error) {
        return { count: 0, values: [] };
      }
    }
  }

  async unconfirmPaiement(id: string) {
    if (id) {
      try {
        const response = await api.patch(
          `${this.basePath}/unconfirm-paiement/${id}`,
        );
        return response.data;
      } catch (error) {
        return { count: 0, values: [] };
      }
    }
  }

  async confirmClosing(id: string) {
    if (id) {
      try {
        const response = await api.patch(
          `${this.basePath}/confirm-closing/${id}`,
        );
        return response.data;
      } catch (error) {
        return { count: 0, values: [] };
      }
    }
  }
}

export const annualApi = new AnnualApi();
