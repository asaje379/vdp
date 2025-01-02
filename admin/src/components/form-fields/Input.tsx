import { ChangeEvent, InputHTMLAttributes } from 'react';
import { Icon } from '../display/Icon';
import {
  ValidatorFn,
  ValidationResults,
  Validator,
} from '@asaje/form-validator';

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  icon?: string;
  iconSize?: number;
  onIconClicked?: () => void | Promise<void>;
  area?: boolean;
  rows?: number;
  validations?: ValidatorFn[];
  onValidationStateChanged?: (
    result: ValidationResults,
  ) => void | Promise<void>;
}

export const Input = ({
  label,
  type = 'text',
  icon,
  onIconClicked,
  iconSize = 18,
  area = false,
  validations,
  onValidationStateChanged,
  ...props
}: InputProps) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    console.log('here');
    const { value } = e.target;

    const newState: ValidationResults = Validator.validate(
      value,
      validations ?? [],
    );
    if (onValidationStateChanged) onValidationStateChanged(newState);
    if (props.onChange) props.onChange(e);
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-gray-500 font-semibold text-sm">{label}</label>
      <div className="grid grid-cols-[1fr_auto] bg-gray-50 border rounded-lg border-slate-400">
        {area ? (
          <textarea
            {...props}
            onChange={handleChange}
            className={
              props.className +
              ' outline-none p-2 bg-transparent w-full text-sm text-dark'
            }
          />
        ) : (
          <input
            type={type}
            {...props}
            onChange={handleChange}
            className={
              props.className +
              ' outline-none p-2 bg-transparent w-full text-sm text-dark'
            }
          />
        )}
        {icon && (
          <div
            className="px-3 flex justify-center items-center"
            onClick={onIconClicked}>
            <Icon
              size={iconSize}
              className="text-gray-400"
              name={icon}
            />
          </div>
        )}
      </div>
    </div>
  );
};
