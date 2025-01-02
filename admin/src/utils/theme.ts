import { Option } from '../components/form-fields/Select';

export type ActionTheme = 'success' | 'warning' | 'error' | 'info';
export type Theme =
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'primary'
  | 'outlined'
  | 'maroon'
  | 'disabled';

export type Size = 'small' | 'medium' | 'large' | 'huge';
export type Status = 'NEW' | 'PENDING' | 'SUCCESS' | 'ERROR';

export const renderOption = (option: Option, optionLabel?: string) => {
  if (['string', 'number'].includes(typeof option)) {
    return option as string;
  }

  if (!optionLabel)
    throw new Error(
      '`optionLabel` is required when working with object option',
    );

  const _option = option as Record<string, string>;
  if (!('id' in _option))
    throw new Error('`id` is required when working with object option');

  return _option[optionLabel];
};

export const cssByPosition = {
  t: 'p-2 flex max-h-[200px] overflow-auto flex-col gap-3 bg-white d-shadow w-full mt-1 bg-white z-10 bottom-full mb-12 absolute rounded',
  b: 'p-2 flex max-h-[200px] overflow-auto flex-col gap-3 bg-white d-shadow w-full mt-1 bg-white z-10 absolute rounded',
};
