import { Moon, Sun } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const Themetoggle = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
      setDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setDark(false);
    }
  }, []);

  const toggle = () => {
    if (dark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setDark(true);
    }
  };

  return (
    <div className='hidden md:flex absolute top-0 right-4 z-50'>
      <button onClick={toggle}
      className='cursor-pointer p-2 rounded-full bg-background shadow-md'
      >
        {dark ? (
          <Sun className='h-6 w-6 text-yellow-300' />
        ) : (
          <Moon className='h-6 w-6 text-blue-900' />
        )}
      </button>
    </div>
  );
};

export default Themetoggle;