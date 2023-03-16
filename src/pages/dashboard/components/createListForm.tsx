import { Button, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { theme } from '../../../styles/theme';
import { useForm } from 'react-hook-form';
import {
  createListSchema,
  ICreateListSchema,
} from '../../../schemas/createList';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '../../../services/axios';
import { useListStore } from '../../../contexts/listsContext';
import { toast } from 'react-toastify';

const monthOptions = [
  { valor: ' ', nome: 'Selecione um mês' },
  { valor: 'january', nome: 'Janeiro' },
  { valor: 'february', nome: 'Fevereiro' },
  { valor: 'march', nome: 'Março' },
  { valor: 'april', nome: 'Abril' },
  { valor: 'may', nome: 'Maio' },
  { valor: 'june', nome: 'Junho' },
  { valor: 'july', nome: 'Julho' },
  { valor: 'august', nome: 'Agosto' },
  { valor: 'september', nome: 'Setembro' },
  { valor: 'october', nome: 'Outubro' },
  { valor: 'november', nome: 'Novembro' },
  { valor: 'december', nome: 'Dezembro' },
];

const yearOptions = [
  { valor: '0', nome: 'Selecione um ano' },
  { valor: '2023', nome: 2023 },
  { valor: '2024', nome: 2024 },
  { valor: '2025', nome: 2025 },
  { valor: '2026', nome: 2026 },
  { valor: '2027', nome: 2027 },
  { valor: '2028', nome: 2028 },
  { valor: '2029', nome: 2029 },
  { valor: '2030', nome: 2030 },
];

export const CreateListForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateListSchema>({ resolver: zodResolver(createListSchema) });

  const { lists, setLists, setShouldReload, shouldReload } = useListStore();

  const onSubmit = (payload: any) => {
    payload.year = Number(payload.year);
    createList(payload);
  };

  const createList = async (payload: any) => {
    const response = await api
      .post('/lists/', payload)
      .then((res) => {
        setShouldReload(!shouldReload);
        toast.success('Lista criada com sucesso!');
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status == 409) {
          toast.error('Você já possui uma lista neste mês e ano');
        } else {
          toast.error('Algo deu errado!');
        }
      });
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        bgcolor: theme.palette.grey[300],
        width: '90%',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: '10px',
        borderRadius: '12px',
      }}
    >
      <Typography sx={{ mb: '10px' }}>Crie uma lista de finanças:</Typography>
      <TextField
        id='description'
        size='small'
        label='Descrição da lista *'
        sx={{ width: '90%' }}
        {...register('name')}
        error={Boolean(errors.name)}
        helperText={errors.name ? errors.name.message : ' '}
      />
      <Select
        size='small'
        defaultValue={' '}
        sx={{ width: '90%' }}
        {...register('month')}
        error={Boolean(errors.month)}
      >
        {monthOptions.map((mes) => (
          <MenuItem key={mes.valor} value={mes.valor}>
            {mes.nome}
          </MenuItem>
        ))}
      </Select>
      {errors.month && (
        <Typography
          fontSize={'12px'}
          alignSelf='flex-start'
          ml={'10%'}
          color='error'
        >
          {errors.month?.message}
        </Typography>
      )}
      <Select
        size='small'
        sx={{ width: '90%' }}
        {...register('year')}
        defaultValue={'0'}
      >
        {yearOptions.map((year) => (
          <MenuItem key={year.valor} value={year.valor}>
            {year.nome}
          </MenuItem>
        ))}
      </Select>
      {errors.year && (
        <Typography
          fontSize={'12px'}
          alignSelf='flex-start'
          ml={'10%'}
          color='error'
        >
          {errors.year?.message}
        </Typography>
      )}
      <Button
        type='submit'
        variant='contained'
        disableElevation
        sx={{ mt: '10px' }}
      >
        Criar lista
      </Button>
    </Box>
  );
};
