import { PropsWithChildren, useId, useState } from 'react';

export type TabsProps = {
  values: { id: string; label: string }[];
  activeIndex?: number;
  onTabChanged: (value: { index: number; id: string; label: string }) => void;
};

export const Tabs = ({
  values,
  activeIndex = 0,
  children,
  onTabChanged,
}: PropsWithChildren<TabsProps>) => {
  const [currentIndex, setCurrentIndex] = useState<number>(activeIndex);
  const id = useId();

  const toggleIndex = (
    { id, label }: { id: string; label: string },
    index: number,
  ) => {
    setCurrentIndex(index);
    onTabChanged({ index, id, label });
  };

  return (
    <div>
      <div className="border-b border-gray-300 mb-4 flex bg-white items-center">
        {values.map((value, index) => (
          <div
            key={`${id}_${index}`}
            className={[
              'px-10 py-2.5 cursor-pointer text-sm',
              currentIndex === index
                ? 'border-b-2 border-primary text-primary font-semibold'
                : 'border-b border-transparent font-light',
            ].join(' ')}
            onClick={() => toggleIndex(value, index)}>
            {value.label}
          </div>
        ))}
      </div>
      <div>{children}</div>
    </div>
  );
};
