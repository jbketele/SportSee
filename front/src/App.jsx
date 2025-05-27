import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import Home from './pages/Home';
import MockSwitchPage from "./pages/MockSwitchPage";

function App() {
  const [useMock, setUseMock] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MockSwitchPage useMock={useMock} setUseMock={setUseMock} />} />
        <Route path="/user/:id" element={<Home useMock={useMock} />} />
      </Routes>
    </Router>
  );
}

export default App;