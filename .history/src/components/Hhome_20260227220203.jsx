import React, { useEffect, useRef } from 'react'
import * as THREE from "three"

const Hhome = () => {
  const ref = useRef();

  useEffect(() => {

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    scene.add(camera);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    ref.current.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();
    const texture = loader.load("/textf.PNG");

    const sgeo = new THREE.PlaneGeometry(10, 10, 140, 140);

    const smat = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: texture }
      },
      vertexShader: `
      varying vec2 vUv;
      varying vec3 vPosition;
      void main(){
      vPosition=position;
      vUv=uv;
      gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);
      gl_PointSize=3.0;
      }
      `,
      fragmentShader: `
      uniform sampler2D uTexture;
      varying vec2 vUv;
      varying vec3 vPosition;
      void main(){
      gl_FragColor=texture2D(uTexture,vUv);
      }
      `
    })

    const mesh = new THREE.Points(sgeo, smat);
    scene.add(mesh);

    const _oposition = sgeo.attributes.position.array.slice();

    function disturb() {
      const _position = sgeo.attributes.position;
      for (let i = 0; i < _position.array.length / 3; i++) {
        _position.array[i * 3] += Math.random() * 10;
        _position.array[i * 3 + 1] += Math.random() * 5;
        _position.array[i * 3 + 2] += Math.random() * 12;
      }
      _position.needsUpdate = true;
    }

    disturb();

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }

    animate();

    
  }, []);

  return (
    <div ref={ref} className="w-screen h-screen overflow-hidden"></div>
  )
}

export default Hhome