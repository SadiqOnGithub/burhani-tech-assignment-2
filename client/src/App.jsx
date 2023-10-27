import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as React from 'react';
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Layout from './components/Layout';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
        </Route>
      </Routes>
    </Router>
  );
}
