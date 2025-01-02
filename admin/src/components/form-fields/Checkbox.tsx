import { useEffect, useState } from 'react';
import { Icon } from '../display/Icon';

type CheckboxProps = {
  checked?: boolean;
  size?: number;
  onChange?: (value: boolean) => void;
};

const cssByStatus = (checked: boolean) => {
  const base = [
    'rounded border cursor-pointer flex justify-center items-center',
  ];
  base.push(
    !checked
      ? 'border-light-maroon bg-transparent'
      : 'border-primary bg-primary',
  );
  return base.join(' ');
};

export const Checkbox = ({
  checked,
  size = 16,
  onChange = (v) => v,
}: CheckboxProps) => {
  const [_checked, isChecked] = useState(checked ?? false);

  useEffect(() => {
    isChecked(checked ?? false);
    onChange(checked ?? false);
  }, [checked]);

  const toggle = () => {
    isChecked((ch) => !ch);
    onChange(!checked);
  };

  return (
    <div
      style={{ width: `${size}px`, height: `${size}px` }}
      className={cssByStatus(_checked)}
      onClick={toggle}>
      {_checked && (
        <div className="w-fit h-fit flex items-center justify-center text-white">
          <Icon
            size={Math.round((size * 8) / 10)}
            name="check"
          />
        </div>
      )}
    </div>
  );
};
