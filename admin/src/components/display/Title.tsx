import { PropsWithChildren } from 'react';

export const Title = ({ children }: PropsWithChildren) => {
  return <div className="font-semibold text-blue-900 text-xl">{children}</div>;
};
