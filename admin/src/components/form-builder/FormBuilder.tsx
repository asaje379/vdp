import { ChangeEvent, useState } from 'react';
import { Form } from '../form-fields/Form';
import { FormBuilderProps } from './typings';
import { makeComponentFromField, makeFormFromFields } from './helpers';
import { Button } from '../buttons/Button';

export const FormBuilder = ({ config, fields }: FormBuilderProps) => {
  const [form, setForm] = useState(makeFormFromFields(fields));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const update = (name: string, value: any) => {
    console.log(name, value);
    setForm({ ...form, [name]: value });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    update(name, value);
  };

  const handleSubmit = () => {
    console.log(form, 'form');
  };

  return (
    <Form onSubmit={handleSubmit}>
      {fields.map((field, index) => {
        if (Array.isArray(field)) {
          return (
            <div
              className="flex gap-3"
              key={'__fb_k_' + index}>
              {field.map((subField, subIndex) =>
                makeComponentFromField(
                  config,
                  subField,
                  '__fb_k_' + index + '_' + subIndex,
                  form[subField.name],
                  handleChange,
                  update,
                ),
              )}
            </div>
          );
        }
        return makeComponentFromField(
          config,
          field,
          '__fb_k_' + index,
          form[field.name],
          handleChange,
          update,
        );
      })}
      <Button type="submit">Submit</Button>
    </Form>
  );
};
