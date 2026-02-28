import React, { useEffect, useRef } from 'react'
import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import Geometries from 'three/src/renderers/common/Geometries.js';

const Hhome = () => {
  const ref=useRef();

  useEffect(()=>{
    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
    scene.add(camera);
    camera.position.z=5;

    const renderer=new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(new THREE.Color("#21282a"),1);
    ref.current.appendChild(renderer.domElement);

    const loader=new THREE.TextureLoader();
    const texture=loader.load("/textf.PNG");
    const sgeo=new THREE.PlaneGeometry(10,10,140,140);
    const smat=new THREE.ShaderMaterial({
      uniforms:{
        uTexture:{value:texture}
      },
      vertexShader:`
      varying vec2 vUv;
      varying vec3 vPosition;
      void main(){
      vPosition=position;
      vUv=uv;
      gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);
      gl_PointSize=3.0;
      }
      `,
      fragmentShader:`
      uniform sampler2D uTexture;
      varying vec2 vUv;
      varying vec3 vPosition;
      void main(){
      gl_FragColor=texture2D(uTexture,vUv);
      }
      `
    })
    const mesh=new THREE.Points(sgeo,smat);
    scene.add(mesh);
    
    const _oposition=sgeo.attributes.position.array.slice();
    function disturb(){
      const _position=sgeo.attributes.position;
            for(let i=0;i<_position.array.length;i++){
              _position.array[i*3]+=Math.random()*10;
                _position.array[i*3+1]+=Math.random()*5;
                _position.array[i*3+2]+=Math.random()*12;
            }
            for(let i=0;i<_position.array.length;i++){
                _position.array[i*3]+=(_oposition[i*3]-_position.array[i*3])*0.1;
                _position.array[i*3+1]+=(_oposition[i*3+1]-_position.array[i*3+1])*0.2;
                _position.array[i*3+2]+=(_oposition[i*3+2]-_position.array[i*3+2])*0.1;
            }
            _position.needsUpdate=true;
        }
        
        const raycaster=new THREE.Raycaster();
        const mouse=new THREE.Vector2();
        
        window.addEventListener("mousemove",(e)=>{
          mouse.x=(e.clientX/window.innerWidth)*2-1;
          mouse.y=-(e.clientY/window.innerHeight)*2+1;
        })
        
        //raycaster.params.Points.threshold=0.3;
        scene.add(new THREE.AmbientLight(0xffffff,10));
        const opsitions=sgeo.attributes.position.array.slice();
        disturb();
        function animate(){
        mesh.scale.z=0.1;
      requestAnimationFrame(animate);
      renderer.render(scene,camera);
      raycaster.setFromCamera(mouse,camera);
      const intersect=raycaster.intersectObject(mesh);
      const position=sgeo.attributes.position;
      if(intersect.length>0){
        const point=intersect[0].point;
        const positions=position.array;
      for(let i=0;i<positions.length/3;i++){
        const dx=positions[i*3]-point.x;
        const dy=positions[i*3+1]-point.y;
        const dz=positions[i*3+2]-point.z;
        const dist=Math.sqrt(dx*dx+dy*dy+dz*dz);
        if(dist<0.5){
          positions[i*3]+=0.4;
          positions[i*3+1]+=0.4;
          positions[i*3+2]+=0.8;
        }
      }
      for(let i=0;i<positions.length/3;i++){
        positions[i*3]+=(opsitions[i*3]-positions[i*3])*0.5;
        positions[i*3+1]+=(opsitions[i*3+1]-positions[i*3+1])*0.5;
        positions[i*3+2]+=(opsitions[i*3+2]-positions[i*3+2])*0.2;
      }
      position.needsUpdate=true;
      }
      
    }
    animate();
  })
  return (
    <div ref={ref} className='w-[100vw] h-[100vh] overflow-hidden'>
      
    </div>
  )
}

export default Hhome