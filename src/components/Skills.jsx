import React from 'react'
import { motion } from 'framer-motion'

const Skills = () => {
  const skills=[
    {name:"html",level:95,category:"frontened"},
    {name:"CSS",level:95,category:"frontened"},
    {name:"javascript",level:85,category:"frontened"},
    {name:"react",level:80,category:"frontened"},
    {name:"tailwindcss",level:85,category:"frontened"},
    {name:"firebase",level:90,category:"frontened"},
    {name:"github",level:80,category:"frontened"},
    {name:"vscode",level:90,category:"frontened"}
]   
const neoncolors=[
  "hsl(320 100% 30%",
  "hsl(40 100% 50%)",
  "hsl(160 100% 40%)",
  "hsl(230 100% 70%)"
]
  
  return (
    <div className=' h-screen w-sm md:w-full mx-auto flex flex-col items-center justify-center' id='skills'>
      <h1 className='text-2xl md:text-3xl text-primary-foreground font-bold'>My<span className='px-2 text-primary'>Skills</span></h1>
      <div className='grid grid-cols-3 md:grid-cols-4 pt-5 mx-10 gap-10'>
        {skills.map((skill,key)=>{
      const neon=neoncolors[key % neoncolors.length];
      return(
      <motion.div
      key={key}
      initial={{opacity:0,scale:0.6}}
      whileInView={{opacity:1,scale:1}}
      transition={{duration:0.6,delay:key*0.08}}
      viewport={{once:true}}
      className='w-24 md:w-32 h-24 md:h-32 border-2 flex flex-col items-center justify-center'
      style={{
        borderColor:neon,
        boxShadow:`5px 5px 10px 6px ${neon}`,
        background:"transparent"
      }}
      >
        <div className='text-2xl font-bold' style={{color:neon}}>{skill.level}%</div>
        <div className='text-sm mt-1 uppercase traking-wide text-foreground'>{skill.name}</div>

      </motion.div>  
      )
})}
      </div>
    </div>
  )
}

export default Skills
