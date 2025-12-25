import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' }); // New State
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setNotification({ message: '', type: '' }); // Clear old errors

    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        username,
        password
      });

      // Show Success Message
      setNotification({ message: '🎉 Account created! Redirecting...', type: 'success' });
      
      // Wait 1.5 seconds so they can read it, then move them
      setTimeout(() => {
          navigate('/login');
      }, 1500);

    } catch (error) {
      setNotification({ 
        message: error.response?.data?.error || 'Signup Failed', 
        type: 'error' 
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-96 border border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-400">Join GhostLink 👻</h2>

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

        <form onSubmit={handleRegister} className="space-y-4">
          <input 
            type="text" placeholder="Username" required
            className="w-full p-2 bg-gray-900 border border-gray-600 rounded text-white focus:border-purple-500 outline-none transition"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input 
            type="password" placeholder="Password" required
            className="w-full p-2 bg-gray-900 border border-gray-600 rounded text-white focus:border-purple-500 outline-none transition"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-purple-600 hover:bg-purple-500 py-2 rounded font-bold transition">
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400 text-sm">
          Already have an account? <Link to="/login" className="text-blue-400 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;