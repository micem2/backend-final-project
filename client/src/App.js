import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SiteNavbar } from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<SiteNavbar />}>

      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
