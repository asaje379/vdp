import { Button } from '../buttons/Button';
import { Icon } from './Icon';

export type ConfirmArgs = {
  message: string;
  onConfirm: () => void | Promise<void>;
};

export const ConfirmDialog = ({
  message,
  onConfirm,
  closeModal,
}: ConfirmArgs & { closeModal: () => void }) => {
  const handleConfirm = () => {
    onConfirm();
    closeModal();
  };

  return (
    <div className="flex gap-8 px-8 py-6 items-start">
      <Icon
        name="help"
        size={48}
        className="text-primary"
      />
      <div>
        <div>{message}</div>
        <div className="flex justify-end">
          <div className="flex gap-2 mt-4">
            <Button
              className="text-xs bg-white border border-primary !text-primary shadow-none"
              onClick={closeModal}>
              Annuler
            </Button>
            <Button
              className="text-xs shadow-none"
              onClick={handleConfirm}>
              Confirmer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
