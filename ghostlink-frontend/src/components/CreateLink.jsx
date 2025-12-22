import { useState } from 'react';
import axios from 'axios';
import { useSearchParams, Link } from 'react-router-dom';

const CreateLink = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'shorten'; // Default to shorten
  
  const isBurn = mode === 'burn';
  const themeColor = isBurn ? 'text-red-500' : 'text-blue-500';
  const buttonColor = isBurn ? 'bg-red-600 hover:bg-red-500' : 'bg-blue-600 hover:bg-blue-500';

  const [inputUrl, setInputUrl] = useState('');
  const [shortLink, setShortLink] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // LOGIC: Burn = 1 click. Shorten = 10,000 clicks (effectively infinite)
    const maxClicks = isBurn ? 1 : 10000;

    try {
      const response = await axios.post('http://localhost:5000/api/links/create', {
        originalContent: inputUrl,
        maxClicks: maxClicks
      });
      setShortLink(response.data.shortUrl);
    } catch (error) {
      console.error(error);
      alert("Backend error! Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <Link to="/" className="absolute top-6 left-6 text-gray-400 hover:text-white transition">
        ← Back to Home
      </Link>

      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-700">
        <h2 className={`text-2xl font-bold mb-2 text-center ${themeColor}`}>
          {isBurn ? '🔥 Ghost Link Generator' : '🔗 URL Shortener'}
        </h2>
        <p className="text-gray-400 text-center text-sm mb-6">
          {isBurn ? 'Links are deleted after 1 view.' : 'Create a permanent short link.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              {isBurn ? 'Secret Text or Password' : 'Long URL to Shorten'}
            </label>
            <input
              type="text"
              required
              placeholder={isBurn ? "MySecretPass123" : "https://very-long-website.com..."}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${buttonColor} text-white font-bold py-2 px-4 rounded-lg transition duration-200`}
          >
            {loading ? 'Processing...' : (isBurn ? 'Create Secret Link' : 'Shorten URL')}
          </button>
        </form>

        {shortLink && (
          <div className="mt-6 p-4 bg-black/50 border border-gray-600 rounded-lg text-center">
            <p className="text-gray-300 text-sm mb-2">Your Link is Ready:</p>
            <div className="bg-gray-700 p-2 rounded text-white font-mono text-sm break-all select-all cursor-pointer">
              {shortLink}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateLink;