import { useMemo } from 'react';
import { Option, Select } from '../form-fields/Select';

type PaginatorProps = {
  totalCount?: number;
  limit: number;
  onPageChanged?: (newPage: number) => void;
  value?: number;
};

export const Paginator = ({
  totalCount,
  limit,
  value,
  onPageChanged = console.log,
}: PaginatorProps) => {
  const nbrOfPages = useMemo(
    () => (!totalCount ? 0 : Math.ceil(totalCount / limit)),
    [totalCount, limit],
  );
  const pages = useMemo(
    () => new Array(nbrOfPages).fill(0).map((_, index) => `Page ${index + 1}`),
    [nbrOfPages],
  );

  return (
    <Select
      options={pages}
      defaultValue={`Page ${value}`}
      placeholder="Pages"
      onChange={(item: Option) =>
        onPageChanged(+(item as string).split(' ')[1])
      }
    />
  );
};
