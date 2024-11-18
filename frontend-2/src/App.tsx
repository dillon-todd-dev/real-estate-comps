import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';

const Home = () => {
  return <div>Home</div>;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
