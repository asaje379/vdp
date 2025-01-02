/* eslint-disable @typescript-eslint/no-explicit-any */
import { UpdateOrDeleteFn, WithId } from '../../helpers/typings';
import { Icon } from './Icon';

type Props = {
  row: WithId<any>;
  updateFn?: UpdateOrDeleteFn<any>;
  deleteFn?: UpdateOrDeleteFn<any>;
};

export const EditDelete = ({ row, updateFn, deleteFn }: Props) => {
  return (
    <div className="flex gap-3">
      {updateFn && (
        <div
          className="border rounded-lg p-1.5"
          onClick={() => updateFn(row)}>
          <Icon
            name="edit_square"
            className="text-primary"
          />
        </div>
      )}
      {deleteFn && (
        <div
          className="border rounded-lg p-1.5"
          onClick={() => {
            console.log('clicked');
            deleteFn(row);
          }}>
          <Icon
            name="delete"
            className="text-red-500"
          />
        </div>
      )}
    </div>
  );
};
