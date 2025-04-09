import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route avec :id */}
        <Route path="/user/:id" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;