import { PropsWithChildren, ReactNode, useState } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';

export type DropdownState = 'opened' | 'closed';

type Props = {
  content: ReactNode;
  onStateChanged?: (state: DropdownState) => void;
  contentContainerClass?: string;
};

export const Dropdown = ({
  children,
  content,
  contentContainerClass = 'w-full',
  onStateChanged = console.log,
}: PropsWithChildren<Props>) => {
  const [open, isOpened] = useState(false);

  const ref = useClickOutside(() => {
    isOpened(false);
    onStateChanged('closed');
  });

  const toggle = () => {
    isOpened((opened) => !opened);
    onStateChanged(open ? 'closed' : 'opened');
  };

  return (
    <div
      className="relative"
      ref={ref}
      onClick={toggle}>
      <div>{children}</div>
      <dialog
        className={contentContainerClass}
        open={open}>
        {content}
      </dialog>
    </div>
  );
};
