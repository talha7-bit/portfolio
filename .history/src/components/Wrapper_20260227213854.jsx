import React from 'react';
import Themetoggle from './Themetoggle';
import Navbar from './Navbar';
import Background from './Background';

import Hhome from './Hhome';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Contacts from './Contacts';
import Stars from './Stars';

const Wrapper = () => {
  return (
    <div className='relative min-h-screen bg-background text-foreground overflow-x-hidden'>
      <div className='fixed top-0 left-0'>
        <Stars/>
      </div>
      <div className='relative z-10'>
        
        <Navbar />
        <main>
          <Hhome />
          <About />
          <Skills />
          <Projects />
          <Contacts />
        </main>
      </div>
    </div>
  );
};

export default Wrapper;