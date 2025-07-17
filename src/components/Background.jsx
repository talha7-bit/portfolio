import React, { useEffect, useState } from 'react';

const Background = () => {
  const [stars, setstars] = useState([]);

  const generate = () => {
    const starcount = Math.floor((window.innerWidth * window.innerHeight) / 1000);
    const neoncolors = ['#ffffff', 'hsl(230,100%,70%)', '#ffffff', 'hsl(310,100%,60%)', '#ffffff'];
    const newstars = [];

    for (let i = 0; i < starcount; i++) {
      const color = neoncolors[Math.floor(Math.random() * neoncolors.length)];
      newstars.push({
        id: i,
        size: Math.random() * 3 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.4 + 0.3,
        animationduration: Math.random() * 5 + 1,
        color,
      });
    }

    setstars(newstars);
  };

  useEffect(() => {
    generate();
    console.log('background called successfully');
  }, []);

  return (
    <div className='fixed top-0 left-0 w-screen h-screen pointer-events-none z-0'>
      {stars.map((item) => (
        <div
          key={item.id}
          className='absolute rounded-full animate-float'
          style={{
            width: `${item.size}px`,
            height: `${item.size}px`,
            left: `${item.x}%`,
            top: `${item.y}%`,
            opacity: `${item.opacity}`,
            background: `${item.color}`,
            animationDuration: `${item.animationduration}s`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Background;