import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password
      });
      
      // SAVE THE TOKEN (This is the "Login" action)
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      
      alert('Welcome back, ' + res.data.username + '!');
      navigate('/app'); // Send to the main app
    } catch (error) {
      alert('Invalid Credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-96 border border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">Login 🔐</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="text" placeholder="Username" required
            className="w-full p-2 bg-gray-900 border border-gray-600 rounded text-white"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input 
            type="password" placeholder="Password" required
            className="w-full p-2 bg-gray-900 border border-gray-600 rounded text-white"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 py-2 rounded font-bold">
            Log In
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400 text-sm">
          Need an account? <Link to="/register" className="text-purple-400">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;