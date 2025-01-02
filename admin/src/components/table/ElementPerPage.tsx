import { Select } from '../form-fields/Select';

type Props = {
  value?: number;
  onChange?: (value: number) => void;
};

export const ElementPerPage = ({ value, onChange = (v) => v }: Props) => {
  return (
    <div className="min-w-[120px]">
      <Select
        defaultValue={value}
        placeholder="Elts/page"
        options={[5, 10, 25, 50, 100, 250]}
        onChange={(value) => onChange(value as number)}
      />
    </div>
  );
};
