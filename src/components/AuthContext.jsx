// React မှာ context တစ်ခုဖန်တီးဖို့ createContext ကိုသုံးတယ်
// useContext ကို context ကို access ဖို့သုံးတယ်
// useEffect, useState ကတော့ React hook တွေဖြစ်တယ်
import React, { createContext, useContext, useEffect, useState } from "react";

// Firebase auth function ၃ ခု import လုပ်တယ်
import { onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";

// Firebase project ထဲက authentication object ကို import လုပ်တယ်
import { auth } from "../lib/firebase";

// AuthContext ဆိုတဲ့ context object ကိုဖန်တီးတယ်
const AuthContext = createContext();

// AuthProvider ဆိုတာက Context Provider Component တစ်ခုဖြစ်တယ်
export const AuthProvider = ({ children }) => {
  // user state ကို null နဲ့စတင်တယ်
  const [user, setUser] = useState(null);

  // Login/logout ဖြစ်တာတွေကို စောင့်ကြည့်ဖို့ useEffect သုံးတယ်
  useEffect(() => {
    // onAuthStateChanged ဟာ login/logout ဖြစ်တဲ့အချိန်마다 ပြောင်းလဲတဲ့ user ကိုရတယ်
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // user ကို set လုပ်တယ်
    });

    // cleanup function — component ထွက်တဲ့အခါ unsubscribe ပြန်ခေါ်တယ်
    return () => unsubscribe();
  }, []);

  // login function ကိုဖန်တီးတယ်
  const login = async (email, password) => {
    // firebase auth method ကိုသုံးပြီး login လုပ်တယ်
    return signInWithEmailAndPassword(auth, email, password);
  };

  // logout function ကိုဖန်တီးတယ်
  const logout = async () => {
    // firebase signOut method ကိုသုံးတယ်
    await signOut(auth);
  };

  // Context Provider မှာ user, login, logout function တွေကို value အနေနဲ့ pass လုပ်တယ်
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children} {/* children ဆိုတာက Context Provider ထဲက nested component တွေ */}
    </AuthContext.Provider>
  );
};

// Context ကို access ဖို့အတွက် custom hook တစ်ခုဖန်တီးတယ်
export const useAuth = () => useContext(AuthContext);
