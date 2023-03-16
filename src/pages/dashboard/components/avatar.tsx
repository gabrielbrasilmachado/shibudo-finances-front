import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTokenStore, useUserStore } from '../../../contexts/userAuthContext';
import { Avatar, Button, Menu, MenuItem } from '@mui/material';

export const AvatarComponent = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { setToken } = useTokenStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  return (
    <>
      <Button
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
        }}
      >
        <Avatar alt={user?.first_name!} src={user?.image!}></Avatar>
      </Button>
      <Menu
        open={openMenu}
        onClose={() => {
          setAnchorEl(null);
        }}
        anchorEl={anchorEl}
      >
        <MenuItem
          onClick={() => {
            navigate('/user');
          }}
        >
          Configurações
        </MenuItem>
        <MenuItem
          onClick={() => {
            localStorage.removeItem('@ShibudoFinancesRefresh');
            localStorage.removeItem('@ShibudoFinancesToken');
            navigate('/');
            setToken(null!);
          }}
        >
          Sair
        </MenuItem>
      </Menu>
    </>
  );
};
