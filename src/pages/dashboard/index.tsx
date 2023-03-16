import { Avatar, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../components/container';
import { useListStore } from '../../contexts/listsContext';
import {
  IUserState,
  useTokenStore,
  useUserStore,
} from '../../contexts/userAuthContext';
import { api } from '../../services/axios';
import { theme } from '../../styles/theme';
import { CreateListForm } from './components/createListForm';
import { HeaderMobile } from './components/headerMobile';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [listLoading, setListLoading] = useState<boolean>(true);
  const { setUserId, token, setToken } = useTokenStore();
  const { user, setUser } = useUserStore();
  const { lists, setLists, shouldReload } = useListStore();
  const decoded: any = jwtDecode(token!);

  const RefreshToken = async (refresh: string) => {
    setLoading(true);
    const response = await api
      .post(`refresh/`, { refresh: refresh })
      .then((res) => {
        localStorage.setItem('@ShibudoFinancesToken', res.data.access);
        setToken(res.data.access);
      })
      .catch(() => {
        localStorage.removeItem('@ShibudoFinancesRefresh');
        localStorage.removeItem('@ShibudoFinancesToken');
        navigate('/');
        setToken(null!);
      })
      .finally(() => setLoading(false));
  };

  const LoadUser = async () => {
    const response = await api
      .get<IUserState>(`users/${decoded.user_id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
        console.log(res.data);
        return res.data;
      })
      .catch(() => {
        const refresh = localStorage.getItem('@ShibudoFinancesRefresh');
        if (refresh) {
          RefreshToken(refresh);
        } else {
          navigate('/');
        }
      })
      .finally(() => setLoading(false));
  };

  const LoadLists = async () => {
    const response = await api
      .get('/lists/')
      .then((res) => {
        console.log(res.data);
        setLists(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setLoading(true);
    if (!token) {
      navigate('/');
    } else {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUserId(decoded.user_id);
      LoadUser();
      LoadLists();
    }
  }, [token, shouldReload]);

  return loading ? (
    <Container>
      <CircularProgress color='inherit' size={100} />
    </Container>
  ) : (
    <Box
      sx={{
        width: '100vw',
        minHeight: '100vh',
        height: 'fit-content',
      }}
      bgcolor={theme.palette.primary.main}
    >
      <HeaderMobile></HeaderMobile>
      <Box
        sx={{
          mt: '20px',
        }}
      >
        <CreateListForm></CreateListForm>
      </Box>
    </Box>
  );
};
