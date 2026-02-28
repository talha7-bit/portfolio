import React, { useEffect, useRef } from 'react'
import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const Stars = () => {
  const ref=useRef();

  useEffect(()=>{
    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
    scene.add(camera);
    camera.position.z=10;

    const renderer=new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    ref.current.appendChild(renderer.domElement);

    const loader=new THREE.TextureLoader();
    const texture=loader.load("/dot.png")
    const _particles=[];
    function createparticles(){
   for(let i=0;i<10000;i++){
    _particles.push(
      Math.random()*45-12,
      Math.random()*45-12,
      Math.random()*45-20,
     )
    }
  }
  createparticles();
    const geometry=new THREE.BufferGeometry();
    geometry.setAttribute("position",new THREE.Float32BufferAttribute(_particles,3));
    const material=new THREE.PointsMaterial({color:"white",size:0.03,map:texture,transparent:true});
    const points=new THREE.Points(geometry,material);
    scene.add(points);

    let mousex=0;
    let mousey=0;
    window.addEventListener("mousemove",animateparticles);
    function animateparticles(event){
    mousey=event.clientY;
    mousex=event.clientX;
    }
    const controls=new OrbitControls(camera,renderer.domElement);
    function animate(){
      requestAnimationFrame(animate);
      renderer.render(scene,camera);
      controls.update();

       points.rotation.y+=0.001;
       if(mousex>0){
         points.rotation.y=mousex*0.05;
        points.rotation.x=-mousey*0.05;
       }
    }
    animate();
  })
  return (
    <div ref={ref}>
      
    </div>
  )
}

export default Stars