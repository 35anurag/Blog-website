import React from "react";
import { useSpring, animated } from "react-spring";
import { FaLocationArrow } from "react-icons/fa6";

const Arrow = () => {
  const spring = useSpring({
    // Set the initial position and rotation of the arrow
    from: {
      x: 0,
      y: 0,
      rotate: 0,
    },
    // Set the config of the spring
    config: {
      mass: 1,
      tension: 200,
      friction: 20,
    },
  });

  // Define a mouse move handler function
  const onMouseMove = (e) => {
    // Get the mouse position relative to the window
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    // Get the window width and height
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    // Calculate the distance and angle between the mouse and the center of the window
    const distanceX = mouseX - windowWidth / 2;
    const distanceY = mouseY - windowHeight / 2;
    const angle = Math.atan2(distanceY, distanceX);
    // Set the spring values based on the distance and angle
    spring.x.setValue(distanceX / 10);
    spring.y.setValue(distanceY / 10);
    spring.rotate.setValue(angle);
  };

  return (
    // Add the animated arrow component with the spring values
    <animated.div
      className="arrow"
      style={{
        transform: spring.interpolate((x, y, rotate) => `translate(${x}px, ${y}px) rotate(${rotate}rad)`),
      }}
      onMouseMove={onMouseMove}
    >
      <div>Hello</div>
      <div>
        <FaLocationArrow className="fill-blue-400 rotate-45 text-[20px]" />
      </div>
    </animated.div>
  );
};

export default Arrow;
