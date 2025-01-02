import { useState } from 'react';
import { Icon } from './Icon';

type FileViewerProps = {
  src: string;
};

export const FileViewer = ({ src }: FileViewerProps) => {
  const [opened, setOpened] = useState(false);

  const handleViewFile = () => {
    setOpened(true);
  };

  return (
    <>
      <div
        onClick={handleViewFile}
        className="text-blue-500 underline font-light text-sm cursor-pointer">
        Voir le fichier
      </div>
      {opened && (
        <div className="fixed inset-0 bg-[#0000007F] flex justify-center items-center px-10">
          <div
            className="absolute right-8 top-4"
            onClick={() => setOpened(false)}>
            <Icon
              name="close"
              className="text-white border-2 border-white rounded-full"
              size={24}
            />
          </div>

          <div className="bg-white w-[50vw] h-[86vh] flex justify-center h-full">
            <iframe
              src={`${src}#toolbar=0&navpanes=0`}
              className="w-full h-full"></iframe>
          </div>
        </div>
      )}
    </>
  );
};
