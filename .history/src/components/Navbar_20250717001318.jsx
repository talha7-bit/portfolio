import { Delete, Menu } from 'lucide-react';
import React, { useState } from 'react';

const Navbar = () => {
  const [show, setshow] = useState(false);

  return (
    <div className='w-full top-0 left-0 fixed z-50'>
      <div className='flex items-center justify-between mx-5 py-3'>
        <h1 className='text-foreground font-bold text-xl'>
          Personal <span className='text-primary'>Portfolio</span>
        </h1>

        {/* Desktop Menu */}
        <nav className='font-semibold hidden md:block mr-10'>
          <a className='mx-2' href='#home'>Home</a>
          <a className='mx-2' href='#about'>About</a>
          <a className='mx-2' href='#skills'>Skills</a>
          <a className='mx-2' href='#projects'>Projects</a>
          <a className='mx-2' href='#contact'>Contact</a>
        </nav>

        
        <div onClick={() => setshow(true)} className='md:hidden cursor-pointer'>
          <Menu className='w-6 h-6 text-foreground' />
        </div>
      </div>

      
      <div className={`md:hidden fixed top-0 left-0 w-screen h-screen transition-all duration-300 bg-background text-foreground z-40 ${show ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        
        <div className='flex justify-end mt-3 mr-8'>
          <button className='h-8 w-8 cursor-pointer' onClick={() => setshow(false)}>❌</button>
        </div>

      
        <nav className='flex flex-col items-center mt-10 space-y-5 text-lg font-semibold'>
          <a onClick={() => setshow(false)} href='#home'>Home</a>
          <a onClick={() => setshow(false)} href='#about'>About</a>
          <a onClick={() => setshow(false)} href='#skills'>Skills</a>
          <a onClick={() => setshow(false)} href='#projects'>Projects</a>
          <a onClick={() => setshow(false)} href='#contact'>Contact</a>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;