import { useMemo } from 'react';
import { Frequency, PaiementStatus } from '../../../api/enums';
import { individualApi } from '../../../api/individual.api';
import { Individual } from '../../../api/typings';
import { CountedList } from '../../../helpers/typings';
import { useFetch } from '../../../hooks/useFetch';
import { clsx, formatAmount } from '../../../utils/helpers';
import { Spinner } from '../../../components/actions/Spinner';
import { Icon } from '../../../components/display/Icon';

export const Monthly = () => {
  const { data, loading } = useFetch<CountedList<Individual>>({
    cb: async () =>
      await individualApi.findAll({ limit: -1, frequency: Frequency.MONTH }),
    event: 'individuals.update',
  });

  const values = useMemo(() => {
    if (!data) return [];
    return data.values.map((it) => ({
      ...it,
      nbrOfPaiementPaid: it.paiements.filter(
        (p) => p.status === PaiementStatus.PAID,
      ).length,
    }));
  }, [data]);

  const sums = useMemo(() => {
    const base = { unitAmount: 0, currentlyPaid: 0, toTake: 0, toTakeReal: 0 };
    if (!values) return base;
    return values.reduce(
      (acc, cur) => ({
        unitAmount: acc.unitAmount + cur.unitAmount,
        currentlyPaid:
          acc.currentlyPaid + cur.unitAmountWithFees * cur.nbrOfPaiementPaid,
        toTake: acc.toTake + cur.currentlyPaid,
        toTakeReal: acc.toTakeReal + (cur.closed ? 0 : cur.currentlyPaid),
      }),
      base,
    );
  }, [values]);

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
          {values.map((item) => (
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
                {formatAmount(item.unitAmountWithFees * item.nbrOfPaiementPaid)}
              </td>
              <td className="p-2 text-center min-w-28">
                {formatAmount(item.currentlyPaid)}
              </td>
              <td className="p-2 text-center min-w-28">
                {formatAmount(
                  item.unitAmountWithFees * item.nbrOfPaiementPaid -
                    item.currentlyPaid,
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
