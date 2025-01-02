import { ChangeEvent, useRef } from 'react';
import { Icon } from '../display/Icon';

type Props = {
  onSearch: (value: string) => void;
  value?: string;
};

export const Search = ({ onSearch, value }: Props) => {
  const inputValue = useRef(null);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTimeout(() => {
      if (
        inputValue &&
        inputValue.current &&
        (inputValue.current as HTMLInputElement).value === val
      ) {
        onSearch(val);
      }
    }, 500);
  };

  return (
    <div className="flex items-center gap-3 p-2 border border-gray-400 rounded-lg">
      <div className="text-maroon">
        <Icon
          size={18}
          name="search"
        />
      </div>
      <input
        type="text"
        ref={inputValue}
        {...(value ? { defaultValue: value } : {})}
        className="w-full border-none outline-none text-maroon bg-transparent text-sm"
        placeholder={'Rechercher'}
        onChange={handleSearch}
      />
    </div>
  );
};
