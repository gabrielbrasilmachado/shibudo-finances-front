import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Typography,
  Link,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ILoginSchema, loginSchema } from '../../schemas/login';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '../../services/axios';
import { theme } from '../../styles/theme';
import { useTokenStore } from '../../contexts/userAuthContext';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginSchema>({ resolver: zodResolver(loginSchema) });

  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setToken, setRefresh, token } = useTokenStore();

  const onSubmit = async (payload: any) => {
    setLoading(true);
    const response = await api
      .post('/login/', payload)
      .then((res) => {
        setToken(res.data.access);
        setRefresh(res.data.refresh);
        localStorage.setItem('@ShibudoFinancesToken', res.data.access);
        localStorage.setItem('@ShibudoFinancesRefresh', res.data.refresh);
        toast.success('Login realizado com sucesso!');
        navigate('/dashboard');
      })
      .catch((error) => {
        if (error?.response?.status == 401) {
          toast.error('Email ou senha incorretos!');
        } else {
          toast.error('Algo deu errado, tente novamente mais tarde!');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  });

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        width: {
          xs: '80%',
          md: '50%',
        },
        maxWidth: '500px',
        height: 'fit-content',
        display: 'flex',
        gap: '5px',
        flexDirection: 'column',
        bgcolor: theme.palette.grey[50],
        borderRadius: '12px',
        padding: { xs: 2 },
      }}
    >
      <TextField
        id='email'
        label='Digite seu email *'
        {...register('email')}
        size='small'
        error={Boolean(errors.email)}
        helperText={errors.email ? errors.email.message : ' '}
      ></TextField>
      <TextField
        id='password'
        label='Digite sua senha *'
        type={showPassword ? 'text' : 'password'}
        size='small'
        error={Boolean(errors.password)}
        helperText={errors.password ? errors.password.message : ' '}
        InputProps={{
          endAdornment: (
            <IconButton
              color='primary'
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? (
                <VisibilityOff></VisibilityOff>
              ) : (
                <Visibility></Visibility>
              )}
            </IconButton>
          ),
        }}
        {...register('password')}
      ></TextField>
      <LoadingButton
        variant='contained'
        loading={loading}
        disableElevation
        type='submit'
      >
        Login
      </LoadingButton>
      <Typography sx={{ mt: '10px', alignSelf: 'center' }}>
        Ainda não possui uma conta?
      </Typography>
      <Link sx={{ alignSelf: 'center' }} href='/register'>
        Cadastrar
      </Link>
    </Box>
  );
};
