import { FormEvent, PropsWithChildren } from 'react';

type FormProps = {
  onSubmit?: () => void | Promise<void>;
  className?: string;
};

export const Form = ({
  onSubmit,
  children,
  className = '',
}: PropsWithChildren<FormProps>) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) onSubmit();
  };

  return (
    <form
      className={className}
      onSubmit={handleSubmit}>
      {children}
    </form>
  );
};
