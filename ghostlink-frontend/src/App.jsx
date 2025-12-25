import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import CreateLink from './components/CreateLink';
import ViewSecret from './components/ViewSecret';
import Login from './components/Login'; 
import Register from './components/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<CreateLink />} />
        <Route path="/view/:shortId" element={<ViewSecret />} />
        <Route path="/login" element={<Login />} />       
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;