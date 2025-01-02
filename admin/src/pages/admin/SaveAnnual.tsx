/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from 'react-router-dom';
import { H1 } from '../../components/display/H1';
import { ChangeEvent, useEffect, useState } from 'react';
import { CreateAnnual } from '../../api/typings';
import { Frequency } from '../../api/enums';
import { Form } from '../../components/form-fields/Form';
import { Input } from '../../components/form-fields/Input';
import { Button } from '../../components/buttons/Button';
import { annualApi } from '../../api/annual.api';
import { useToast } from '../../components/providers/ToastProvider';
import { dateForInput } from '../../utils/helpers';
import { Back } from '../../components/buttons/Back';

const defaultAnnual = {
  label: '',
  frequency: Frequency.WEEK,
  penalityAmount: '',
  unitAmount: '',
  unitAmountWithFees: '',
  totalAmountToGive: '',
  totalAmount: '',
  periodSize: '',
  startAt: '',
  benefice: '',
};

export const SaveAnnual = () => {
  const { id } = useParams();
  const [tontine, setTontine] = useState<CreateAnnual>(defaultAnnual as any);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string,
  ) => {
    const value = e.target.value;
    setTontine({ ...tontine, [name]: isNaN(+value) ? value : +value });
  };
  const openToast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const cb = async () => {
        const data = await annualApi.findOne(id);
        if (data) setTontine(data);
      };
      cb();
    }
  }, [id]);

  const handleSubmit = async () => {
    const payload = {
      ...tontine,
      unitAmount: tontine.unitAmountWithFees,
      startAt: new Date(tontine.startAt).toISOString(),
    };
    console.log(payload);

    if (!id) {
      try {
        await annualApi.create(payload);
        return navigate('/admin/annuals');
      } catch (error) {
        return openToast({
          type: 'error',
          info: 'La création de la tontine a échouée',
        });
      }
    }

    try {
      await annualApi.update(id, payload);
      return navigate('/admin/annuals');
    } catch (error) {
      return openToast({
        type: 'error',
        info: 'La modification de la tontine a échouée',
      });
    }
  };

  return (
    <div>
      <div className="flex gap-4 items-center">
        <Back />
        <H1>{id ? 'Modification de tontine' : 'Création de tontine'}</H1>
      </div>

      <div>
        <Form
          onSubmit={handleSubmit}
          className="border rounded mt-4 p-4 border-slate-300">
          <div className="grid md:grid-cols-3 gap-3 md:gap-8">
            <Input
              label="Intitulé de la tontine"
              value={tontine.label}
              onChange={(e) => handleChange(e, 'label')}
            />
            <Input
              label="Montant de base"
              value={tontine.unitAmountWithFees}
              type="number"
              onChange={(e) => handleChange(e, 'unitAmountWithFees')}
            />
            <Input
              label="Montant total à remettre"
              value={tontine.totalAmountToGive}
              type="number"
              onChange={(e) => handleChange(e, 'totalAmountToGive')}
            />
            <Input
              label="Montant total brut"
              value={tontine.totalAmount}
              type="number"
              onChange={(e) => handleChange(e, 'totalAmount')}
            />
            <Input
              label="Bénéfice"
              value={tontine.benefice}
              type="number"
              onChange={(e) => handleChange(e, 'benefice')}
            />
            <Input
              label="Montant de la pénalité"
              value={tontine.penalityAmount}
              type="number"
              onChange={(e) => handleChange(e, 'penalityAmount')}
            />
            <Input
              label="Nombre de semaines"
              value={tontine.periodSize}
              type="number"
              onChange={(e) => handleChange(e, 'periodSize')}
            />
            <Input
              label="Date de début"
              value={dateForInput(tontine.startAt)}
              type="date"
              onChange={(e) => handleChange(e, 'startAt')}
            />
          </div>
          <Button
            type="submit"
            className="mt-6 w-full md:w-fit">
            Enregistrer la tontine
          </Button>
        </Form>
      </div>
    </div>
  );
};
