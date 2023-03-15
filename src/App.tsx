import { ThemeProvider } from '@mui/material/styles';
import { theme } from './styles/theme';
import { RoutesMain } from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer
        position='top-center'
        autoClose={1500}
        hideProgressBar={false}
        closeOnClick
        theme='colored'
      />
      <RoutesMain></RoutesMain>
    </ThemeProvider>
  );
}

export default App;
