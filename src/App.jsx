import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Multiplayer from './pages/Multiplayer/Multiplayer';
import Campaign from './pages/Campaign/Campaign';
// import Training from './pages/Training/Training';
// import Settings from './pages/Settings/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Define the routes for the application */}
        <Route path="/" element={<Home />} />
        <Route path="/multiplayer" element={<Multiplayer/>} />
        <Route path="/campaign" element={<Campaign />} />
        {/* <Route path="/training" element={<Training />} />
        <Route path="/settings" element={<Settings />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
