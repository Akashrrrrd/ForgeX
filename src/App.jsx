import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Multiplayer from "./pages/Multiplayer/Multiplayer";
import Campaign from "./pages/Campaign/Campaign";
import Training from "./pages/Training/Training";
import RisingDawn from "./pages/RisingDawn/RisingDawn";
import Thunderbolt from "./pages/Thunderbolt/Thunderbolt"; 
// import GuardianProtocol from "./pages/GuardianProtocol/GuardianProtocol";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Define the routes for the application */}
        <Route path="/" element={<Home />} />
        <Route path="/multiplayer" element={<Multiplayer />} />
        <Route path="/campaign" element={<Campaign />} />
        <Route path="/training" element={<Training />} />
        {/* Mission pages */}
        <Route path="/missions/rising-dawn" element={<RisingDawn />} />
        <Route path="/missions/thunderbolt" element={<Thunderbolt />} />
        {/* <Route path="/missions/guardian-protocol" element={<GuardianProtocol />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
