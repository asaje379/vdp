import { Login } from '../pages/Login';
import { Root } from '../pages/Root';
import { AnnualParticipant } from '../pages/admin/AnnualParticipant';
import { Annuals } from '../pages/admin/Annuals';
import { Dashboard } from '../pages/admin/Dashboard';
import { Individuals } from '../pages/admin/Individuals';
import { SaveAnnual } from '../pages/admin/SaveAnnual';
import { Validations } from '../pages/admin/Validations';
import { Daily } from '../pages/admin/individuals/Daily';
import { Monthly } from '../pages/admin/individuals/Monthly';
import { Takable } from '../pages/admin/individuals/Takable';
import { Weekly } from '../pages/admin/individuals/Weekly';
import { AnnualValidations } from '../pages/admin/validations/AnnualValidations';
import { IndividualValidations } from '../pages/admin/validations/IndividualValidations';
import { RouteItem } from './typings';

export const ROUTES: RouteItem[] = [
  { path: '/', element: <Login /> },
  {
    path: '/admin',
    element: <Root />,
    children: [
      { path: '', element: <Dashboard /> },
      { path: 'annuals', element: <Annuals /> },
      { path: 'annuals/create', element: <SaveAnnual /> },
      { path: 'annuals/create/:id', element: <SaveAnnual /> },
      { path: 'annuals/participants/:id', element: <AnnualParticipant /> },
      {
        path: 'individuals',
        element: <Individuals />,
        children: [
          { path: '', element: <Daily /> },
          { path: 'weekly', element: <Weekly /> },
          { path: 'monthly', element: <Monthly /> },
          { path: 'takable', element: <Takable /> },
        ],
      },
      {
        path: 'validations',
        element: <Validations />,
        children: [
          { path: '', element: <AnnualValidations /> },
          { path: 'individuals', element: <IndividualValidations /> },
        ],
      },
    ],
  },
];

export const adminMenu = [
  { label: 'Tableau de bord', icon: 'dashboard', path: '' },
  { label: 'Validations', icon: 'recommend', path: 'validations' },
  { label: 'Tontines annuelles', icon: 'diversity_2', path: 'annuals' },
  { label: 'Tontines individuelles', icon: 'face', path: 'individuals' },
];
