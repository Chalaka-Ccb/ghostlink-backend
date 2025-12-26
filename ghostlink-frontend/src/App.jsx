import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // <--- Import
import LandingPage from './components/LandingPage';
import CreateLink from './components/CreateLink';
import ViewSecret from './components/ViewSecret';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import RedirectAd from './components/RedirectAd';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white font-sans">
        <Navbar /> {/* <--- Sticky Navbar sits here */}
        
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/app" element={<CreateLink />} />
          <Route path="/view/:shortId" element={<ViewSecret />} />
          <Route path="/redirect" element={<RedirectAd />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;