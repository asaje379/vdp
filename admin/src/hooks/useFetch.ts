import { addPushEventListener } from '@asaje/sse-push-event-client';
import { useEffect, useState } from 'react';

export type UseFetchArgs<T> = {
  defaultValue?: T;
  cb: (...args: never[]) => Promise<T>;
  event?: string;
};

export function useFetch<T>({ defaultValue, cb, event }: UseFetchArgs<T>) {
  const [data, setData] = useState<T | undefined>(
    defaultValue ? defaultValue : undefined,
  );
  const [loading, setLoading] = useState(false);

  const fn = async () => {
    setLoading(true);
    const result = await cb();
    console.log('result', result);
    setData(result);
    setLoading(false);
  };

  useEffect(() => {
    fn();
    if (event) {
      addPushEventListener(event, () => {
        fn();
      });
    }
  }, []);

  return { data, loading };
}
