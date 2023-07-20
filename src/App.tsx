import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import GipIronMan from "./pages/gipIronMan";
import GipSearch from "./pages/gipSearch";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="gip-iron-man" element={<GipIronMan />} />
      <Route path="gip-search" element={<GipSearch />} />
    </Routes>
  );
}

export default App;
