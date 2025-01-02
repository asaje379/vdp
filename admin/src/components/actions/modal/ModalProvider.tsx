import { PropsWithChildren, ReactNode, useState } from 'react';
import { ModalArgs, ModalContext } from './constants';
import { Modal } from './Modal';

export const ModalProvider = ({ children }: PropsWithChildren) => {
  const [open, isOpened] = useState(false);
  const [header, setHeader] = useState<ReactNode>(null);
  const [footer, setFooter] = useState<ReactNode>(null);
  const [_children, setChildren] = useState<ReactNode>(null);
  const [closable, isClosable] = useState(false);

  const openModal = ({
    closable,
    header,
    footer,
    children,
  }: PropsWithChildren<ModalArgs>) => {
    isOpened(true);
    setHeader(header);
    setFooter(footer);
    isClosable(closable ?? false);
    setChildren(children);
  };

  const closeModal = () => {
    isOpened(false);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      <div>{children}</div>
      <Modal
        {...{ open, header, footer, closable }}
        onClose={closeModal}>
        {_children}
      </Modal>
    </ModalContext.Provider>
  );
};
