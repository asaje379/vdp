import { useNavigate } from 'react-router-dom';
import { Icon } from '../display/Icon';

export const Back = ({ showText = false }: { showText?: boolean }) => {
  const navigate = useNavigate();

  return (
    <div
      className="w-fit h-fit mr-2 flex items-center gap-2 cursor-pointer"
      onClick={() => navigate(-1)}>
      <Icon
        name="arrow_back"
        size={20}
      />
      {showText && <span>Retour</span>}
    </div>
  );
};
