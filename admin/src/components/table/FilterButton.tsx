import { PropsWithChildren } from 'react';
import { Dropdown } from '../actions/Dropdown';
import { Icon } from '../display/Icon';

type Props = {
  onFilter?: (v: unknown) => void;
};

export const FilterButton = ({
  onFilter = console.log,
  children,
}: PropsWithChildren<Props>) => {
  console.log(onFilter);
  return (
    <Dropdown content={<div className="shadow-lg">{children}</div>}>
      <div>
        <div className="hidden lg:block">
          <button className="border border-gray-400 py-2 px-3 rounded-lg hover:bg-gray-100 text-sm">
            Filtre
          </button>
        </div>
        <div className="block lg:hidden border border-light rounded p-2">
          <Icon name="filter_list" />
        </div>
      </div>
    </Dropdown>
  );
};
