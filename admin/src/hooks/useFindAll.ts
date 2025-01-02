import { useEffect, useState } from 'react';
import { CountedList, WithId } from '../helpers/typings';
import { Row } from '../components/table/Table';
import { addPushEventListener } from '@asaje/sse-push-event-client';

export function useFindAll<T>(
  cb: () => Promise<CountedList<T>>,
  deps: unknown[],
  event?: string,
) {
  const [count, setCount] = useState<number>();
  const [values, setValues] = useState<WithId<T>[]>([]);

  const loadData = async () => {
    const result = await cb();
    setCount(result?.count ?? 0);
    setValues(result?.values ?? []);
  };

  useEffect(() => {
    loadData();
  }, deps);

  useEffect(() => {
    if (event) {
      addPushEventListener(event, () => {
        loadData();
      });
    }
  }, [event]);

  return { totalCount: count, rows: values as unknown as Row[] };
}
