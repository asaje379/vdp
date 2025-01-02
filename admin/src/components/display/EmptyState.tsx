import { PropsWithChildren } from 'react';
import { Empty } from './Empty';

export function EmptyState({
  children = 'Aucun élément trouvé',
}: PropsWithChildren) {
  return (
    <div className="my-8 flex flex-col items-center">
      <Empty />
      <div className="font-semibold my-10 text-center text-gray-600">
        {children}
      </div>
    </div>
  );
}
