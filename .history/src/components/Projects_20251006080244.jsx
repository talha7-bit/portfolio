import React, { useState, useEffect } from 'react'
import pic1 from '../assets/News.PNG'
import pic2 from '../assets/Food.PNG'
import pic3 from '../assets/weath.PNG'
import pic4 from '../assets/Todos.PNG'
import pic5 from '../assets/Ecomress.PNG'
import pic6 from '../assets/stream.PNG'
import pic7 from '../assets/hms.PNG'

import { motion } from 'framer-motion'

const projects = [
  {
  id: 6,
    title: "Hospital Manangement System",
    description: "A complete MERN Stack project build for manangement",
    img: pic7,
    href:"https://frontendhmsp.vercel.app/",
    tags: ["react","express","mongodb"]
  },
  {
    id: 7,
    title: "STREAM(chat app)",
    description: "A complete MERN Stack Stream project build for chatting",
    img: pic6,
    href:"https://streamfrontendp.vercel.app",
    tags: ["react","express","mongodb"]

  },
   {
    id: 5,
    title: "Ecomress Website",
    description: "A modern fully responsive ecomress UI build using React TailwindCSS and Firebase",
    img: pic5,
    href:"https://ecomress.vercel.app/",
    tags: ["html", "js", "react"]
  },
  {
    id: 4,
    title: "Todo App",
    description: "A full featured todo app with firebase authentication supporting add edit update delete tasks.",
    img: pic4,
    href:"https://todo-app-six-teal-95.vercel.app/login",
    tags: ["html", "js", "react"]
  },
  {
    id: 2,
    title: "Food Recipe",
    description: "Uses API to provide food dish details and also step-by-step recepie instructions.",
    img: pic2,
    href:"https://food-recepie-phi.vercel.app/",
    tags: ["html", "js", "react"]
  },
  {
    id: 3,
    title: "Weather app",
    description: "A weather app that uses API with search functionality and current location support.",
    img: pic3,
    href:"https://weather-app-brown-beta-76.vercel.app/",
    tags: ["html", "js", "react"]
  },
  {
    id: 1,
    title: "News Website",
    description: "Uses API to provide news relevant to each category such as country or sports, etc.",
    img: pic1,
    href:"https://news-website-nine-sigma.vercel.app/",
    tags: ["html", "js", "react"]
  },
  
]

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
const neoncolors=[
  "hsl(320 100% 30%",
  "hsl(40 100% 50%)",
  "hsl(160 100% 40%)",
  "hsl(230 100% 70%)"
]


  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMd = windowWidth >= 768
  const cardsPerView = isMd ? 2 : 1
  const maxIndex = projects.length - cardsPerView;

  const handleStyle = () => {
    const shift = isMd ? currentIndex * 50 : currentIndex * 100
    return {
      transform: `translateX(-${shift}%)`,
    }
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1))
  }

  return (
    <div className='scroll-mt-16 md:scroll-mt-20 mb-20 w-screen h-screen flex flex-col items-center justify-center' id='projects'>
      <h1 className='text-3xl font-bold text-primary-foreground '>Projects<span className='text-primary mx-2'>Featured</span></h1>
      <p className='mt-1 text-sm'>Below is the list of the projects I have made during my learning</p>
      <div className='relative w-full max-w-sm md:max-w-6xl h-[36rem] overflow-hidden mx-auto'>

        {/* Slide buttons */}
        <button
          onClick={prevSlide}
          className='absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black text-white px-3 py-1 rounded-full'
        >
          ❮
        </button>
        <button
          onClick={nextSlide}
          className='absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black text-white px-3 py-1 rounded-full'
        >
          ❯
        </button>

        {/* Slider container */}
        <div
         
          className='flex transition-transform duration-500 ease-in-out h-full '
          style={handleStyle()}
        >
          {projects.map((project, key) => (
            <motion.div
              key={key}
              initial={{opacity:0,scale:0.6}}
              whileInView={{opacity:1,scale:1}}
              transition={{duration:0.6,delay:key*0.08}}
              viewport={{once:true}}
              className='w-full md:w-1/2 flex flex-col justify-start flex-shrink-0 px-4 pt-4 pb-2'
              
            >
              <div className='w-full aspect-[16/9] overflow-hidden rounded-xl'>
                <img
                  src={project.img}
                  alt={project.title}
                  className='w-full h-full object-cover'
                />
               
              </div>

              <div className='flex gap-2 items-center justify-ceneter flex-wrap'>
                {project.tags.map(tag => (
                  <h3
                    key={tag}
                    className='px-3 py-1 mt-1 rounded-xl bg-primary text-primary-foreground'
                  >
                    {tag}
                  </h3>
                ))}
                
              </div>
               
              <div className='text-left w-full mt-15 md:mt-2'>
                <h1 className='text-2xl font-bold text-primary'>{project.title} <a href={project.href}><button className='bg-primary text-sm text-foreground mx-15 px-2 py- rounded hover:bg-blue-800 transition cursor-pointer mt-2'>Live</button></a></h1>
                <p className='text-sm text-foreground'>{project.description}</p>
              </div>
            </motion.div>
            
          ))}
        </div>
        
      </div>
      
    </div>
  )
}

export default Projects