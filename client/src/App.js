import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SiteNavbar } from './components/Navbar';
import { UserProvider } from './contexts/UserContext';
import { Register } from './components/Register';
import { Login } from './components/Login';
import { Home } from './components/Home';
import { PostProvider } from './contexts/PostContext';
import { PostList } from './components/PostList';

function App() {
  return (
    <UserProvider>
      <PostProvider>
        <BrowserRouter>
          <SiteNavbar />
          <Routes>
            <Route path="/" element={<Home />}>
              <Route index element={<PostList />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </PostProvider>
    </UserProvider>
  );
}

export default App;
