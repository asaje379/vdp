type Props = {
  value: number;
  className?: string;
  height?: number;
};

export const Progress = ({
  value,
  className = 'bg-primary',
  height = 5,
}: Props) => {
  return (
    <div
      className="w-full bg-gray-300 rounded-lg"
      style={{ height: `${height}px` }}>
      <div
        className={[className, 'h-full rounded-lg'].join(' ')}
        style={{ width: `${value}%` }}></div>
    </div>
  );
};
