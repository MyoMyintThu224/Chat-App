import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../lib/firebase';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import reactLogo from '../assets/logo512.png';
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      onLogin(); // ✅ Session မှာ isLoggedIn = true ထည့်ပြီး ChatBox ကိုသွားမယ်
      navigate('/chat'); // ✅ Google login ပြီး ChatBox သို့သွားမယ်
    } catch (err) {
      setError("Google login failed");
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin(); // ✅ Email login လည်း session ထဲ login state သိမ်းမယ်
      navigate('/chat'); // ✅ Login ပြီး ChatBox သို့သွားမယ်
    } catch (err) {
      setError("Email login failed. Check your email or password.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${reactLogo})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />

      <div className="relative z-10 bg-white/20 p-10 rounded-2xl shadow-2xl w-full max-w-md backdrop-blur-md border border-white border-opacity-30">
        <h1 className="text-5xl font-extrabold text-center text-white drop-shadow mb-4 animate-pulse">
          Web Store
        </h1>
        {error && (
          <p className="text-red-400 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <input
            type="email"
            className="w-full px-4 py-2 rounded-xl bg-white/80 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-2 rounded-xl bg-white/80 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold hover:scale-105 transition-transform duration-300 shadow-md"
          >
            Sign In
          </button>
        </form>

        <div className="my-4 text-center text-white opacity-70">OR</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full py-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-transform duration-300 shadow-md"
        >
          <FaGoogle /> Sign In with Google
        </button>
      </div>
    </div>
  );
}
