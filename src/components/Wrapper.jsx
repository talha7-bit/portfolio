import React from 'react';
import Themetoggle from './Themetoggle';
import Navbar from './Navbar';
import Background from './Background';

import Hhome from './Hhome';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Contacts from './Contacts';

const Wrapper = () => {
  return (
    <div className='relative min-h-screen bg-background text-foreground overflow-x-hidden'>
      <Background />
      <Themetoggle />
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