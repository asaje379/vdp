import { PropsWithChildren } from 'react';
import { Icon } from '../display/Icon';
import { Dropdown } from '../actions/Dropdown';

type Props = {
  onDownload?: <T>(v?: T) => void;
};

export const DownloadButton = ({
  onDownload = console.log,
  children,
}: PropsWithChildren<Props>) => {
  console.log(onDownload);
  return (
    <Dropdown content={<div>{children}</div>}>
      <div>
        <div className="hidden lg:block">
          <button
            onClick={() => {
              if (onDownload) onDownload();
            }}
            className="border border-gray-400 py-2 px-3 rounded-lg hover:bg-gray-100 text-sm">
            Télécharger
          </button>
        </div>
        <div className="block lg:hidden border border-light rounded p-2">
          <Icon name="cloud_download" />
        </div>
      </div>
    </Dropdown>
  );
};
