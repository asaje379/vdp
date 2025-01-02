import { Table, TableProps } from './Table';
import { PaginationArgs, TableControls } from './TableControls';

type DataTableProps<T> = TableProps<T> & PaginationArgs;

export const Datatable = ({
  cols,
  rows,
  page = 1,
  limit = 5,
  search,
  totalCount,
  activeSelection = false,
  noFilter,
  noDownload,
  filterContent,
  downloadContent,

  onSelectionChanged = console.log,
  onSearch,
  onPageChanged,
  onPageSizeChanged,
  onDownload,
}: DataTableProps<unknown>) => {
  return (
    <div className="bg-white">
      <TableControls
        {...{
          page,
          limit,
          search,
          totalCount,
          noDownload,
          noFilter,
          filterContent,
          downloadContent,
          onSearch,
          onPageChanged,
          onPageSizeChanged,
          onDownload,
        }}
      />
      <Table {...{ activeSelection, onSelectionChanged, rows, cols }} />
    </div>
  );
};
