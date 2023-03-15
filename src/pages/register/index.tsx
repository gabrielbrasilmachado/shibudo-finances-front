import { AddAPhoto, Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Typography,
  Link,
  TextField,
  IconButton,
  Button,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '../../services/axios';
import { theme } from '../../styles/theme';
import { IRegisterSchema, registerSchema } from '../../schemas/register';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterSchema>({ resolver: zodResolver(registerSchema) });
  const [loading, setLoading] = useState<boolean>(false);
  const [isImageSet, setIsImageSet] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const navigate = useNavigate();
  const onSubmit = async (data: any) => {
    try {
      data = { ...data, image: data.image[0] };
      setLoading(true);
      const response = await api.post('/users/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Cadastro realizado com sucesso');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error: any | Error | AxiosError) {
      if (error?.response?.data.hasOwnProperty('email')) {
        toast.error('Já existe um usuário cadastrado com esse email', {
          autoClose: 2500,
        });
      }
      if (error?.response?.data.hasOwnProperty('username')) {
        toast.error(
          'Já existe um usuário cadastrado com esse nome de usuário',
          { autoClose: 2500 }
        );
      }
      console.log(error.response.data);
    } finally {
      setLoading(false);
    }
  };

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
        borderRadius: '8px',
        padding: { xs: 3 },
      }}
    >
      <TextField
        id='username'
        label='Nome de usuário *'
        size='small'
        {...register('username')}
        error={Boolean(errors.username)}
        helperText={errors.username ? errors.username.message : ' '}
      ></TextField>
      <TextField
        id='first_name'
        label='Primeiro nome *'
        size='small'
        {...register('first_name')}
        error={Boolean(errors.first_name)}
        helperText={errors.first_name ? errors.first_name.message : ' '}
      ></TextField>
      <TextField
        id='email'
        label='Email *'
        size='small'
        {...register('email')}
        error={Boolean(errors.email)}
        helperText={errors.email ? errors.email.message : ' '}
      ></TextField>
      <TextField
        id='password'
        label='Senha *'
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
      <TextField
        id='confirmPassword'
        label='Confirmar senha *'
        type={showConfirmPassword ? 'text' : 'password'}
        size='small'
        error={Boolean(errors.confirmPassword)}
        helperText={
          errors.confirmPassword ? errors.confirmPassword.message : ' '
        }
        InputProps={{
          endAdornment: (
            <IconButton
              color='primary'
              onClick={() => {
                setShowConfirmPassword(!showConfirmPassword);
              }}
            >
              {showConfirmPassword ? (
                <VisibilityOff></VisibilityOff>
              ) : (
                <Visibility></Visibility>
              )}
            </IconButton>
          ),
        }}
        {...register('confirmPassword')}
      ></TextField>
      <Box display='flex' flexDirection='column'>
        <Button
          variant='contained'
          color={isImageSet ? 'primary' : 'error'}
          component='label'
          disableElevation
          size='small'
        >
          <input
            type='file'
            accept='image/*'
            hidden
            {...register('image', {
              onChange: (e) => {
                setIsImageSet(Boolean(e.target.files.length));
              },
            })}
          />
          Enviar imagem
          <IconButton size='small' color='inherit'>
            <AddAPhoto></AddAPhoto>
          </IconButton>
        </Button>
        {errors.image?.message && (
          <Typography
            color='error'
            fontSize={'12px'}
            margin='3px 14px 0px 14px'
          >
            {String(errors.image.message)}
          </Typography>
        )}
      </Box>
      <LoadingButton
        variant='contained'
        loading={loading}
        disableElevation
        type='submit'
      >
        Cadastrar
      </LoadingButton>
      <Typography sx={{ mt: '10px', alignSelf: 'center' }}>
        Já é cadastrado?
      </Typography>
      <Link sx={{ alignSelf: 'center' }} href='/'>
        Login
      </Link>
    </Box>
  );
};
