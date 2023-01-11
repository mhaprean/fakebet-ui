import { Button, FormControl, TextField } from '@mui/material';
import { useEffect } from 'react';
import Login, { ILoginData } from '../../components/Login';
import { useLoginUserMutation } from '../../redux/features/iguDetaApi';
import { loginDeta } from '../../redux/features/iguDetaAuthSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const IgubetHome = () => {
  const iguDetaAuthState = useAppSelector((state) => state.igudetaauth);
  const dispatch = useAppDispatch();

  const [loginUser, response] = useLoginUserMutation();

  const { data: loginResponse, isSuccess, isLoading } = response;

  const handleLogin = (data: ILoginData) => {
    loginUser({ data });
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(loginDeta(loginResponse.access_token));
    }
  }, [isSuccess, loginResponse]);

  return (
    <div>
      IgubetHome
      {!iguDetaAuthState.isAuth && <Login onSubmit={handleLogin} />}
      {iguDetaAuthState.isAuth && 'user is logged in'}
    </div>
  );
};

export default IgubetHome;
