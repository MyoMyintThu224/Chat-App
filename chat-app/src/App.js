// import React from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./components/Login";
// import ChatBox from "./components/ChatBox"; // ✅ your actual ChatBox
// import MainLayout from "./components/MainLayout";
// import { AuthProvider } from "./components/AuthContext";
// import './index.css';

// // ✅ PrivateRoute Wrapper
// const PrivateRoute = ({ children }) => {
//   const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
//   return isLoggedIn ? children : <Navigate to="/login" />;
// };

// export default function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
// <Routes>
//   <Route
//     path="/login"
//     element={<Login onLogin={() => localStorage.setItem("isLoggedIn", "true")} />}
//   />
//   <Route
//     path="/chat"
//     element={
//       <PrivateRoute>
//         <MainLayout onLogout={() => localStorage.removeItem("isLoggedIn")} />
//       </PrivateRoute>
//     }
//   >
//     <Route index element={<ChatBox />} />
//   </Route>

//   {/* fallback */}
//   <Route path="*" element={<Navigate to="/login" />} />
// </Routes>

//       </BrowserRouter>
//     </AuthProvider>
//   );
// }
import React from "react";
// React ကို import လုပ်ပါတယ်

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// React Router မှာအသုံးပြုတဲ့ components များကို import – SPA Routing အတွက်

import Login from "./components/Login";
// Login component ကို import

import ChatBox from "./components/ChatBox"; // ✅ your actual ChatBox
// ChatBox (Messenger style chat UI) ကို import

import MainLayout from "./components/MainLayout";
// Sidebar နဲ့ layout design ကို control လုပ်တဲ့ component

import { AuthProvider } from "./components/AuthContext";
// AuthContext Provider – auth state မျှဝေဖို့အသုံးပြု

import './index.css';
// Tailwind CSS သို့မဟုတ် global CSS ကို import

// ✅ PrivateRoute Wrapper
const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  // localStorage မှာ login flag ရှိ/မရှိ စစ်တယ်
  return isLoggedIn ? children : <Navigate to="/login" />;
  // logged-in ဖြစ်ရင် children UI ပြမယ်၊ မဟုတ်ရင် /login သို့ redirect
};

export default function App() {
  return (
    <AuthProvider>
      {/* AuthContext Provider တစ်ခုနဲ့ app ကို wrap လုပ်ထားတယ် */}
      <BrowserRouter>
        {/* SPA router wrapper */}
        <Routes>
          <Route
            path="/login"
            element={
              <Login onLogin={() => localStorage.setItem("isLoggedIn", "true")} />
            }
            // login page – login ပြီးရင် isLoggedIn ကို true ထားပေးတယ်
          />
          <Route
            path="/chat"
            element={
              <PrivateRoute>
                <MainLayout onLogout={() => localStorage.removeItem("isLoggedIn")} />
              </PrivateRoute>
            }
            // Chat route မှာ PrivateRoute နဲ့ wrapped – login မလုပ်ရင် access မရ
            // MainLayout ထဲမှာ sidebar + nested route ရှိတယ်
          >
            <Route index element={<ChatBox />} />
            {/* /chat ထဲက index route — ChatBox component ပြမယ် */}
          </Route>

          {/* fallback route */}
          <Route path="*" element={<Navigate to="/login" />} />
           {/* မတူညီတဲ့ route ဖြစ်ရင် login page သို့ redirect */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
