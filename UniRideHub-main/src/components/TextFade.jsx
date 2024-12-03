import React from 'react';
import { useSpring, animated } from 'react-spring';

const FadingText = ({ text, fromDirection, fontSize }) => {
  const fadeIn = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: {
      opacity: 0,
      transform: `translateY(${fromDirection === 'top' ? '-' : ''}80px)`,
    },
    config: {
      duration: 800, // Set the duration to 2000 milliseconds (2 seconds)
    },
  });

  return <animated.div style={fadeIn}>{text}</animated.div>;
};

export default FadingText;
