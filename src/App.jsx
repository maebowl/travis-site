import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BourbonProvider } from './context/BourbonContext';
import Home from './pages/Home';
import Collection from './pages/Collection';
import Manage from './pages/Manage';

function App() {
  return (
    <BourbonProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/manage" element={<Manage />} />
        </Routes>
      </BrowserRouter>
    </BourbonProvider>
  );
}

export default App;
