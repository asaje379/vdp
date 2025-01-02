import { NavLink } from 'react-router-dom';
import { useIdGen } from '../hooks/useIdGen';
import { adminMenu } from '../router/routes';
import { Icon } from '../components/display/Icon';
import logo from '../assets/icon.png';

export const Sidebar = () => {
  const genId = useIdGen();

  return (
    <div className="hidden md:block p-4 py-8 h-full bg-primary text-slate-100 to-warning max-w-[250px]">
      <div className="text-lg font-bold p-2 flex justify-center">
        <img
          src={logo}
          alt="OPENECO"
          width={100}
          className="rounded"
        />
      </div>
      <nav className="flex flex-col gap-6 pt-12">
        {adminMenu.map((menu, index) => (
          <NavLink
            to={menu.path}
            key={genId(index)}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 py-3 text-slate-300` +
              (isActive ? ' border-warning border-l-4 border' : '')
            }>
            <Icon name={menu.icon} />
            <span>{menu.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
