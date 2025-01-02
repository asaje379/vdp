import { useEffect, useState } from 'react';
import { api } from '../api';
import { CountedList, WithId } from '../helpers/typings';

export function useSearch<T>(path: string) {
  const [values, setValues] = useState<WithId<T>[]>([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const load = async () => {
      const result = await api.get(path, { params: { search: searchValue } });
      setValues((result.data as CountedList<T>).values);
    };
    load();
  }, [searchValue, path]);

  return { values, setSearchValue };
}
