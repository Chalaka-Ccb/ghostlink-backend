import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-6">
        GhostLink 👻
      </h1>
      <p className="text-xl text-gray-400 max-w-2xl mb-10">
        The ultimate privacy tool. Shorten URLs for tracking or create self-destructing links for secrets.
        <br /> <span className="text-blue-400 font-bold">No logs. No traces.</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {/* Option 1: URL Shortener */}
        <Link to="/app?mode=shorten" className="group block bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-blue-500 transition hover:shadow-lg hover:shadow-blue-500/20">
          <div className="text-4xl mb-4">🔗</div>
          <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-400">URL Shortener</h2>
          <p className="text-gray-400">Shorten long links. Track clicks. Share easily.</p>
        </Link>

        {/* Option 2: Ghost Mode */}
        <Link to="/app?mode=burn" className="group block bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-red-500 transition hover:shadow-lg hover:shadow-red-500/20">
          <div className="text-4xl mb-4">🔥</div>
          <h2 className="text-2xl font-bold mb-2 group-hover:text-red-400">Burn After Reading</h2>
          <p className="text-gray-400">Share passwords & secrets. Links die after 1 view.</p>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;