import { PropsWithChildren } from 'react';

export type DetailCardProps = {
  title: string;
};

export const DetailCard = ({
  title,
  children,
}: PropsWithChildren<DetailCardProps>) => {
  return (
    <div className="shadow my-8">
      <div className="bg-primary text-white rounded-tl-lg rounded-tr-lg px-8 py-2  font-semibold text-lg">
        {title}
      </div>
      <div className="bg-white px-8 py-4 my-4">{children}</div>
    </div>
  );
};
