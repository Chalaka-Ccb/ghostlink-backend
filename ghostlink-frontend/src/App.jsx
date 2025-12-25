import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import CreateLink from './components/CreateLink';
import ViewSecret from './components/ViewSecret';
import Login from './components/Login'; 
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/app" element={<CreateLink />} />
        <Route path="/view/:shortId" element={<ViewSecret />} />
      </Routes>
    </Router>
  );
}
export default App;