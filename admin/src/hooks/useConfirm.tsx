import { useModal } from '../components/actions/modal/constants';
import {
  ConfirmArgs,
  ConfirmDialog,
} from '../components/display/ConfirmDialog';

export function useConfirm() {
  const { openModal, closeModal } = useModal();

  const openConfirmDialog = (args: ConfirmArgs) => {
    openModal({
      closable: false,
      children: (
        <ConfirmDialog
          closeModal={closeModal}
          {...args}
        />
      ),
    });
  };

  return openConfirmDialog;
}
