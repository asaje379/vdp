import { useState } from 'react';
import { Input, InputProps } from './Input';

export const Password = (props: InputProps) => {
  const [icon, setIcon] = useState('visibility');
  const [type, setType] = useState('password');

  const toggle = () => {
    if (icon === 'visibility') {
      setIcon('visibility_off');
      setType('text');
      return;
    }
    setIcon('visibility');
    setType('password');
  };

  return (
    <Input
      {...props}
      type={type}
      icon={icon}
      onIconClicked={toggle}
    />
  );
};
