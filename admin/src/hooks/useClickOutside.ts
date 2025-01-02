import { useEffect, useRef } from 'react';

export function useClickOutside(cb: () => void | Promise<void>) {
  const targetRef = useRef(null);

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (targetRef && targetRef.current) {
        const target = targetRef.current as HTMLElement;
        if (!target.contains(e.target as HTMLElement)) {
          cb();
        }
      }
    };

    document.addEventListener('click', listener);

    return () => {
      document.removeEventListener('click', listener);
    };
  }, []);

  return targetRef;
}
