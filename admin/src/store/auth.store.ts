import { defineBearerToken } from '../api';
import { authApi } from '../api/auth.api';
import { Role } from '../api/enums';
import { Auth } from '../api/typings';

const authStorageKey = '__dgefc_auth_info__';

export class AuthStore {
  private static currentUser: Auth | null;

  static async init() {
    const inLocalStore = localStorage.getItem(authStorageKey);
    if (!inLocalStore) return undefined;
    const token = JSON.parse(inLocalStore).token;
    return await AuthStore.set(token);
  }

  static get() {
    if (AuthStore.currentUser) return AuthStore.currentUser;
    return undefined;
  }

  static async set(token: string) {
    defineBearerToken(token);
    const auth = await authApi.me();
    if (!auth) return undefined;

    localStorage.setItem(authStorageKey, JSON.stringify({ token }));
    AuthStore.currentUser = auth;
    return auth;
  }

  static logout() {
    localStorage.removeItem(authStorageKey);
  }

  static isOneOf(roles: Role[]) {
    const user = AuthStore.get();
    if (!user) return false;
    return roles.includes(user.role);
  }
}
