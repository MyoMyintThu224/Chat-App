// import React, { useEffect, useState } from 'react';

// const DarkMode = () => {
//   const [isDark, setIsDark] = useState(
//     localStorage.getItem('theme') === 'dark'
//   );

//   useEffect(() => {
//     if (isDark) {
//       document.documentElement.classList.add('dark');
//       localStorage.setItem('theme', 'dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//       localStorage.setItem('theme', 'light');
//     }
//   }, [isDark]);

//   const toggleDarkMode = () => {
//     setIsDark(prev => !prev);
//   };

//   return (
//     <div className="flex items-center space-x-2 text-gray-700 dark:text-white">
//       <label className="relative inline-block w-12 h-6 cursor-pointer">
//         <input
//           type="checkbox"
//           checked={isDark}
//           onChange={toggleDarkMode}
//           className="sr-only"
//         />
//         <span className="absolute inset-0 bg-gray-300 rounded-full transition dark:bg-gray-600"></span>
//         <span
//           className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition ${
//             isDark ? 'translate-x-6' : ''
//           }`}
//         ></span>
//       </label>
//     </div>
//   );
// };

// export default DarkMode;

import React, { useEffect, useState } from 'react'; 
// React ကနေ useEffect, useState တို့ကို import လုပ်တယ်။ ဒီနှစ်ခုက React Hook တွေဖြစ်ပြီး၊
// state တင်ဖို့နဲ့ lifecycle လုပ်ဆောင်ချက်တွေအတွက်သုံးတယ်။

const DarkMode = () => {
  // localStorage ထဲမှာ theme က 'dark' ဆိုရင် true ဖြစ်တယ်။
  // default state ကို isDark ဆိုတဲ့ variable ထဲထည့်ထားတယ်။
  const [isDark, setIsDark] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    // isDark value ပြောင်းတိုင်း run ဖြစ်မယ်။
    if (isDark) {
      // dark mode ဆိုရင် HTML root element (document.documentElement) မှာ 'dark' class ထည့်တယ်။
      document.documentElement.classList.add('dark');
      // localStorage ထဲမှာ theme ကို 'dark' လို့သိမ်းတယ်။
      localStorage.setItem('theme', 'dark');
    } else {
      // light mode ဖြစ်ရင် 'dark' class ကို ဖယ်တယ်။
      document.documentElement.classList.remove('dark');
      // theme ကို 'light' လို့သိမ်းတယ်။
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]); // isDark state ပြောင်းတာနဲ့ useEffect ပြန် run ဖြစ်မယ်။

  const toggleDarkMode = () => {
    // isDark state ကို ပြောင်းပေးမယ်။ (true => false or false => true)
    setIsDark(prev => !prev);
  };

  return (
    // UI layout: flex row ဖြစ်ပြီး သွယ်ဝိုက်ထားတယ်။
    <div className="flex items-center space-x-2 text-gray-700 dark:text-white">
      {/* Switch UI component */}
      <label className="relative inline-block w-12 h-6 cursor-pointer">
        <input
          type="checkbox" // checkbox ဖြစ်တယ်။
          checked={isDark} // isDark state နဲ့ အညီ checked ဖြစ်/မဖြစ် ပြတယ်။
          onChange={toggleDarkMode} // toggleDarkMode function ကို run လုပ်တယ်။
          className="sr-only" // screen reader only (UI မှာမမြင်ရ)
        />
        {/* အပြင်ဖျော့ background bar */}
        <span className="absolute inset-0 bg-gray-300 rounded-full transition dark:bg-gray-600"></span>
        {/* အပြောင်းဖျော့ရောင် circle */}
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition ${
            isDark ? 'translate-x-6' : '' // dark mode ဆိုရင် right ထဲကိုရွှေ့မယ်။
          }`}
        ></span>
      </label>
    </div>
  );
};

export default DarkMode; // DarkMode component ကို export လုပ်ပေးတယ်။
