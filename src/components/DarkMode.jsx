import React, { useEffect, useState } from 'react';

const DarkMode = () => {
  const [isDark, setIsDark] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark(prev => !prev);
  };

  return (
    <div className="flex items-center space-x-2 text-gray-700 dark:text-white">
      <label className="relative inline-block w-12 h-6 cursor-pointer">
        <input
          type="checkbox"
          checked={isDark}
          onChange={toggleDarkMode}
          className="sr-only"
        />
        <span className="absolute inset-0 bg-gray-300 rounded-full transition dark:bg-gray-600"></span>
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition ${
            isDark ? 'translate-x-6' : ''
          }`}
        ></span>
      </label>
    </div>
  );
};

export default DarkMode;
