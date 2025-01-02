import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { Toast } from '../actions/Toast';

type CreateToast = {
  type: 'success' | 'error';
  info: string;
  duration?: number;
};

const ToastContext = createContext<(args: CreateToast) => void>(() => {});

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [opened, isOpened] = useState(false);
  const [type, setType] = useState<'success' | 'error'>('success');
  const [msg, setMsg] = useState('');

  const openToast = (args: CreateToast) => {
    setType(args.type);
    setMsg(args.info);
    isOpened(true);
    setTimeout(() => {
      isOpened(false);
    }, (args.duration ?? 5) * 1000);
  };

  return (
    <ToastContext.Provider value={openToast}>
      {children}
      {opened && <Toast type={type}>{msg}</Toast>}
    </ToastContext.Provider>
  );
};
