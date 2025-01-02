import { BaseLayout } from '../layouts/BaseLayout';
import { Outlet } from 'react-router-dom';

export const Root = () => {
  return (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  );
};
