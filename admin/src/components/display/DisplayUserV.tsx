import { Icon } from './Icon';

type Props = {
  img?: string;
  username: string;
  service: string;
};

export const DisplayUserV = ({ img, username, service }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 cursor-pointer my-8">
      <>
        {img ? (
          <img
            src={img}
            className="w-[48px] h-[48px]"
            alt="avatar"
          />
        ) : (
          <div className="text-maroon">
            <Icon
              size={48}
              className="text-gray-500"
              name="account_circle"
            />
          </div>
        )}
      </>

      <div>
        <div className="font-bold text-base text-gray-500 text-center">
          {username}
        </div>
        <div className="text-sm text-gray-500 text-center">{service}</div>
      </div>
    </div>
  );
};
