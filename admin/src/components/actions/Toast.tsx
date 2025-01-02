import { PropsWithChildren } from 'react';
import { Icon } from '../display/Icon';

type ToastProps = {
  type: 'success' | 'error';
};

const style = {
  success: {
    bgBar: 'bg-green-500',
    bg: 'bg-green-100',
    icon: 'check_circle',
    iconText: 'text-green-700',
  },
  error: {
    bgBar: 'bg-red-500',
    bg: 'bg-red-100',
    icon: 'cancel',
    iconText: 'text-red-500',
  },
};

export const Toast = ({ type, children }: PropsWithChildren<ToastProps>) => {
  return (
    <div className="fixed bg-transparent flex justify-center z-40 top-4 left-0 w-full px-8">
      <div className="grid grid-cols-[8px_1fr] w-full lg:max-w-[40vw] shadow-xl">
        <div className={style[type].bgBar}></div>
        <div className={style[type].bg}>
          <div className="p-3 flex items-center gap-4">
            <Icon
              name={style[type].icon}
              className={style[type].iconText}
              size={28}
            />
            <div
              className={[style[type].iconText, 'font-semibold pr-4'].join(
                ' ',
              )}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
