import { Menu as MenuIcon } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';

export const MenuButtonMobile = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  return (
    <>
      <IconButton
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
        }}
      >
        <MenuIcon></MenuIcon>
      </IconButton>
      <Menu
        open={open}
        onClose={() => {
          setAnchorEl(null);
        }}
        anchorEl={anchorEl}
      >
        <MenuItem>Batatinha</MenuItem>
      </Menu>
    </>
  );
};
