import { Menu } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { theme } from '../../../styles/theme';
import { AvatarComponent } from './avatar';
import { MenuButtonMobile } from './menuButtonMobile';

export const HeaderMobile = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '60px',
        zIndex: 100,
        bgcolor: theme.palette.grey[300],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: '0',
        left: '0',
      }}
    >
      <MenuButtonMobile />
      <Typography fontSize={20} color={theme.palette.primary.dark}>
        Shibudo Finances
      </Typography>
      <AvatarComponent />
    </Box>
  );
};
