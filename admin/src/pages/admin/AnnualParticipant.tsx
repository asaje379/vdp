/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { annualApi } from '../../api/annual.api';
import { useIdGen } from '../../hooks/useIdGen';
import { Spinner } from '../../components/actions/Spinner';
import { H1 } from '../../components/display/H1';
import { formatDate } from 'usual_fn';
import { Button } from '../../components/buttons/Button';
import { Back } from '../../components/buttons/Back';

export const AnnualParticipant = () => {
  const { id } = useParams();
  const { data, loading } = useFetch({
    cb: async () => await annualApi.findOne(id ?? ''),
    event: 'annuals.update',
  });
  const genId = useIdGen();

  console.log(data);

  if (loading) <Spinner />;

  return (
    <div>
      <div className="flex items-center gap-3">
        <Back />
        <H1>Participants de la tontine</H1>
      </div>

      <div>
        {(data as any)?.annualOwners.map((it: any, idx: number) => (
          <div
            key={genId(idx)}
            className="shadow-xl my-6 border border-slate-200 rounded-lg p-6 flex flex-col gap-2">
            <div>
              <span className="font-bold">Nom : </span>
              <span>{it.owner.fullname}</span>
            </div>
            <div>
              <span className="font-bold">Téléphone : </span>
              <span>{it.owner.phone}</span>
            </div>
            <div>
              <span className="font-bold">Montant payé : </span>
              <span>{it.currentlyPaid}</span>
            </div>
            <div>
              <span className="font-bold">Commencé le : </span>
              <span>{formatDate({ data: it.createdAt })}</span>
            </div>
            <Button>Voir la carte</Button>
          </div>
        ))}
      </div>
    </div>
  );
};
