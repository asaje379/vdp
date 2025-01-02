type IconProps = {
  name?: string;
  size?: number;
  className?: string;
};

export const Icon = ({ name, size = 16, className = '' }: IconProps) => {
  return (
    <div
      className={[
        'material-symbols-outlined flex items-center justify-center cursor-pointer',
        className,
      ].join(' ')}
      style={{ fontSize: `${size}px` }}>
      {name}
    </div>
  );
};
