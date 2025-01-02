import { PropsWithChildren } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { MainWindow } from './MainWindow';
import { useAuth } from '../hooks/useAuth';

export const BaseLayout = ({ children }: PropsWithChildren) => {
  useAuth();

  return (
    <div className="w-screen h-screen grid grid-cols-1 md:grid-cols-[auto_1fr] bg-white">
      <Sidebar />
      <div className="grid grid-rows-[auto_1fr] md:grid-rows-1 min-w-0 min-h-0">
        <Topbar />
        <MainWindow>{children}</MainWindow>
      </div>
    </div>
  );
};
