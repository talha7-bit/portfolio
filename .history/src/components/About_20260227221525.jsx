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
  <div ref={tref} className="relative min-h-screen overflow-hidden px-4 sm:px-6 md:px-12 lg:px-24">

    <div ref={ref} className="absolute inset-0"></div>

    <h1 className="absolute top-12 sm:top-16 md:top-20 left-4 sm:left-8 md:left-16 lg:left-24 
                   z-10 bg-transparent 
                   text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
                   font-bold text-white">
      About <span className="text-pink-400">Me</span>
    </h1>

    <div
      ref={bref}
      className="
        absolute
        top-32 sm:top-40 md:top-56 lg:top-72
        left-4 sm:left-8 md:left-16 lg:left-24
        flex flex-col lg:flex-row
        gap-6
        border-t-2 border-gray-300
        pt-6
        w-[92%] sm:w-[85%] md:w-[80%] lg:w-[85%] xl:w-[75%] 2xl:w-[65%]
        scale-x-0 origin-center
      "
    >
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl 
                     font-bold text-gray-300 
                     lg:w-100">
        I'm a MERN Stack Developer
      </h1>

      <h4 className="
        text-sm sm:text-base md:text-lg lg:text-xl 
        text-gray-300 
        leading-relaxed
        w-full lg:w-auto
        max-w-none
      ">
        I'm a passionate and self-motivated web developer with a strong focus on building fast, interactive, and user-friendly applications using modern technologies including{" "}
        <span className="text-pink-400">
          React Node Express Mongodb Firebase Tailwindcss Gsap <span className="text-gray-300">&</span> Three J's
        </span>
      </h4>
    </div>

  </div>
)
}

export default File2