import { ReactNode } from 'react';
import { DownloadButton } from './DownloadButton';
import { ElementPerPage } from './ElementPerPage';
import { FilterButton } from './FilterButton';
import { Paginator } from './Paginator';
import { Search } from '../form-fields/Search';

export type PaginationArgs = {
  page?: number;
  limit?: number;
  search?: string;
  totalCount?: number;
  noFilter?: boolean;
  noDownload?: boolean;
  filterContent?: ReactNode;
  downloadContent?: ReactNode;

  onSearch?: (x: string) => void;
  onPageSizeChanged?: (x: number) => void;
  onPageChanged?: (x: number) => void;
  onDownload?: () => void;
};

export const TableControls = ({
  page = 1,
  limit = 10,
  search,
  totalCount = 0,
  noFilter = false,
  noDownload = false,
  filterContent,
  downloadContent,
  onSearch,
  onPageChanged,
  onPageSizeChanged,
  onDownload,
}: PaginationArgs) => {
  return (
    <div className="flex flex-col gap-2 lg:flex-row items-center justify-between p-3 border border-light border-b-0 rounded">
      <div className="flex items-center justify-between gap-4 w-full lg:w-fit">
        <div className="w-full">
          <Search
            value={search}
            onSearch={onSearch ?? console.log}
          />
        </div>
        {(!noFilter || !noDownload) && (
          <div className="flex items-center gap-2">
            {!noFilter && <FilterButton>{filterContent}</FilterButton>}
            {!noDownload && (
              <DownloadButton onDownload={onDownload}>
                {downloadContent}
              </DownloadButton>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 w-full lg:w-fit">
        <ElementPerPage
          onChange={onPageSizeChanged}
          value={limit}
        />
        <Paginator
          value={page}
          limit={limit}
          onPageChanged={onPageChanged}
          totalCount={totalCount}
        />
      </div>
    </div>
  );
};
