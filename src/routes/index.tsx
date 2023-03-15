import { Route, Routes } from 'react-router-dom';
import { Container } from '../components/container';
import { DashboardPage } from '../pages/dashboard';
import { LoginPage } from '../pages/login';
import { RegisterPage } from '../pages/register';

export const RoutesMain = () => (
  <Routes>
    <Route
      path='/'
      element={
        <Container>
          <LoginPage></LoginPage>
        </Container>
      }
    ></Route>
    <Route
      path='/register'
      element={
        <Container>
          <RegisterPage></RegisterPage>
        </Container>
      }
    ></Route>
    <Route path='/dashboard' element={<DashboardPage></DashboardPage>}></Route>
  </Routes>
);
