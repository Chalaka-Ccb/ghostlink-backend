import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchLinks = async () => {
      const token = localStorage.getItem('token');
      
      // If no token, kick them out
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        
        const res = await axios.get('http://localhost:5000/api/links/my-links', config);
        setLinks(res.data);
      } catch (error) {
        console.error("Error fetching links", error);
        if(error.response && error.response.status === 401) {
            localStorage.clear();
            navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, [navigate]);

  const handleLogout = () => {
      localStorage.clear();
      navigate('/login');
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this link?")) return;

    try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/links/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        // Remove from UI immediately without refreshing
        setLinks(links.filter(link => link._id !== id));
    } catch (error) {
        alert("Failed to delete link");
    }
 };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          {username}'s Dashboard 📊
        </h1>
        <div className="flex gap-4">
            <Link to="/app" className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg font-bold transition">
                + New Link
            </Link>
            <button onClick={handleLogout} className="bg-gray-700 hover:bg-red-600 px-4 py-2 rounded-lg font-bold transition">
                Logout
            </button>
        </div>
      </div>

      {/* Stats Table */}
      <div className="max-w-6xl mx-auto bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
        {loading ? (
            <div className="p-8 text-center text-gray-400">Loading your data...</div>
        ) : links.length === 0 ? (
            <div className="p-12 text-center">
                <p className="text-gray-400 mb-4">You haven't created any links yet.</p>
                <Link to="/app" className="text-blue-400 hover:underline">Create your first one!</Link>
            </div>
        ) : (
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-900 text-gray-400 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-4">Short Link</th>
                            <th className="px-6 py-4">Original URL / Secret</th>
                            <th className="px-6 py-4">Clicks</th>
                            <th className="px-6 py-4">Mode</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {links.map((link) => (
                            <tr key={link._id} className="hover:bg-gray-700/50 transition">
                                <td className="px-6 py-4 font-mono text-blue-400">
                                    {link.shortId}
                                </td>
                                <td className="px-6 py-4 text-gray-300 max-w-xs truncate">
                                    {link.originalContent}
                                </td>
                                <td className="px-6 py-4 font-bold">
                                    {link.clickCount} / {link.maxClicks >= 10000 ? '∞' : link.maxClicks}
                                </td>
                                <td className="px-6 py-4">
                                    {link.maxClicks === 1 ? (
                                        <span className="bg-red-900 text-red-300 text-xs px-2 py-1 rounded">Ghost 🔥</span>
                                    ) : (
                                        <span className="bg-blue-900 text-blue-300 text-xs px-2 py-1 rounded">Short URL 🔗</span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {link.clickCount >= link.maxClicks ? (
                                        <span className="text-red-500 font-bold">Expired 💀</span>
                                    ) : (
                                        <span className="text-green-500 font-bold">Active 🟢</span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <button 
                                        onClick={() => handleDelete(link._id)}
                                        className="text-red-400 hover:text-red-300 hover:underline font-medium"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;