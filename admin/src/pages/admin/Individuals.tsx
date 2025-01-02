import { NavLink, Outlet } from 'react-router-dom';
import { H1 } from '../../components/display/H1';
import { useIdGen } from '../../hooks/useIdGen';

const tontines = [
  { label: 'Tontines journalières', path: '' },
  { label: 'Tontines hebdomadaires', path: 'weekly' },
  { label: 'Tontines mensuelles', path: 'monthly' },
  { label: 'Tontines ramassables', path: 'takable' },
];

export const Individuals = () => {
  const genId = useIdGen();
  return (
    <div>
      <H1>Tontines individuelles</H1>
      <nav className="grid grid-cols-2 md:flex items-center mt-3">
        {tontines.map((item, id) => (
          <NavLink
            to={item.path}
            key={genId(id)}
            end
            className={({ isActive }) =>
              isActive
                ? 'bg-warning font-bold text-white px-3 py-2 border border-warning text-sm truncate'
                : 'py-2 px-3 border border-warning text-sm truncate'
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
