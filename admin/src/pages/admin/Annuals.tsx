import { formatPrice } from 'usual_fn';
import { annualApi } from '../../api/annual.api';
import { Spinner } from '../../components/actions/Spinner';
import { Button } from '../../components/buttons/Button';
import { Card } from '../../components/cards/Card';
import { H1 } from '../../components/display/H1';
import { useFetch } from '../../hooks/useFetch';
import { useIdGen } from '../../hooks/useIdGen';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../components/display/Icon';

export const Annuals = () => {
  const { data, loading } = useFetch({
    cb: async () => await annualApi.findAll({ limit: -1 }),
    event: 'annuals.update',
  });
  const genId = useIdGen();
  const navigate = useNavigate();

  const createTontine = () => {
    navigate('/admin/annuals/create');
  };

  const updateTontine = (id: string) => {
    navigate(`/admin/annuals/create/${id}`);
  };

  const viewDetails = (id: string) => {
    navigate(`/admin/annuals/participants/${id}`);
  };

  if (loading) <Spinner />;

  return (
    <div>
      <div className="flex items-center justify-between">
        <H1>Tontines annuelles</H1>
        <Button onClick={createTontine}>Nouveau</Button>
      </div>

      <div>
        {data?.values.map((item, index) => (
          <Card key={genId(index)}>
            <div className="flex justify-between">
              <div className="text-slate-500 font-light">{item.label}</div>
              <div className="flex gap-6">
                <div onClick={() => updateTontine(item.id)}>
                  <Icon
                    className="text-blue-500"
                    size={24}
                    name="edit"
                  />
                </div>
                <div onClick={() => viewDetails(item.id)}>
                  <Icon
                    name="visibility"
                    size={24}
                  />
                </div>
              </div>
            </div>
            <div className="text-red-800 font-semibold text-xs mt-2">
              P : {item.penalityAmount} F
            </div>
            <div className="flex items-center justify-between text-sm text-primary font-bold">
              <div>
                {formatPrice({ amount: item.unitAmount, device: 'F' })}
                {' -- '}
                {formatPrice({ amount: item.unitAmountWithFees, device: 'F' })}
              </div>{' '}
              {' | '}
              <div>
                {formatPrice({ amount: item.totalAmountToGive, device: 'F' })}
                {' -- '}
                {formatPrice({ amount: item.totalAmount, device: 'F' })}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
