 
import React, { useState, useEffect } from 'react';

function Navbar() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="fixed top-2 right-2 z-50">
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="bg-gray-700 text-white px-3 py-1 rounded shadow"
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </div>
  );
}

export default Navbar;
