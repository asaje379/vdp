import { PropsWithChildren } from 'react';
import { ModalProps } from './constants';
import { Icon } from '../../display/Icon';

export const Modal = ({
  open,
  children,
  header,
  footer,
  closable,
  onClose = () => {},
}: PropsWithChildren<ModalProps>) => {
  if (!open) return <></>;

  return (
    <div className="fixed inset-0 bg-[#0000007F] flex justify-center">
      <div className="grid grid-rows-[auto_1fr_auto] h-fit w-fit bg-white min-w-0 min-h-0 w-[90vw] md:max-w-[50vw] max-h-[80vh] mt-[10vh] rounded shadow-xl">
        {header && (
          <div className="flex justify-between items-center p-4">
            <div className="font-semibold">{header}</div>
            {closable && (
              <div
                className="text-error"
                onClick={onClose}>
                <Icon
                  size={20}
                  name="close"
                />
              </div>
            )}
          </div>
        )}
        <div className="min-w-0 min-h-0 overflow-auto">{children}</div>
        <div>{footer}</div>
      </div>
    </div>
  );
};
