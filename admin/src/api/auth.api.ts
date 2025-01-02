import { api } from '.';
import { CountedList, WithId } from '../helpers/typings';
import {
  Auth,
  AuthLogin,
  AuthLoginResponse,
  AuthRegister,
  Pagination,
} from './typings';

export class AuthApi {
  private basePath: string = 'auth';

  async register(data: AuthRegister) {
    try {
      const response = await api.post(`${this.basePath}/register`, data);
      return response.data as WithId<Auth>;
    } catch (error) {
      return undefined;
    }
  }

  async login(data: AuthLogin) {
    try {
      const response = await api.post(`${this.basePath}/login`, data);
      return response.data as AuthLoginResponse;
    } catch (error) {
      return undefined;
    }
  }

  async findAll(args: Pagination) {
    try {
      const response = await api.get(this.basePath, { params: args });
      return response.data as CountedList<Auth>;
    } catch (error) {
      return { count: 0, values: [] };
    }
  }

  async me() {
    try {
      const response = await api.get(`${this.basePath}/me`);
      return response.data as Auth;
    } catch (error) {
      return undefined;
    }
  }

  async findOne(id: string) {
    try {
      const response = await api.get(`${this.basePath}/${id}`);
      return response.data as WithId<Auth>;
    } catch (error) {
      return undefined;
    }
  }

  async update(id: string, data: Partial<AuthRegister>) {
    try {
      const response = await api.patch(`${this.basePath}/${id}`, data);
      return response.data as WithId<Auth>;
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

export const authApi = new AuthApi();
