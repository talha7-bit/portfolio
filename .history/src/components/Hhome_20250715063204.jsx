import { ArrowDownIcon, ArrowDownWideNarrowIcon, ScrollIcon } from 'lucide-react'
import React from 'react'

const Hhome = () => {
  return (
    <section className='top-0 left-0 max-w-sm md:w-screen mx-auto h-screen mb-16 z-10 relative flex flex-col items-center justify-center space-y-2' id='home'>
    <div className='w-screen h-screen flex flex-col items-center justify-center space-y-2'>
   <div className='opacity-0 animate-fade-in text-3xl font-bold'> <h1 >Hlo! I`m <span className='text-primary'>Talha</span></h1>
    </div>
    <div className='opacity-0 text-2xl md:text-4xl animate-fade-in-delay-1 font-bold'><h2>React Developer</h2></div>
   <div className='opacity-0 text-sm md:text-lg animate-fade-in-delay-3 max-w-sm md:w-screen'><p>Crafting modern fast and user focused apps with React, Firebase and Tailwind CSS</p></div>
    <div className='opacity-0 bg-primary mt-1 text-primary-foreground px-3 py-1 rounded md:text-lg animate-fade-in-delay-4'>
      <a href='#projects'>View My Projects</a></div>
    </div>
   <div className='flex flex-col items-center justify-center animate-bounce mb-10 mx-auto'>
      <h3>Scroll Down</h3>
      <ArrowDownIcon className=''/></div>

    
    </section>
  )
}

export default Hhome
