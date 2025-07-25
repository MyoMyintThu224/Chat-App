import React from 'react';
// ✅ React ကို import လုပ်တယ်

import ReactDOM from 'react-dom/client';
// ✅ ReactDOM ရဲ့ modern version ကို import လုပ်တယ်

import App from './App';
// ✅ မိမိ app ရဲ့ main component ဖြစ်တဲ့ App.jsx ကို import လုပ်တယ်

import { BrowserRouter } from 'react-router-dom';
// ✅ Routing ကို အသုံးပြုဖို့ BrowserRouter ကို import လုပ်တယ်

import './index.css';
// ✅ Global style file ဖြစ်တဲ့ index.css ကို import လုပ်တယ် (Tailwind styles ပါဝင်)

import { AuthProvider } from './context/AuthContext';
// ✅ Firebase Authentication context ကို wrap ပေးဖို့ AuthProvider ကို import လုပ်တယ်

// ✅ React app ကို HTML ထဲမှာရှိတဲ့ root div ထဲ render လုပ်တယ်
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> 
    {/* ✅ Development mode မှာ error တွေကို catch လုပ်ဖို့ StrictMode ထည့်ထားတယ် */}
    
    <BrowserRouter> 
      {/* ✅ Routing ကိုအထဲမှာအသုံးပြုနိုင်ဖို့ BrowserRouter နဲ့ wrap လုပ်တယ် */}

      <AuthProvider>
        {/* ✅ Firebase Login state ကို App တစ်ခုလုံးမှာ အသုံးပြုနိုင်ဖို့ context ထဲ wrap */}
        <App />
      </AuthProvider>

    </BrowserRouter>
  </React.StrictMode>
);
