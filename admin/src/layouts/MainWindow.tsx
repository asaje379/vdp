import { PropsWithChildren } from 'react';

export const MainWindow = ({ children }: PropsWithChildren) => {
  return <div className="p-6 md:p-8 overflow-auto">{children}</div>;
};
