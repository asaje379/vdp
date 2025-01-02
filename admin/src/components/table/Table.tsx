import { ReactNode, useState } from 'react';
import { Checkbox } from '../form-fields/Checkbox';
import { WithId } from '../../helpers/typings';

export type Col = {
  label: string;
  id?: string | number;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (row: WithId<any>) => ReactNode;
};

export type Row = WithId<Record<string, ReactNode>>;

export type TableProps<T> = {
  cols: Col[];
  rows: WithId<T>[];
  activeSelection?: boolean;
  onSelectionChanged?: (values: Array<string | number>) => void;
};

export const Table = ({
  cols,
  rows,
  activeSelection = false,
  onSelectionChanged = console.log,
}: TableProps<unknown>) => {
  const [selected, setSelected] = useState<Array<string | number>>([]);

  const selectAll = () => {
    const data = rows.map((row) => row.id);
    setSelected(data);
    onSelectionChanged(data);
  };

  const unselectAll = () => {
    setSelected([]);
    onSelectionChanged([]);
  };

  const handleAllSelection = (value: boolean) => {
    if (value) {
      selectAll();
      return;
    }
    unselectAll();
  };

  const handleOneSelection = (id: string | number, value: boolean) => {
    if (!value) {
      const data = selected.filter((item) => item !== id);
      setSelected(data);
      onSelectionChanged(data);
      return;
    }
    if (!selected.includes(id)) {
      setSelected([...selected, id]);
      onSelectionChanged(selected);
    }
  };

  return (
    <div className="w-full overflow-auto border border-light text-xs">
      <table className="w-full">
        <thead className="d-shadow">
          <tr className="bg-gray-100">
            {activeSelection && (
              <th className="w-[40px] p-3">
                <Checkbox
                  checked={selected.length === rows.length}
                  onChange={handleAllSelection}
                />
              </th>
            )}
            {cols.map((col, index) => (
              <th
                className="text-left p-3 text-maroon"
                key={index + '_h'}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i + Math.random() + '_dr'}>
              {activeSelection && (
                <td className="p-3">
                  <Checkbox
                    checked={selected.includes(row.id)}
                    onChange={(value) => handleOneSelection(row.id, value)}
                  />
                </td>
              )}
              {renderRow(row, cols, i)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

function renderRow(row: Row, cols: Col[], i: number) {
  return cols.map((col, index) => (
    <td
      key={row.id + '_' + (col.id ?? index) + '_' + i}
      className={`p-3 min-w-[120px]${
        col.className ? ' ' + col.className : ''
      }`}>
      {col.id ? row[col.id] : col.render ? col.render(row) : ''}
    </td>
  ));
}
