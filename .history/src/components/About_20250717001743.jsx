import { Bug, Code, Code2Icon, CodeSquare, CodeXml, Palette } from 'lucide-react'
import React from 'react'

const About = () => {
  return (
    <section id='about' className='scroll-mt-16 md:scroll-mt-20 mx-auto w-sm md:w-full h-screen px-5 pl-3'>
        <h1 className='text-4xl font-bold mt-5'>About <span className='text-primary'>Me</span></h1>
    <div className='grid grid-cols-1 md:grid-cols-2 mt-2 md:mt-10 md:mt-25'>
        <div className='px-3'>
          <h1 className='text-2xl md:3xl font-bold '>Frontened Developer</h1>  
          <p className='text-left text-sm md:text-lg'>I'm a passionate and self-motivated web developer with a strong focus on building fast, interactive, and user-friendly applications using modern technologies.</p>
          <p className='mt-3 text-left text-sm md:text-lg'>I believe in writing clean, reusable code and designing interfaces that not only look good but feel right. Whether it's a dynamic dashboard, a responsive landing page, or a full-featured app, I enjoy the process of turning ideas into working products.</p>
        <div className='mt-5'>
            <a href='#contact' className='px-3 py-2 bg-primary rounded-full text-primary-foreground text-lg mt-3'>Get In Conatact</a>
            
        </div>
        </div>
    <div className='flex flex-row gap-2 mt-5 items-center justify-center'>
    <div className='w-30 md:w-40 h-30 md:h-35 border bg-gradient-to-r from-blue-500 to-indigo-900 rounded-xl mt-2 flex flex-col items-center justify-center'>
        <Code className='w-6 h-6 text-primary-foreground'/>
        <h2>Web Development</h2>
    </div>
    <div className='w-30 md:w-40 h-30 md:h-35 border bg-gradient-to-r from-purple-400 to-pink-600 rounded-xl mt-2 flex flex-col items-center justify-center'>
        <Bug className='w-6 h-6 text-primary-foreground'/>
        <h2>Solve Bug</h2>
    </div>
    <div className='w-30 md:w-40 h-30 md:h-35 border bg-gradient-to-r from-green-600 to-green-900 rounded-xl mt-2 flex flex-col items-center justify-center'>
        <Palette className='w-6 h-6 text-primary-foreground'/>
        <h2>UI Design</h2>
    </div>
    </div>
    </div>
    </section>
  )
}

export default About
