import { NavLink } from 'react-router-dom';
import logo from '../assets/icon.png';
import { Dropdown } from '../components/actions/Dropdown';
import { Icon } from '../components/display/Icon';
import { adminMenu } from '../router/routes';
import { useIdGen } from '../hooks/useIdGen';

export const Topbar = () => {
  const genId = useIdGen();

  return (
    <div className="shadow w-full flex justify-between bg-primary md:hidden text-slate-100 md:text-slate-600 items-center py-2 pl-4 pr-6">
      <img
        src={logo}
        alt="OPENECO"
        width={60}
        className="rounded"
      />
      <div className="block md:hidden">
        <Dropdown
          content={
            <nav className="flex flex-col gap-2 p-2 w-[240px] absolute right-0 shadow-xl bg-white">
              {adminMenu.map((menu, index) => (
                <NavLink
                  to={menu.path}
                  key={genId(index)}
                  end
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-1 text-slate-800` +
                    (isActive ? ' text-warning' : '')
                  }>
                  <Icon name={menu.icon} />
                  <span>{menu.label}</span>
                </NavLink>
              ))}
            </nav>
          }>
          <Icon
            name="menu"
            size={36}
            className="text-slate-300"
          />
        </Dropdown>
      </div>
    </div>
  );
};
