import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as React from 'react';
import LinkPage from "./pages/LinkPage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Unauthorized from "./pages/Unauthorized";
import Layout from './components/Layout';
import UserHome from './pages/UserHome';
import RequireAuth from './components/RequireAuth';
import DriverHome from './pages/DriverHome';
import DriverSelectBooking from './pages/DriverSelectBooking';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          {/* PUBLIC ROUTES */}
          <Route path='/' element={<LinkPage />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='signin' element={<SignIn />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* PROTECTED ROUTES */}
          <Route element={<RequireAuth allowedRoles={['User']} />}>
            <Route path="/userhome" element={<UserHome />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={['Driver']} />}>
            <Route path="/driverhome" element={<DriverHome />} />
            <Route path="/driverhome/:bookingId" element={<DriverSelectBooking />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
