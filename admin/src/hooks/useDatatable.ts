/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useFindAll } from './useFindAll';
import { CountedList } from '../helpers/typings';
type PaginationArgs = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  selected?: (string | number)[];
  callback: () => Promise<CountedList<any>>;
  event?: string;
};
export function useDatable({
  page = 1,
  limit = 5,
  search,
  status,
  selected,
  callback,
  event,
}: PaginationArgs) {
  const [_page, setPage] = useState<number | undefined>(page);
  const [_limit, setLimit] = useState<number | undefined>(limit);
  const [_search, setSearch] = useState<string | undefined>(search);
  const [_status, setStatus] = useState<string | undefined>(status);
  const [_selected, setSelected] = useState(selected ?? []);

  const rows = useFindAll(
    callback,
    [_page, _limit, _search, _status, event],
    event,
  );

  return {
    page: _page,
    limit: _limit,
    search: _search,
    selected: _selected,
    status: _status,
    onSelectionChanged: (values: (string | number)[]) =>
      setSelected([...values]),
    onSearch: setSearch,
    onPageChanged: setPage,
    onPageSizeChanged: setLimit,
    onStatusChanged: setStatus,
    ...rows,
  };
}
