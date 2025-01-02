import { Frequency, Role } from './enums';

export interface Pagination {
  page?: number;
  limit?: number;
  search?: string;
  from?: string;
  to?: string;
  take?: number;
  skip?: number;
  frequency?: Frequency;
}

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
  enabled: string;
}

//===================== Auth
export interface AuthId {
  email?: string;
  username?: string;
  fullname?: string;
  phone?: string;
}

export interface AuthRegister extends AuthId {
  role?: Role;
}

export interface AuthLogin extends AuthId {
  password: string;
}

export interface AuthSetPassword {
  id: string;
  password: string;
}

export interface Auth extends BaseEntity {
  email: string;
  username?: string;
  fullname?: string;
  role: Role;
  isVerified?: boolean;
  phone?: string;
}

export interface AuthLoginResponse {
  token: string;
  credentials: {
    email: string;
    username?: string;
    id: string;
    role: Role;
  };
}
//===================== End Auth

export type WithBase<T> = BaseEntity & T;

export type AmountCalculator = {
  frequency: Frequency;
  unitAmount: number;
  periodSize?: number;
};

export type CreateIndividual = AmountCalculator & {
  label: string;
  ownerId: string;
};

export type UpdateIndividual = {
  label: string;
};

export type MakePaiement = {
  individualId: string;
  indexes: number[];
};

export type CloseTontine = {
  phone: string;
  authId: string;
  code: string;
};

export type CreateAnnual = {
  label: string;
  frequency: Frequency;
  penalityAmount: number;
  unitAmount: number;
  unitAmountWithFees: number;
  totalAmountToGive: number;
  totalAmount: number;
  benefice: number;
  periodSize: number;
  startAt: string;
};

export type UpdateAnnual = {
  label?: string;
  frequency?: Frequency;
  penalityAmount?: number;
  unitAmount?: number;
  unitAmountWithFees?: number;
  totalAmountToGive?: number;
  totalAmount?: number;
  benefice?: number;
  periodSize?: number;
  startAt?: string;
};

export type CreateAnnualOwner = {
  annualId: string;
  ownerId: string;
  count: number;
};

export type UpdateAnnualOwner = {
  label: string;
};

export type MakeAnnualPaiement = {
  annualOwnerId: string;
  indexes: number[];
};

export type IdPayload = {
  id: string;
};

export type IdIndexPayload = IdPayload & {
  index: number;
};

export type CheckPenalityPayload = {
  id: string;
  data: IdIndexPayload;
};

export interface Individual extends BaseEntity {
  label: string;
  frequency: Frequency;
  unitAmount: number;
  unitAmountWithFees: number;
  totalAmountToGive: number;
  totalAmount: number;
  benefice: number;
  periodSize: number;
  currentlyPaid: number;
  ownerId: string;
  isClosing: boolean;
  closed: boolean;
  owner: BaseEntity & {
    username: string;
    email: string;
    phone: string;
    fullname: string;
  };
  paiements: { status: PaiementStatus }[];
}

export type Annual = CreateAnnual & { id: string; createdAt: string };
export type AnnualOwner = {
  id: string;
  label: string;
  annual: Annual;
  annualId: string;
  ownerId: string;
  paiements: AnnualOwnerPaiement[];
  currentlyPaid: number;
  isClosing: boolean;
};

export type AnnualPaiement = {
  confirmedAt: string;
  index: number;
  initiateAt: string;
  status: PaiementStatus;
  annualOwnerId: string;
};

export type AnnualOwnerPaiement = { id: string } & AnnualPaiement;

export enum PaiementStatus {
  DEBT = 'DEBT',
  UNPAID = 'UNPAID',
  PENDING = 'PENDING',
  PAID = 'PAID',
  INACTIVE = 'INACTIVE',
}

export interface EndTontine extends BaseEntity {
  receiver: string;
  auth: Auth;
  authId: string;
  amount: number;
  tontine: string;
  confirmed: boolean;
  annual?: Annual;
  individual?: Individual;
}
