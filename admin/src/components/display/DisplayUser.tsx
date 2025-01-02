import { Icon } from './Icon';

type Props = {
  img?: string;
  username: string;
};

export const DisplayUser = ({ img, username }: Props) => {
  return (
    <div className="flex items-center gap-2 cursor-pointer">
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
              size={24}
              name="account_circle"
            />
          </div>
        )}
      </>

      <div className="flex items-center gap-2">
        <div className="font-semibold text-xs">{username}</div>
        <Icon
          size={20}
          name="expand_more"
        />
      </div>
    </div>
  );
};
