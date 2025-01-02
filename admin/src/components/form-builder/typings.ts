/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';

export type FormBuilderConfig = Record<string, (args: never) => ReactNode>;
export type FormChangeEvent = {
  name: string;
  field: FormBuilderItem;
  value: any;
  update: (name: string, value: any) => void;
  event: any;
};
export type FormBuilderItem = {
  input: string;
  name: string;
  label?: string;
  defaultValue?: string | number;
  [key: string]: string | number | undefined | ((args: any) => void);
  onChange?: (args: FormChangeEvent) => void;
};

export type FormBuilderProps = {
  config: FormBuilderConfig;
  fields: Array<FormBuilderItem | FormBuilderItem[]>;
};
