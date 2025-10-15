// src/components/DarkModeToggle.js
import React, { useEffect } from 'react';
import { useDarkMode } from 'usehooks-ts';
import './DarkModeToggle.css';

const DarkModeToggle = () => {
  const { isDarkMode, toggle, enable, disable } = useDarkMode();

  // This is the CRUCIAL part that was missing.
  // It runs every time 'isDarkMode' changes and updates the body class.
  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);

  return (
    <div className="dark-mode-toggle">
      <button type="button" onClick={disable}>
        ☀
      </button>
      <span className="toggle-track" onClick={toggle}>
        <span className="toggle-thumb"></span>
      </span>
      <button type="button" onClick={enable}>
        ☾
      </button>
    </div>
  );
};

export default DarkModeToggle;