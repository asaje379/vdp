import { useNavigate } from 'react-router';
import { Button } from '../components/buttons/Button';
import { Form } from '../components/form-fields/Form';
import { Input } from '../components/form-fields/Input';
import { Password } from '../components/form-fields/Password';
import { ChangeEvent, useState } from 'react';
import { authApi } from '../api/auth.api';
import { useToast } from '../components/providers/ToastProvider';
import { AuthStore } from '../store/auth.store';
import logo from '../assets/icon.png';

export const Login = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({
    username: '',
    password: '',
  });
  const openToast = useToast();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setAuth({ ...auth, [name]: value });
  };

  const handleSubmit = async () => {
    const isLogged = await authApi.login({
      ...auth,
      username: auth.username.startsWith('+229')
        ? auth.username
        : `+229${auth.username}`,
    });

    if (!isLogged) {
      openToast({ type: 'error', info: 'Identifiants incorrects.' });
      return;
    }

    await AuthStore.set(isLogged.token);
    navigate('/admin');
  };

  return (
    <div className="h-screen bg-white">
      <div className="w-[80%] md:w-[30%] mx-auto mt-20">
        <div className="flex justify-center">
          <img
            src={logo}
            alt="OPENECO LOGO"
            width={100}
          />
        </div>

        <div className="font-bold mt-4 mb-8 text-2xl text-center text-slate-500">
          Espace d'administration
        </div>
        <div className="border border-slate-200 p-8 shadow-lg bg-white rounded-xl">
          <Form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6">
            <Input
              value={auth.username}
              name="username"
              onChange={handleChange}
              label="Numéro de téléphone"
            />
            <Password
              name="password"
              onChange={handleChange}
              label="Mot de passe"
            />
            <Button className="w-full bg-primary shadow-none">
              Se connecter
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
