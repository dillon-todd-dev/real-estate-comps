import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import EmailVerification from './pages/EmailVerification';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import LayoutContainer from './components/LayoutContainer';
import Properties from './pages/Properties';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<LayoutContainer />}>
        <Route index element={<Profile />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/properties' element={<Properties />} />
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/email/verify/:code' element={<EmailVerification />} />
      <Route path='/password/forgot' element={<ForgotPassword />} />
      <Route path='/password/reset' element={<ResetPassword />} />
    </Routes>
  );
};

export default App;
