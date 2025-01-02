import { PropsWithChildren } from 'react';

export const Card = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-white rounded p-2 border border-slate-200 my-6">
      {children}
    </div>
  );
};
