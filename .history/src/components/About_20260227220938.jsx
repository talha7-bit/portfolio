import React, { useEffect, useRef, useState } from 'react'
import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const File2 = () => {
  const[animate,setanimate]=useState(false);
  const ref=useRef();
  const bref=useRef();
  const tref=useRef();

  useEffect(()=>{
    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
    scene.add(camera);
    camera.position.z=5;

    const renderer=new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000,0);
    ref.current.appendChild(renderer.domElement);

    const geometry=new THREE.TorusGeometry(1.5,0.5,36,106);
    const material=new THREE.PointsMaterial({color:new THREE.Color(0.1,0.1,0.1),size:0.03});
    const mesh=new THREE.Points(geometry,material);
    scene.add(mesh);

    //const controls=new OrbitControls(camera,renderer.domElement);
    function animate(){
      requestAnimationFrame(animate);
      renderer.render(scene,camera);
      mesh.rotation.y+=0.01;
      //controls.update();
    }
    animate();
  },[])

   useEffect(()=>{
    if(bref.current==null) return;
     const tl=gsap.timeline();
    tl.to(bref.current,{
        scaleX:1,
        duration:2.5,
        ease:"power3.out",
        scrollTrigger:{
          trigger:tref.current,
          start:"top 20%",
          end:"top 1%",
          scrub:true
        }
    })
  },[])
 return (
  <div ref={tref} className='relative h-screen overflow-hidden'>
    
    <div ref={ref} className='absolute inset-0'></div>

    <h1 className='absolute top-16 md:top-20 left-6 md:left-32 z-10 bg-transparent text-3xl sm:text-4xl md:text-6xl font-bold text-white'>
      About <span className='text-pink-400'>Me</span>
    </h1>  

    <div
      ref={bref}
      className='
      absolute 
      top-40 sm:top-52 md:top-80
      left-6 md:left-20
      flex flex-col md:flex-row gap-4
      border-t-2 border-gray-300
      px-6 md:px-10 py-6 md:p-8
      w-[90%] md:w-[75%]
      scale-x-0 origin-center
      '
    >
      <h1 className='text-2xl sm:text-3xl md:text-5xl font-bold text-gray-300 md:w-1/2'>
        I'm a MERN Stack Developer
      </h1>

      <h4 className='text-sm sm:text-base md:text-lg text-gray-300 md:w-1/2'>
        I'm a passionate and self-motivated web developer with a strong focus on building fast, interactive, and user-friendly applications using modern technologies including{" "}
        <span className='text-pink-400'>
          React Node Express Mongodb Firebase Tailwindcss Gsap <span className='text-gray-300'>&</span> Three J's
        </span>
      </h4>
    </div>

  </div>
)
}

export default File2