import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        username,
        password
      });
      alert('Account created! Please log in.');
      navigate('/login'); // Send them to login page
    } catch (error) {
      alert('Error: ' + (error.response?.data?.error || 'Signup Failed'));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-96 border border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-400">Join GhostLink 👻</h2>
        <form onSubmit={handleRegister} className="space-y-4">
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
          <button type="submit" className="w-full bg-purple-600 hover:bg-purple-500 py-2 rounded font-bold">
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400 text-sm">
          Already have an account? <Link to="/login" className="text-blue-400">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;