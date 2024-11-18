import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import EmailVerification from './pages/EmailVerification';
import ForgotPassword from './pages/ForgotPassword';

const Home = () => {
  return <div>Home</div>;
};

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/email/verify/:code' element={<EmailVerification />} />
      <Route path='/password/forgot' element={<ForgotPassword />} />
    </Routes>
  );
};

export default App;
