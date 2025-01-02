import { PropsWithChildren } from 'react';
import { ModalProvider } from './components/actions/modal/ModalProvider';
import { ToastProvider } from './components/providers/ToastProvider';

export const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <ModalProvider>
      <ToastProvider>{children}</ToastProvider>
    </ModalProvider>
  );
};
