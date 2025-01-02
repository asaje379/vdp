import { useEffect } from 'react';
import { AuthStore } from '../store/auth.store';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const auth = await AuthStore.init();
      if (!auth) {
        navigate('/');
      }
    };
    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
