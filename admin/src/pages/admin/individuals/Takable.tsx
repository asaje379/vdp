import { annualApi } from '../../../api/annual.api';
import { endTontineApi } from '../../../api/end-tontine.api';
import { Frequency } from '../../../api/enums';
import { individualApi } from '../../../api/individual.api';
import { EndTontine } from '../../../api/typings';
import { Spinner } from '../../../components/actions/Spinner';
import { Button } from '../../../components/buttons/Button';
import { CountedList } from '../../../helpers/typings';
import { useFetch } from '../../../hooks/useFetch';
import { formatAmount } from '../../../utils/helpers';

export const Takable = () => {
  const { data, loading } = useFetch<CountedList<EndTontine>>({
    cb: async () => await endTontineApi.findAll({ limit: -1 }),
    event: 'individuals.update',
  });

  const handleConfirm = async (item: EndTontine) => {
    if (confirm('Etes-vous sur de vouloir effectuer cette action ?')) {
      if (item.annual) {
        return await annualApi.confirmClosing(item.annual.id);
      }

      if (item.individual) {
        return await individualApi.confirmClosing(item.individual.id);
      }
    }
  };

  if (loading) <Spinner />;
  return (
    <div className="py-6 w-full overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-slate-100">
            <th className="text-left p-1">Tontine</th>
            <th className="text-left p-1">Nom</th>
            <th className="text-center p-1">Téléphone</th>
            <th className="text-center p-1">N° de retrait</th>
            <th className="text-center p-1">Montant</th>
            <th className="text-center p-1"></th>
          </tr>
        </thead>
        <tbody>
          {data?.values.map((item) => (
            <tr
              key={item.id}
              className="border-b border-slate-300 hover:bg-slate-50 cursor-pointer">
              <td className="p-2 min-w-40">
                {item.annual ? item.annual.label : item.individual?.label}
              </td>
              <td className="p-2 min-w-40">{item.auth.fullname}</td>
              <td className="p-2 text-center">{item.auth.phone}</td>
              <td className="p-2 text-center">{item.receiver}</td>
              <td className="p-2 text-center min-w-28">
                {formatAmount(
                  item.annual
                    ? item.annual.totalAmountToGive
                    : item.individual?.frequency === Frequency.DAY
                    ? Math.max(
                        item.individual?.currentlyPaid -
                          item.individual?.unitAmount,
                        0,
                      ) ?? 0
                    : item.individual?.currentlyPaid ?? 0,
                )}
              </td>
              <td className="py-2">
                <Button
                  onClick={() => handleConfirm(item)}
                  className="text-xs">
                  Confirmer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
