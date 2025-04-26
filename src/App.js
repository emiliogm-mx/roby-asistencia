import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import SugerenciasCompra from './SugerenciasCompra';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sugerencias" element={<SugerenciasCompra />} />
      </Routes>
    </Router>
  );
}

export default App;


