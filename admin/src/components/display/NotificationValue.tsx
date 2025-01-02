import { PropsWithChildren } from 'react';
import { Icon } from './Icon';

type Props = {
  light?: boolean;
};

export const NotificationValue = ({
  children,
  light = false,
}: PropsWithChildren<Props>) => {
  return (
    <div className="relative w-fit">
      <div className={light ? 'text-gray-400' : 'text-maroon'}>
        <Icon
          name="notifications"
          size={28}
        />
      </div>
      {children && +children !== 0 && (
        <div className="absolute left-full -ml-2 -mt-3 bg-red-500 text-white rounded-full px-2 text-xs">
          {children}
        </div>
      )}
    </div>
  );
};
