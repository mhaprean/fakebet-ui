import { Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

const StyledLogin = styled('div')`
  .login-form {
    max-width: 300px;
  }
  .input-field {
    margin: 10px 0;
  }
`;

export interface ILoginData {
  name: string;
  password: string;
}

interface IPropsLogin {
  onSubmit?: (data: ILoginData) => void;
}

const Login = ({ onSubmit = () => {} }: IPropsLogin) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    ev.stopPropagation();

    onSubmit({ name: username, password });
  };

  const handleLogin = () => {
    onSubmit({ name: username, password });
  };

  return (
    <StyledLogin className="Login">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-field">
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-field">
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type={'password'}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button onClick={handleLogin} variant="contained" fullWidth>
          submit
        </Button>
      </form>
    </StyledLogin>
  );
};

export default Login;
