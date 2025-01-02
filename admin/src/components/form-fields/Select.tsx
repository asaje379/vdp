import { useEffect, useState } from 'react';
import { Search } from './Search';
import { useInElement } from '../../hooks/useInElement';
import { Dropdown, DropdownState } from '../actions/Dropdown';
import { Icon } from '../display/Icon';

export type Option = string | number | Record<string, string | number>;

export type SelectProps = {
  searchable?: boolean;
  options?: Option[];
  onChange?: (x: Option) => void;
  onSearch?: (x: string) => void;
  label?: string;
  optionLabel?: string;
  placeholder?: string;
  containerElement?: Element | Document | null;
  defaultValue?: Option;
};

const renderOption = (option: Option, optionLabel?: string) => {
  if (['string', 'number'].includes(typeof option)) {
    return option as string;
  }

  if (!optionLabel)
    throw new Error(
      '`optionLabel` is required when working with object option',
    );

  const _option = option as Record<string, string>;
  if (!('id' in _option))
    throw new Error('`id` is required when working with object option');

  return _option[optionLabel];
};

const cssByPosition = {
  t: 'p-2 flex max-h-[200px] overflow-auto flex-col gap-3 bg-white d-shadow w-full mt-1 bg-white z-10 bottom-full mb-12 absolute rounded',
  b: 'p-2 flex max-h-[200px] overflow-auto flex-col gap-3 bg-white d-shadow w-full mt-1 bg-white z-10 absolute rounded',
};

export const Select = ({
  searchable,
  options,
  onChange = console.log,
  onSearch = console.log,
  optionLabel,
  label,
  placeholder = 'Choisir une option',
  containerElement = document,
  defaultValue = '',
}: SelectProps) => {
  const [selected, setSelected] = useState<string>('');
  const { target, inPage, ratio } = useInElement({ root: containerElement });
  const [position, setPosition] = useState<'t' | 'b' | null>(null);
  const [dropdownState, setDropdownState] = useState<DropdownState>('closed');

  useEffect(() => {
    setSelected(renderOption(defaultValue, optionLabel));
  }, [defaultValue, optionLabel]);

  useEffect(() => {
    if (dropdownState === 'closed') {
      setPosition(null);
      return;
    }
    if (position) return;
    if (!inPage) return;
    if (ratio > 0.99) {
      setPosition('b');
      return;
    }
    setPosition('t');
  }, [inPage, ratio, position, dropdownState]);

  const handleChange = (option: Option) => {
    onChange(option);
    setSelected(renderOption(option, optionLabel));
  };

  return (
    <Dropdown
      onStateChanged={setDropdownState}
      content={
        <div
          ref={target}
          className={[
            position ? cssByPosition[position] : '',
            ' border shadow-lg',
          ].join(' ')}>
          {searchable && (
            <div onClick={(e) => e.stopPropagation()}>
              <Search onSearch={onSearch} />
            </div>
          )}
          <div>
            {options?.map((option, i) => (
              <div
                className="hover:bg-gray-100 rounded py-1 cursor-pointer px-2 text-sm"
                onClick={() => handleChange(option)}
                key={i}>
                {renderOption(option, optionLabel)}
              </div>
            ))}
          </div>
        </div>
      }>
      <div className="flex flex-col gap-1">
        <label className="text-gray-600 font-semibold text-sm">{label}</label>
        <div className="border border-gray-200 bg-gray-50 rounded-lg flex items-center gap-8 px-3 py-2 justify-between relative text-sm">
          <div className="text-gray-600 truncate w-fit">
            {selected || placeholder}
          </div>
          <Icon name="keyboard_arrow_down" />
        </div>
      </div>
    </Dropdown>
  );
};
