import { api } from '.';
import { CountedList, WithId } from '../helpers/typings';
import { Pagination } from './typings';

export class BaseApi<T, U> {
  protected basePath: string = '';

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  async create(data: U) {
    try {
      const response = await api.post(this.basePath, data);
      return response.data as WithId<T>;
    } catch (error) {
      return undefined;
    }
  }

  async createMany(data: U[]) {
    const response = await api.post(`${this.basePath}/many`, data);
    return response.data as WithId<T>[];
  }

  async findAll(args: Pagination) {
    try {
      const response = await api.get(this.basePath, { params: args });
      return response.data as CountedList<T>;
    } catch (error) {
      return { count: 0, values: [] };
    }
  }

  async findOne(id?: string) {
    try {
      const response = await api.get(`${this.basePath}/${id}`);
      return response.data as WithId<T>;
    } catch (error) {
      return undefined;
    }
  }

  async update(id: string, data: Partial<U>) {
    try {
      const response = await api.patch(`${this.basePath}/${id}`, data);
      return response.data as WithId<T>;
    } catch (error) {
      return undefined;
    }
  }

  async archiveOne(id: string) {
    await api.delete(`${this.basePath}/${id}`);
  }

  async archiveMany(ids: string[]) {
    await api.put(`${this.basePath}/many`, { ids });
  }

  async removeOne(id: string) {
    await api.delete(`${this.basePath}/${id}/force`);
  }

  async removeMany(ids: string[]) {
    await api.put(`${this.basePath}/force/many`, { ids });
  }
}
