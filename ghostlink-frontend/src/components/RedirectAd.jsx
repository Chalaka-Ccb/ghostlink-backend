import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const RedirectAd = () => {
  const [searchParams] = useSearchParams();
  const destination = searchParams.get('to'); // Get the real URL
  const [timeLeft, setTimeLeft] = useState(5); // 5 Second Timer

  useEffect(() => {
    // 1. Countdown Logic
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    // 2. Redirect Logic (When timer hits 0)
    const redirectTimeout = setTimeout(() => {
      if (destination) {
        window.location.href = destination; // GO!
      }
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimeout);
    };
  }, [destination]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      
      {/* --- ADVERTISEMENT SPACE (Google AdSense Code Goes Here) --- */}
      <div className="w-full max-w-2xl h-64 bg-gray-800 border-2 border-dashed border-gray-700 rounded-xl flex items-center justify-center mb-8 relative overflow-hidden">
        <div className="text-center">
            <p className="text-gray-500 font-bold mb-2">Advertisement</p>
            <p className="text-sm text-gray-600">Google Ads will appear here</p>
        </div>
        
        {/* Fake Ad Animation (Delete this when you add real ads) */}
        <div 
            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"
            style={{
              animation: 'slide 5s infinite'
            }}
        />
        <style>{`
          @keyframes slide {
            0% { transform: translateX(-100%); }
            50% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `}</style>
      </div>
      {/* ----------------------------------------------------------- */}

      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">You are being redirected...</h1>
        
        <div className="inline-block p-6 rounded-full bg-gray-800 border-4 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]">
            <span className="text-4xl font-mono font-bold text-blue-400">
                {timeLeft > 0 ? timeLeft : '🚀'}
            </span>
        </div>

        <p className="mt-6 text-gray-400">
            Please wait while we prepare your link.
        </p>
        
        {/* Manual Button (Just in case auto-redirect fails) */}
        {timeLeft === 0 && (
            <a 
                href={destination} 
                className="inline-block mt-4 text-blue-400 hover:text-blue-300 underline"
            >
                Click here if not redirected
            </a>
        )}
      </div>
    </div>
  );
};

export default RedirectAd;
