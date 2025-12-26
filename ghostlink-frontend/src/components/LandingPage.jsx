import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Zap, TrendingUp, Globe, Lock } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-20 sm:py-32 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
              Control Your Links. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                Secure Your Secrets.
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              The all-in-one platform for digital marketers and privacy advocates. 
              Shorten URLs for campaigns or send self-destructing messages that vanish after one read.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/register" className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                Start for Free
              </Link>
              <Link to="/app" className="text-sm font-semibold leading-6 text-gray-100">
                Try Guest Mode <span aria-hidden="true">→</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 2. DUAL MODE SECTION (The "Choice") */}
      <div className="py-24 sm:py-32 bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-blue-400">Two Powerful Modes</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Everything you need in one place
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Marketer Card */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-blue-500 transition"
            >
              <div className="h-12 w-12 bg-blue-900/50 rounded-lg flex items-center justify-center mb-6 text-blue-400">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">For Marketers 🚀</h3>
              <p className="text-gray-400 mb-6">
                Turn long, ugly affiliate links into clean, branded URLs. Track clicks, analyze traffic sources, and optimize your campaigns.
              </p>
              <ul className="space-y-3 text-gray-400 mb-8">
                <li className="flex gap-2"><Zap size={18} className="text-yellow-400"/> Instant Redirection</li>
                <li className="flex gap-2"><Globe size={18} className="text-blue-400"/> Custom Branded Aliases</li>
                <li className="flex gap-2"><TrendingUp size={18} className="text-green-400"/> Click Analytics</li>
              </ul>
              <Link to="/app?mode=shorten" className="w-full block text-center bg-gray-700 hover:bg-blue-600 py-3 rounded-lg font-bold transition">
                Create Short Link
              </Link>
            </motion.div>

            {/* Privacy Card */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-red-500 transition"
            >
              <div className="h-12 w-12 bg-red-900/50 rounded-lg flex items-center justify-center mb-6 text-red-400">
                <Shield size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">For Privacy 🕵️</h3>
              <p className="text-gray-400 mb-6">
                Share passwords, API keys, or private notes securely. Links self-destruct immediately after being viewed once. No logs kept.
              </p>
              <ul className="space-y-3 text-gray-400 mb-8">
                <li className="flex gap-2"><Lock size={18} className="text-red-400"/> End-to-End Encryption</li>
                <li className="flex gap-2"><Zap size={18} className="text-yellow-400"/> 1-Click Auto Burn</li>
                <li className="flex gap-2"><Shield size={18} className="text-purple-400"/> Zero-Knowledge Storage</li>
              </ul>
              <Link to="/app?mode=burn" className="w-full block text-center bg-gray-700 hover:bg-red-600 py-3 rounded-lg font-bold transition">
                Create Ghost Link
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 3. SEO / CONTENT SECTION (Good for AdSense) */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 text-gray-300">
        <h2 className="text-3xl font-bold text-white mb-8">Why use a URL Shortener?</h2>
        <div className="space-y-6 text-lg">
          <p>
            In today's digital landscape, a <strong>URL shortener</strong> is an essential tool for content creators. 
            Long links look suspicious and take up valuable character limits on social media platforms like X (Twitter).
          </p>
          <p>
            <strong>GhostLink</strong> offers a unique advantage by combining standard link management with high-security features. 
            Whether you are an influencer tracking affiliate sales or a developer sharing an `.env` file, we have you covered.
          </p>
          <p>
            By using branded links (e.g., `ghost.link/my-brand`), you can increase click-through rates (CTR) by up to 34%. 
            Trust is the currency of the internet, and clean links build trust.
          </p>
        </div>
      </div>

      {/* 4. FOOTER */}
      <footer className="bg-gray-900 py-12 text-center text-gray-500 text-sm">
        <p>© 2025 GhostLink Inc. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-4">
          <span className="hover:text-white cursor-pointer">Privacy Policy</span>
          <span className="hover:text-white cursor-pointer">Terms of Service</span>
          <span className="hover:text-white cursor-pointer">Contact</span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;