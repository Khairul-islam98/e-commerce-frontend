"use client"
import { useState, useEffect } from 'react';
import { Button } from '../ui/button';

export const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '10px',
        backgroundColor: 'red',
        color: 'white',
        borderRadius: '50%',
        fontSize: '16px',
        cursor: 'pointer',
      }}
    >
      ↑
    </Button>
  );
};
