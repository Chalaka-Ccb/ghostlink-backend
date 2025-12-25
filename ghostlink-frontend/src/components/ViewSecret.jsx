import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewSecret = () => {
  const { shortId } = useParams();
  const [secret, setSecret] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSecret = async () => {
      try {
        // Call the backend to get the secret (and burn it!)
        const response = await axios.get(`http://localhost:5000/${shortId}`);
        setSecret(response.data.originalContent);
      } catch (err) {
        if (err.response && err.response.status === 404) {
            setError("This link has vanished or never existed. 👻");
        } else {
            setError("Error retrieving secret.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSecret();
  }, [shortId]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        
        {loading && <h2 className="text-2xl animate-pulse text-blue-400">Decrypting Ghost Message...</h2>}

        {error && (
          <div className="bg-red-900/50 border border-red-500 p-8 rounded-xl">
            <div className="text-5xl mb-4">🚫</div>
            <h2 className="text-2xl font-bold text-red-400 mb-2">Gone Forever</h2>
            <p className="text-gray-300">{error}</p>
          </div>
        )}

        {secret && (
          <div className="bg-gray-900 border border-green-500/50 p-8 rounded-xl shadow-[0_0_50px_rgba(0,255,0,0.1)]">
            <div className="text-5xl mb-4">🔓</div>
            <h2 className="text-xl text-green-400 font-mono mb-6 uppercase tracking-widest">
              Decrypted Message
            </h2>
            <div className="bg-black p-6 rounded-lg border border-gray-700">
                <p className="text-2xl font-bold text-white break-words font-mono">
                    {secret}
                </p>
            </div>
            <p className="text-red-400 text-sm mt-6 font-bold animate-pulse">
                ⚠️ This message has been deleted from the server. Don't refresh!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewSecret;