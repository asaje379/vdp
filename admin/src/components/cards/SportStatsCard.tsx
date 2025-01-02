type Props = {
  label: string;
  all: number;
  mens: number;
  womens: number;
};

export const SportStatsCard = ({ label, all, mens, womens }: Props) => {
  return (
    <div className="bg-gray-50 px-6 py-4 rounded-xl shadow">
      <div className="font-semibold text-lg text-slate-400">{label}</div>
      <div className="flex justify-between text-sm mt-4">
        <div>
          <span className="font-bold text-gray-600">Homme</span>: {mens}
        </div>
        <div>
          <span className="font-bold text-gray-600">Femme</span>: {womens}
        </div>
        <div>
          <span className="font-bold text-gray-600">Total</span>: {all}
        </div>
      </div>
    </div>
  );
};
