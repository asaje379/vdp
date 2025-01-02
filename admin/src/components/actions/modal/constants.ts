import { PropsWithChildren, ReactNode, createContext, useContext } from 'react';

export interface ModalArgs {
  header?: ReactNode;
  footer?: ReactNode;
  closable?: boolean;
}

export interface ModalProps extends ModalArgs {
  open: boolean;
  header?: ReactNode;
  footer?: ReactNode;
  closable?: boolean;
  onClose?: () => void | Promise<void>;
}

export interface ModalContextArgs {
  openModal: (args: PropsWithChildren<ModalArgs>) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextArgs>({
  openModal: console.log,
  closeModal: console.log,
});

export const useModal = () => useContext(ModalContext);

export type CloseModalProps = {
  onClose?: () => void | Promise<void>;
};
