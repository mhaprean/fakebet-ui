import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItemIcon,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Slide,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';

import {
  Close as CloseIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Person as PersonIcon,
  PersonAdd as PersonAddIcon,
} from '@mui/icons-material';
import {
  useLoginMutation,
  useRegisterMutation,
  useCreateAccountMutation,
} from '../../redux/features/strapiApi';
import { useAppDispatch } from '../../redux/hooks';
import { loginUser } from '../../redux/features/authSlice';
import classNames from 'classnames';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledLoginRegister = styled(Box)`
  display: flex;
  align-items: center;
  .button-login,
  .button-register {
    margin-right: 10px;
    padding: 5px 10px;
  }

  &.isSidebar {
    flex-direction: column;
  }
`;

const StyledDialog = styled(Dialog)`
  .dialog-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${(props) => props.theme.palette.background.default};
  }
  .dialog-content {
    background: ${(props) => props.theme.palette.background.default};
  }
  .form-content {
    display: flex;
    flex-direction: column;

    .text-field {
      margin-top: 20px;

      .MuiInputBase-root {
        background: ${(props) => props.theme.palette.background.paper};
      }
    }
  }

  .errorMessage {
    color: ${(props) => props.theme.palette.error.main};
    font-weight: ${(props) => props.theme.typography.fontWeightMedium};
    line-height: 1;
    margin-top: 15px;
  }
`;

interface IFormFields {
  username: string;
  password: string;
  email: string;
}

const randomIntFromInterval = (min: number, max: number) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const validateEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const validateUsername = (username: string) => {
  if (username.length < 4) {
    return false;
  }
  const regex = /^(?=[a-zA-Z])[a-zA-Z0-9]*[-]?[a-zA-Z0-9]*$/;
  return regex.test(username);
};

const LoginRegister = ({ isSidebar = false }: { isSidebar?: boolean }) => {
  const [open, setOpen] = useState(false);

  const [isLoginMode, setLoginMode] = useState(true);

  const [showPass, setShowPass] = useState(false);

  const [error, setError] = useState('');

  const [values, setValues] = useState<IFormFields>({
    username: '',
    password: '',
    email: '',
  });

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [registerStrapi, { isLoading: isRegisterLoading, isSuccess: isSuccessRegister }] =
    useRegisterMutation();

  const [loginStrapi, { isLoading: isLoginLoading, isSuccess: isSuccessLogin }] = useLoginMutation();

  const [createAccount, createAccountResponse] = useCreateAccountMutation();

  const dispatch = useAppDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const handleRegister = async () => {
    if (isRegisterLoading || isSuccessRegister) {
      return null;
    }

    try {
      const accImage = `/images/${randomIntFromInterval(1, 70)}.jpg`;
      const newUser = {
        username: values.username,
        email: values.email,
        password: values.password,
        preferred_theme: 'dark',
        current_balance: 10000,
        image: accImage,
      };

      const res = await registerStrapi(newUser).unwrap();

      if (res && res.user && res.jwt) {
        const createAcc = await createAccount({
          user: res.user.id,
          user_id: res.user.id,
        }).unwrap();

        if (createAcc) {
          dispatch(loginUser({ user: res.user, access_token: res.jwt }));
        }

        handleClose();
      }
    } catch (error: any) {
      if (error.status === 400) {
        console.log('!!!!!!! error here status 400 ', error);
      }
      if (error.data && error.data.error && error.data.error.message) {
        console.log('set error message with this value: ', error.data.error.message);
        setError(error.data.error.message);
      }

      console.log('error during register: ', error);
    }
  };

  const handleLogin = async () => {
    if (isLoginLoading || isSuccessLogin) {
      return null;
    }

    try {
      const res = await loginStrapi({
        identifier: values.username, // identifier can be username or email
        password: values.password,
      }).unwrap();

      if (res && res.jwt && res.user) {
        dispatch(loginUser({ user: res.user, access_token: res.jwt }));

        handleClose();
      }
    } catch (error: any) {
      console.log('!!!!!!!!!! errror here', error);
      if (error.status === 400) {
        console.log('!!!!!!! error here status 400 ', error);
      }
      if (error.data && error.data.error && error.data.error.message) {
        console.log('set error message with this value: ', error.data.error.message);
        setError(error.data.error.message);
      }
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (isLoginMode) {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  const handleChange = (prop: keyof IFormFields) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const resetFormState = () => {
    setValues({
      username: '',
      email: '',
      password: '',
    });
    setOpen(true);
    setError('');
    setShowPass(false);
  };

  return (
    <StyledLoginRegister className={classNames('LoginRegister', { isSidebar })}>
      {!isSidebar ? (
        <>
          <Button
            className="button-login"
            variant="contained"
            color="secondary"
            onClick={() => {
              resetFormState();
              setLoginMode(true);
            }}
            startIcon={<PersonIcon />}
          >
            Login
          </Button>
          <Button
            className="button-register"
            variant="outlined"
            color="secondary"
            onClick={() => {
              resetFormState();
              setLoginMode(false);
            }}
            startIcon={<PersonAddIcon />}
          >
            Register
          </Button>
        </>
      ) : (
        <>
          <List sx={{ width: '100%' }}>
            <MenuItem
              onClick={() => {
                resetFormState();
                setLoginMode(true);
              }}
            >
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Login</ListItemText>
            </MenuItem>

            <MenuItem
              onClick={() => {
                resetFormState();
                setLoginMode(false);
              }}
            >
              <ListItemIcon>
                <PersonAddIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Register</ListItemText>
            </MenuItem>
          </List>
        </>
      )}

      <StyledDialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullScreen={fullScreen}
      >
        <DialogTitle className="dialog-title">
          <Typography id="modal-modal-title" variant="h3" component="div">
            {isLoginMode ? 'Login' : 'Register'}
          </Typography>
          <IconButton onClick={handleClose} sx={{ color: 'text.primary' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent className="dialog-content">
          <form action="" onSubmit={(e) => handleSubmit(e)}>
            <div className="form-content">
              {!isLoginMode && (
                <TextField
                  className="text-field"
                  label="Email"
                  variant="outlined"
                  value={values.email}
                  onChange={handleChange('email')}
                  required
                />
              )}

              <TextField
                className="text-field"
                id="outlined-basic"
                label="Username"
                name="username"
                variant="outlined"
                value={values.username}
                onChange={handleChange('username')}
                required
              />

              <FormControl className="text-field" variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  type={showPass ? 'text' : 'password'}
                  value={values.password}
                  name={'password'}
                  onChange={handleChange('password')}
                  required
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPass(!showPass)}
                        edge="end"
                      >
                        {showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>

              {error && (
                <Typography className="errorMessage" variant="caption" component="div">
                  {error}
                </Typography>
              )}

              {isLoginMode ? (
                <Button type="submit" variant="contained" size="large" style={{ marginTop: 20 }} fullWidth>
                  {isLoginLoading ? 'Loading...' : 'Login'}
                </Button>
              ) : (
                <Button type="submit" variant="contained" size="large" style={{ marginTop: 20 }} fullWidth>
                  {isRegisterLoading ? 'Loading...' : 'Register'}
                </Button>
              )}
            </div>
          </form>
        </DialogContent>
      </StyledDialog>
    </StyledLoginRegister>
  );
};

export default LoginRegister;
