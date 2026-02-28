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
          end:"top -10%",
          markers:true,
          scrub:true
        }
    })
  },[])
  return (
    <div ref={tref} className='relative h-[100vh] bg-black overflow-hidden'>
      <div ref={ref} className='absolute top-0 left-0'></div>
    <div className=''>
    <h1 className='absolute top-20 z-10 left-140 bg-transparent text-6xl font-bold text-white'>About <span className='text-pink-400'>Me</span></h1>  
    <div ref={bref} className={`absolute top-80 left-30 flex gap-4 border-t-2 border-gray-300 h-100 px-10 p-8 w-300 scale-x-0 origin-center`}>
    <h1 className='text-5xl font-bold text-gray-300 w-160'>I'm a MERN Stack Developer</h1>
    <h4 className='text-gray-300 w-220'>I'm a passionate and self-motivated web developer with a strong focus on building fast, interactive, and user-friendly applications using modern technologies including <span className='text-pink-400'>React Node Express Mongodb Firebase Tailwindcss Gsap <span className='text-gray-300'>&</span> Three J's</span></h4>
    </div>
    </div>      
    </div>
  )
}

export default File2