import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SiteNavbar } from './components/Navbar';
import { UserProvider } from './contexts/UserContext';
import { Register } from './components/Register';
import { Login } from './components/Login';
import { Home } from './components/Home';
import { PostProvider } from './contexts/PostContext';
import { Account } from './components/Account';
import { NotLoggedIn } from './components/NotLoggedIn';
import { EditPost } from './components/EditPost';

function App() {
  return (
    <UserProvider>
      <PostProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SiteNavbar />}>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path='/account' element={<NotLoggedIn />} />
              <Route path='/account/:Id' element={<Account />} />
              <Route path='/post/edit/:Id' element={<EditPost />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PostProvider>
    </UserProvider>
  );
}

export default App;
