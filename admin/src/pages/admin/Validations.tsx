import { NavLink, Outlet } from 'react-router-dom';
import { H1 } from '../../components/display/H1';
import { useIdGen } from '../../hooks/useIdGen';

const validations = [
  { label: 'Tontines annuelles', path: '' },
  { label: 'Tontines individuelles', path: 'individuals' },
];

export const Validations = () => {
  const genId = useIdGen();

  return (
    <div>
      <H1>Validations en attente</H1>
      <nav className="flex items-center mt-3">
        {validations.map((item, id) => (
          <NavLink
            to={item.path}
            key={genId(id)}
            end
            className={({ isActive }) =>
              isActive
                ? 'bg-warning font-bold text-white px-3 py-2 border border-warning text-sm'
                : 'py-2 px-3 border border-warning text-sm'
            }>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
};
