import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Hhome = () => {
  const ref = useRef();

  useEffect(() => {
    const container = ref.current;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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
        void main(){
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
          gl_PointSize = 3.0;
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        varying vec2 vUv;
        void main(){
          gl_FragColor = texture2D(uTexture,vUv);
        }
      `,
      transparent: true
    });

    const mesh = new THREE.Points(sgeo, smat);
    scene.add(mesh);

    const originalPositions = sgeo.attributes.position.array.slice();

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    window.addEventListener("mousemove", onMouseMove);

    const onResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", onResize);

    const animate = () => {
      requestAnimationFrame(animate);

      raycaster.setFromCamera(mouse, camera);
      const intersect = raycaster.intersectObject(mesh);
      const positions = sgeo.attributes.position.array;

      if (intersect.length > 0) {
        const point = intersect[0].point;

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
      }

      for (let i = 0; i < positions.length / 3; i++) {
        positions[i * 3] += (originalPositions[i * 3] - positions[i * 3]) * 0.1;
        positions[i * 3 + 1] +=
          (originalPositions[i * 3 + 1] - positions[i * 3 + 1]) * 0.1;
        positions[i * 3 + 2] +=
          (originalPositions[i * 3 + 2] - positions[i * 3 + 2]) * 0.1;
      }

      sgeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="w-screen h-screen overflow-hidden"
    />
  );
};

export default Hhome;