import { RouteObject } from 'react-router-dom';
import { Role } from '../api/enums';

export type RouteItem = RouteObject & {
  icon?: string;
  name?: string;
  hide?: boolean;
  roleAccess?: Role[];
};
