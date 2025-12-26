import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setNotification({ message: '', type: '' });

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password
      });
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      
      setNotification({ message: `🔓 Access Granted. Welcome, ${res.data.username}!`, type: 'success' });

      // Short delay for effect
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);

    } catch (error) {
      setNotification({ message: '🚫 Invalid Username or Password', type: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-96 border border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">Login 🔐</h2>

        {/* --- NOTIFICATION BANNER --- */}
        {notification.message && (
            <div className={`mb-4 p-3 rounded text-sm text-center ${
                notification.type === 'success' 
                ? 'bg-green-900/50 text-green-300 border border-green-500' 
                : 'bg-red-900/50 text-red-300 border border-red-500'
            }`}>
                {notification.message}
            </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="text" placeholder="Username" required
            className="w-full p-2 bg-gray-900 border border-gray-600 rounded text-white focus:border-blue-500 outline-none transition"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input 
            type="password" placeholder="Password" required
            className="w-full p-2 bg-gray-900 border border-gray-600 rounded text-white focus:border-blue-500 outline-none transition"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 py-2 rounded font-bold transition">
            Log In
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400 text-sm">
          Need an account? <Link to="/register" className="text-purple-400 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;