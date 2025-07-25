import React, { useState } from 'react'; 
// React component ဖန်တီးဖို့နဲ့ state ထိန်းဖို့ useState ကို import လုပ်တယ်

import { useNavigate } from 'react-router-dom';
// page redirect လုပ်ဖို့ navigation hook ကို import

import { auth, provider } from '../lib/firebase';
// Firebase auth instance နဲ့ Google auth provider ကို import

import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
// Firebase မှာ Login လုပ်ဖို့ method နှစ်ခုကို import

import reactLogo from '../assets/logo512.png'; 
// Background image အနေနဲ့ React logo ကို import

import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa"; 
// Password ချင်/ဖျောက် icon များနဲ့ Google icon ကို import

export default function Login({ onLogin }) {
  const [email, setEmail] = useState(''); // email field state
  const [password, setPassword] = useState(''); // password field state
  const [error, setError] = useState(''); // login error message တွေကို သိမ်းဖို့
  const [showPassword, setShowPassword] = useState(false); // password ကို ဖျောက်/ဖော် toggle
  const navigate = useNavigate(); // login အပြီးမှာ route ပြောင်းဖို့

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider); // Google popup ဖြင့် login
      onLogin(); // login အောင်မြင်သွားရင် localStorage ထဲ isLoggedIn ထည့်မယ်
      navigate('/chat'); // chat page သို့ပြောင်း
    } catch (err) {
      setError("Google login failed"); // Google login မအောင်မြင်ရင် error ပြမယ်
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault(); // form ကို reload မဖြစ်စေဖို့ prevent
    try {
      await signInWithEmailAndPassword(auth, email, password); // Firebase မှာ email + password ဖြင့် login
      onLogin(); // login ဖြစ်သွားရင် isLoggedIn = true
      navigate('/chat'); // chat page ကို ပြောင်းမယ်
    } catch (err) {
      setError("Email login failed. Check your email or password."); // login မအောင်မြင်ရင် error ပြမယ်
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${reactLogo})` }}
    >
      {/* ✅ Full screen background image */}

      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
      {/* ✅ နောက်ခံအနက်ဖျော့ဖျော့ filter layer */}

      <div className="relative z-10 bg-white/20 p-10 rounded-2xl shadow-2xl w-full max-w-md backdrop-blur-md border border-white border-opacity-30">
        {/* ✅ Glass effect login box */}

        <h1 className="text-5xl font-extrabold text-center text-white drop-shadow mb-4 animate-pulse">
          Web Store
        </h1>

        {error && (
          <p className="text-red-400 text-sm text-center mb-4">{error}</p>
        )}
        {/* ✅ Login error message (ဖြစ်ရင်သာပြမယ်) */}

        <form onSubmit={handleEmailLogin} className="space-y-4">
          {/* ✅ Email login form */}

          <input
            type="email"
            className="w-full px-4 py-2 rounded-xl bg-white/80 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // email တန်ဖိုးကို update
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"} // ✅ password ဖျောက်/ဖော်
              className="w-full px-4 py-2 rounded-xl bg-white/80 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // password တန်ဖိုး update
              required
            />
            <div
              onClick={() => setShowPassword(!showPassword)} // icon ကိုနှိပ်ပြီး password toggle
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />} 
              {/* password ဖျောက်/ဖော် icon ပြ */}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold hover:scale-105 transition-transform duration-300 shadow-md"
          >
            Sign In
          </button>
          {/* ✅ Email login button */}
        </form>

        <div className="my-4 text-center text-white opacity-70">OR</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full py-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-transform duration-300 shadow-md"
        >
          <FaGoogle /> Sign In with Google
        </button>
        {/* ✅ Google login button */}
      </div>
    </div>
  );
}
