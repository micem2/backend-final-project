import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SiteNavbar } from './components/Navbar';
import { UserProvider } from './contexts/UserContext';
import { Register } from './components/Register';
import { Login } from './components/Login';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SiteNavbar />}>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
