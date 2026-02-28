import React, { useEffect, useRef } from 'react'
import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import Geometries from 'three/src/renderers/common/Geometries.js';

const Hhome = () => {
  const ref = useRef();

  useEffect(() => {

    const container = ref.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    scene.add(camera);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

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
        vec4 color=texture2D(uTexture,vUv);
        gl_FragColor=color;
        if(color.r<1.0){
        discard;
        }
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
      for (let i = 0; i < _position.array.length / 3; i++) {
        _position.array[i * 3] += (_oposition[i * 3] - _position.array[i * 3]) * 0.1;
        _position.array[i * 3 + 1] += (_oposition[i * 3 + 1] - _position.array[i * 3 + 1]) * 0.2;
        _position.array[i * 3 + 2] += (_oposition[i * 3 + 2] - _position.array[i * 3 + 2]) * 0.1;
      }
      _position.needsUpdate = true;
    }

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function handleMouseMove(e) {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    }

    window.addEventListener("mousemove", handleMouseMove);

    scene.add(new THREE.AmbientLight(0xffffff, 10));
    const opsitions = sgeo.attributes.position.array.slice();
    disturb();

    function handleResize() {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }

    window.addEventListener("resize", handleResize);

    let animationId;

    function animate() {
      mesh.scale.z = 0.1;
      animationId = requestAnimationFrame(animate);
      renderer.render(scene, camera);

      raycaster.setFromCamera(mouse, camera);
      const intersect = raycaster.intersectObject(mesh);
      const position = sgeo.attributes.position;

      if (intersect.length > 0) {
        const point = intersect[0].point;
        const positions = position.array;

        for (let i = 0; i < positions.length / 3; i++) {
          const dx = positions[i * 3] - point.x;
          const dy = positions[i * 3 + 1] - point.y;
          const dz = positions[i * 3 + 2] - point.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < 0.5) {
            positions[i * 3] += 0.4;
            positions[i * 3 + 1] += 0.4;
            positions[i * 3 + 2] += 0.8;
          }
        }

        for (let i = 0; i < positions.length / 3; i++) {
          positions[i * 3] += (opsitions[i * 3] - positions[i * 3]) * 0.5;
          positions[i * 3 + 1] += (opsitions[i * 3 + 1] - positions[i * 3 + 1]) * 0.5;
          positions[i * 3 + 2] += (opsitions[i * 3 + 2] - positions[i * 3 + 2]) * 0.2;
        }

        position.needsUpdate = true;
      }
    }

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      renderer.dispose();
      if (container && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    }

  }, []);

  return (
    <div id='home' ref={ref} className='w-full h-screen overflow-hidden'></div>
  )
}

export default Hhome