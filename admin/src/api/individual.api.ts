import { api } from '.';
import { BaseApi } from './base.api';
import { CreateIndividual, Individual } from './typings';

export class IndividualApi extends BaseApi<Individual, CreateIndividual> {
  constructor() {
    super('individuals');
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

export const individualApi = new IndividualApi();
