import { useId } from 'react';

export const useIdGen = () => {
  const id = useId();
  return (value: string | number) => `${id}_${value}`;
};
