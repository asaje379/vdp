/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormBuilderConfig, FormBuilderItem } from './typings';

export function makeFormFromFields(
  fields: Array<FormBuilderItem | FormBuilderItem[]>,
) {
  const form: Record<string, string | number> = {};
  for (const field of fields) {
    if (Array.isArray(field)) {
      for (const subField of field) {
        form[subField.name] = subField.defaultValue ?? '';
      }
      continue;
    }
    form[field.name] = field.defaultValue ?? '';
  }
  return form;
}

export function makeComponentFromField(
  config: FormBuilderConfig,
  field: FormBuilderItem,
  key: string,
  value: any,
  handleChange: (args: any) => void,
  update: (name: string, value: any) => void,
) {
  console.log(field.onChange, 'on-change');
  return config[field.input]({
    ...field,
    input: undefined,
    key,
    value,
    onChange: field.onChange
      ? (e: any) => {
          if (field.onChange)
            return field.onChange({
              name: field.name,
              field,
              value,
              update,
              event: e,
            });
        }
      : handleChange,
  } as never);
}
