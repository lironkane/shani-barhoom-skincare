import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const SliderContainer = styled.div`
  position: relative;
  overflow: hidden;
  max-width: 500px;
  margin: 20px auto;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
`;

const SlidesWrapper = styled(motion.div)`
  display: flex;
  width: 100%;
`;

const Slide = styled(motion.div)`
  flex: 0 0 100%;
  box-sizing: border-box;
  text-align: center;
  
  img {
    width: 70%;
    height: auto;
    margin: 0 auto;
    display: block;
    border-radius: 6px;
    object-fit: contain;
  }
`;

const SliderButton = styled.button`
  position: absolute;
  top: 40%;
  z-index: 10;
  transform: translateY(-50%);
  background-color: var(--color-accent);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.3s, background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  
  &:hover {
    opacity: 1;
    background-color: #9e6b57;
  }
  
  &:focus {
    outline: none;
  }
`;

const PrevButton = styled(SliderButton)`
  left: 10px;
  transform: rotate(180deg) translateY(50%);
`;

const NextButton = styled(SliderButton)`
  right: 10px;
  transform: rotate(180deg) translateY(50%);
`;

const SliderDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 15px;
`;

const Dot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ active }) => active ? 'var(--color-accent)' : '#ccc'};
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: ${({ active }) => active ? 'var(--color-accent)' : '#999'};
  }
  
  &:focus {
    outline: none;
  }
`;

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0
  })
};

const ImageSlider = ({ images, altPrefix, autoplaySpeed = 5000 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const intervalRef = useRef(null);
  
  const totalSlides = images.length;
  
  // פונקציה להצגת השקף הבא
  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };
  
  // פונקציה להצגת השקף הקודם
  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };
  
  // פונקציה לבחירת שקף ספציפי
  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };
  
  // הגדרת אוטופליי
  useEffect(() => {
    intervalRef.current = setInterval(nextSlide, autoplaySpeed);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentSlide, autoplaySpeed]);
  
  // עצירת הגלילה האוטומטית בעת הריחוף עם העכבר
  const handleMouseEnter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };
  
  const handleMouseLeave = () => {
    intervalRef.current = setInterval(nextSlide, autoplaySpeed);
  };
  
  return (
    <>
      <SliderContainer 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <SlidesWrapper key={currentSlide}>
            <Slide
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 }
              }}
            >
              <img 
                src={images[currentSlide]} 
                alt={`${altPrefix} ${currentSlide + 1}`} 
              />
            </Slide>
          </SlidesWrapper>
        </AnimatePresence>
        
        <PrevButton onClick={prevSlide}>&#10095;</PrevButton>
        <NextButton onClick={nextSlide}>&#10095;</NextButton>
      </SliderContainer>
      
      <SliderDots>
        {images.map((_, index) => (
          <Dot 
            key={index} 
            active={index === currentSlide} 
            onClick={() => goToSlide(index)}
            aria-label={`Show slide ${index + 1}`}
          />
        ))}
      </SliderDots>
    </>
  );
};

export default ImageSlider;