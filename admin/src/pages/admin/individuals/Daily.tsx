import { useMemo } from 'react';
import { Frequency } from '../../../api/enums';
import { individualApi } from '../../../api/individual.api';
import { Individual } from '../../../api/typings';
import { Spinner } from '../../../components/actions/Spinner';
import { CountedList } from '../../../helpers/typings';
import { useFetch } from '../../../hooks/useFetch';
import { clsx, formatAmount } from '../../../utils/helpers';
import { Icon } from '../../../components/display/Icon';

export const Daily = () => {
  const { data, loading } = useFetch<CountedList<Individual>>({
    cb: async () =>
      await individualApi.findAll({ limit: -1, frequency: Frequency.DAY }),
    event: 'individuals.update',
  });

  const sums = useMemo(() => {
    const base = { unitAmount: 0, currentlyPaid: 0, toTake: 0, toTakeReal: 0 };
    if (!data) return base;
    return data.values.reduce(
      (acc, cur) => ({
        unitAmount: acc.unitAmount + cur.unitAmount,
        currentlyPaid: acc.currentlyPaid + cur.currentlyPaid,
        toTake: acc.toTake + Math.max(cur.currentlyPaid - cur.unitAmount, 0),
        toTakeReal:
          acc.toTakeReal +
          (cur.closed ? 0 : Math.max(cur.currentlyPaid - cur.unitAmount, 0)),
      }),
      base,
    );
  }, [data]);

  const handleConfirm = async (id: string) => {
    if (confirm('Etes-vous sur de vouloir effectuer cette action ?')) {
      return await individualApi.confirmClosing(id);
    }
  };

  if (loading) <Spinner />;

  return (
    <div className="py-6 w-full overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-slate-100">
            <th className="text-left p-1">Libellé</th>
            <th className="text-center p-1">Nom</th>
            <th className="text-center p-1">Téléphone</th>
            <th className="text-center p-1">Montant</th>
            <th className="text-center p-1">Déjà payé</th>
            <th className="text-center p-1">A prendre</th>
            <th className="text-center p-1">Bénéfices</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.values.map((item) => (
            <tr
              key={item.id}
              className={clsx(
                'border-b border-slate-300 hover:bg-slate-50 cursor-pointer',
                item.isClosing ? 'text-orange-500 hover:text-orange-600' : '',
                item.closed ? 'text-red-500 hover:text-red-600 font-bold' : '',
              )}>
              <td className="p-2 min-w-40">{item.label}</td>
              <td className="p-2 text-center">{item.owner.fullname}</td>
              <td className="p-2 text-center">{item.owner.phone}</td>
              <td className="p-2 text-center min-w-28">
                {formatAmount(item.unitAmount)}
              </td>
              <td className="p-2 text-center min-w-28">
                {formatAmount(item.currentlyPaid)}
              </td>
              <td className="p-2 text-center min-w-28">
                {formatAmount(
                  Math.max(item.currentlyPaid - item.unitAmount, 0),
                )}
              </td>
              <td className="p-2 text-center min-w-28">
                {formatAmount(
                  item.currentlyPaid -
                    Math.max(item.currentlyPaid - item.unitAmount, 0),
                )}
              </td>
              <td className="p-2 text-center min-w-28">
                {!item.isClosing && !item.closed && (
                  <div onClick={() => handleConfirm(item.id)}>
                    <Icon
                      name="delete"
                      className="text-red-500"
                    />
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4}></td>
            <td className="p-2 text-center font-bold">
              {formatAmount(sums.currentlyPaid)}
            </td>
            <td className="p-2 text-center font-bold">
              <div>{formatAmount(sums.toTakeReal)}</div>
              <div className="text-red-500">{formatAmount(sums.toTake)}</div>
            </td>
            <td className="p-2 text-center font-bold">
              {formatAmount(sums.currentlyPaid - sums.toTake)}
            </td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
