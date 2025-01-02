/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatPrice } from 'usual_fn';
import { individualApi } from '../../../api/individual.api';
import { Spinner } from '../../../components/actions/Spinner';
import { Card } from '../../../components/cards/Card';
import { useFetch } from '../../../hooks/useFetch';
import { useIdGen } from '../../../hooks/useIdGen';
import { Button } from '../../../components/buttons/Button';
import { formatDate } from '../../../utils/helpers';

export const IndividualValidations = () => {
  const { data, loading } = useFetch<any>({
    cb: async () => await individualApi.findAllPending(),
    event: 'individuals.update',
  });
  const genId = useIdGen();

  if (loading) <Spinner />;

  const confirmPaiement = async (id: string) => {
    if (window.confirm('Etes-vous sur de vouloir effectuer cette action ?')) {
      return await individualApi.confirmPaiement(id);
    }
  };

  const unconfirmPaiement = async (id: string) => {
    if (window.confirm('Etes-vous sur de vouloir effectuer cette action ?')) {
      return await individualApi.unconfirmPaiement(id);
    }
  };

  return (
    <div className="mt-8">
      {data?.map((it: any, index: number) => (
        <Card key={genId(index)}>
          <div className="flex items-center justify-between">
            <div>{it.individual.label}</div>
            <div className="text-red-800 font-semibold">N° {it.index}</div>
          </div>
          <div className="font-bold mt-2">{it.individual.owner.fullname}</div>
          <div className="text-xs">{formatDate(it.initiateAt)}</div>
          <div className="flex justify-between items-end">
            <div className="text-red-500 font-bold text-xl">
              {formatPrice({
                amount: it.individual.unitAmountWithFees,
                device: 'F',
              })}
            </div>

            <div className="flex text-xs gap-6">
              <Button
                onClick={() => unconfirmPaiement(it.id)}
                className="bg-gradient-to-r from-red-700 to-red-500 text-white">
                Rejeter
              </Button>
              <Button
                onClick={() => confirmPaiement(it.id)}
                className="bg-gradient-to-r from-green-700 to-green-500 text-white">
                Confirmer
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
