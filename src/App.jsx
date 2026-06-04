import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Teams from './pages/Teams';
import Tournaments from './pages/Tournaments';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Banners from './pages/Banners';
import Ratings from './pages/Ratings';
import Support from './pages/Support';
import Reports from './pages/Reports';
import Notifications from './pages/Notifications';

const isLoggedIn = () => !!localStorage.getItem('admin_token');

const PrivateRoute = ({ children }) =>
  isLoggedIn() ? children : <Navigate to="/login" replace />;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard"     element={<Dashboard />} />
          <Route path="users"         element={<Users />} />
          <Route path="teams"         element={<Teams />} />
          <Route path="tournaments"   element={<Tournaments />} />
          <Route path="products"      element={<Products />} />
          <Route path="orders"        element={<Orders />} />
          <Route path="banners"       element={<Banners />} />
          <Route path="ratings"       element={<Ratings />} />
          <Route path="support"       element={<Support />} />
          <Route path="reports"       element={<Reports />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
