import { PropsWithChildren } from 'react';

export const PageCard = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow border">{children}</div>
  );
};
