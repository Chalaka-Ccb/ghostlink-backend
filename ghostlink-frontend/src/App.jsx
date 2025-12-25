import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import CreateLink from './components/CreateLink';
import ViewSecret from './components/ViewSecret';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<CreateLink />} />
        <Route path="/view/:shortId" element={<ViewSecret />} />
      </Routes>
    </Router>
  );
}

export default App;