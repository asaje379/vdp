import { PropsWithChildren } from 'react';

export const H1 = ({ children }: PropsWithChildren) => {
  return <h1 className="text-2xl font-bold text-gray-600">{children}</h1>;
};
