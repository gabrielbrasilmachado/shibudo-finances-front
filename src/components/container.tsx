import { Box } from '@mui/material';
import { IProps } from '../interfaces';
import { theme } from '../styles/theme';

export const Container = ({ children }: IProps) => (
  <Box
    sx={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
    bgcolor={theme.palette.primary.main}
  >
    {children}
  </Box>
);
