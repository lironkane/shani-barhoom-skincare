import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

// רקע הירו עם אפקט פרלקס
const HeroSection = styled.section`
  position: relative;
  width: 100%;
  height: 92vh;
  min-height: 650px;
  background: url("/images/hero-bg.jpg") no-repeat center center/cover;
  background-attachment: fixed;
  margin-top: 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      165deg,
      rgba(242, 212, 196, 0.8) 0%,
      rgba(189, 130, 99, 0.5) 50%,
      rgba(62, 47, 44, 0.3) 100%
    );
    z-index: 1;
  }
  
  @media (max-width: 768px) {
    height: 80vh;
    min-height: 450px;
    background-attachment: scroll;
  }
`;

// אלמנטים דקורטיביים עם אפקט גלאס
const FloatingElement = styled(motion.div)`
  position: absolute;
  width: ${props => props.size || '60px'};
  height: ${props => props.size || '60px'};
  border-radius: ${props => props.shape === 'circle' ? '50%' : props.shape === 'hexagon' ? '10px' : '4px'};
  background: ${props => props.color || 'rgba(255, 255, 255, 0.1)'};
  backdrop-filter: blur(8px);
  z-index: 2;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    width: 150%;
    height: 150%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 60%);
    top: -25%;
    left: -25%;
    opacity: 0.3;
  }
`;

// אפקט זוהר שנודד
const GlowEffect = styled(motion.div)`
  position: absolute;
  width: 120vw;
  height: 120vh;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.3) 0%,
    transparent 40%
  );
  top: ${props => props.top};
  left: ${props => props.left};
  opacity: 0.5;
  z-index: 1;
  mix-blend-mode: overlay;
`;

// תוכן הירו
const HeroContent = styled(motion.div)`
  position: relative;
  z-index: 3;
  text-align: center;
  width: 90%;
  max-width: 850px;
  padding: 40px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  box-shadow: 
    0 10px 50px rgba(0, 0, 0, 0.1),
    0 1px 2px rgba(255, 255, 255, 0.3) inset;
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.2) 0%,
      transparent 60%
    );
    transform: rotate(30deg);
    z-index: -1;
  }
  
  @media (max-width: 768px) {
    padding: 30px 25px;
  }
`;

// כותרת עם אפקט הדגשה ועיצוב מיוחד
const HeroTitle = styled(motion.h1)`
  font-family: "Poppins", sans-serif;
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #3E2F2C;
  line-height: 1.1;
  letter-spacing: -1px;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(to right, #F2D4C4, #BD8263, #F2D4C4);
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

// תיאור עם טקסט מובלט
const HeroDescription = styled(motion.p)`
  font-size: 1.5rem;
  font-weight: 300;
  margin: 2rem auto;
  line-height: 1.6;
  color: #4A3F3A;
  background: transparent;
  max-width: 80%;
  position: relative;
  
  strong {
    font-weight: 600;
    color: #BD8263;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: rgba(189, 130, 99, 0.3);
      border-radius: 1px;
    }
  }
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    max-width: 95%;
    margin: 1.5rem auto;
  }
`;

// כפתור קריאה לפעולה מתקדם
const CtaButton = styled(motion.a)`
  display: inline-block;
  background: linear-gradient(45deg, #BD8263, #BD8263, #9e6b57);
  background-size: 200% auto;
  color: #fff;
  padding: 16px 42px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 
    0 10px 25px rgba(158, 107, 87, 0.4),
    0 2px 5px rgba(255, 255, 255, 0.2) inset;
  position: relative;
  overflow: hidden;
  transition: all 0.5s ease;
  
  &:hover {
    background-position: right center;
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(158, 107, 87, 0.5);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      to bottom right,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0)
    );
    transform: rotate(30deg);
    opacity: 0.2;
    transition: transform 0.5s ease;
  }
  
  &:hover::after {
    transform: rotate(0deg);
    opacity: 0.3;
  }
  
  @media (max-width: 768px) {
    padding: 14px 32px;
    font-size: 1rem;
  }
`;

// מעבר חלק בין הסקשנים
const SectionDivider = styled.div`
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  z-index: 4;
  filter: drop-shadow(0px -3px 2px rgba(0, 0, 0, 0.03));
  
  svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 80px;
    
    @media (max-width: 768px) {
      height: 50px;
    }
  }
  
  .shape-fill {
    fill: #FFFFFF;
  }
`;

// רשימת פיצ'רים מתחת לתיאור
const FeatureList = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 10px 0 30px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const FeatureItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 30px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 0.9rem;
  font-weight: 500;
  color: #3E2F2C;
  
  span {
    color: #BD8263;
    font-weight: 600;
  }
  
  @media (max-width: 768px) {
    padding: 4px 12px;
    font-size: 0.8rem;
  }
`;

// אנימציות פיצ'רים
const featureVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 1 + (custom * 0.1),
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

// אנימציית גלישת גלים 
const waveVariants = {
  animate: {
    x: [0, -50, 0],
    transition: {
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// הגדרת מקום האלמנטים המרחפים
const floatingElements = [
  { id: 1, top: '15%', left: '10%', size: '80px', shape: 'hexagon', color: 'rgba(242, 212, 196, 0.15)' },
  { id: 2, top: '25%', right: '12%', size: '60px', shape: 'circle', color: 'rgba(255, 255, 255, 0.1)' },
  { id: 3, top: '70%', left: '15%', size: '65px', shape: 'square', color: 'rgba(189, 130, 99, 0.1)' },
  { id: 4, top: '65%', right: '8%', size: '90px', shape: 'circle', color: 'rgba(255, 255, 255, 0.05)' },
  { id: 5, top: '40%', left: '32%', size: '35px', shape: 'circle', color: 'rgba(242, 212, 196, 0.2)' },
  { id: 6, top: '30%', left: '25%', size: '25px', shape: 'square', color: 'rgba(255, 255, 255, 0.12)' },
  { id: 7, top: '50%', right: '25%', size: '45px', shape: 'hexagon', color: 'rgba(189, 130, 99, 0.08)' },
];

// פיצ'רים להצגה בטקסט המתחלף
const features = [
  "טיפולי פנים",
  "טיפולי אנטי-אייג'ינג",
  "הסרת שיער בלייזר",
  "טיפול באקנה",
  "טיפול בכתמי עור",
  "טיפולי עיצוב גוף"
];

const Hero = () => {
  const controls = useAnimation();
  const [currentFeature, setCurrentFeature] = useState(0);
  
  // אנימציית טקסט מתחלף
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    // הפעלת אנימציה כאשר הקומפוננטה נטענת
    controls.start('visible');
  }, [controls]);
  
  // אפקט גלילה פרלקס
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position * 0.3);  // מקדם האטה
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <HeroSection id="hero">
      {/* אפקט זוהר נודד */}
      <GlowEffect 
        top={`${-30 + scrollPosition * 0.1}%`} 
        left={`${-20 + scrollPosition * 0.05}%`}
        animate={{ 
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut'
        }}
      />
      
      {/* אלמנטים מרחפים */}
      {floatingElements.map((element) => (
        <FloatingElement
          key={element.id}
          style={{ 
            top: element.top, 
            left: element.left, 
            right: element.right,
            size: element.size,
            transform: `translateY(${scrollPosition * 0.1}px)`
          }}
          size={element.size}
          shape={element.shape}
          color={element.color}
          animate={{ 
            y: ['-15px', '15px', '-15px'],
            x: ['8px', '-8px', '8px'],
            rotate: [0, element.id % 2 === 0 ? 5 : -5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 7 + (element.id % 4), 
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            times: [0, 0.5, 1]
          }}
        />
      ))}
      
      <HeroContent 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ transform: `translateY(${scrollPosition * 0.2}px)` }}
      >
        <HeroTitle
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1,
            delay: 0.2,
            type: "spring",
            stiffness: 100
          }}
        >
          עור בריא וזוהר מתחיל כאן
        </HeroTitle>
        
        <HeroDescription
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <strong>הקליניקה הבוטיקית</strong> שלך לטיפולי פנים והסרת שיער בלייזר בגישה אישית ומקצועית
        </HeroDescription>
        
        <FeatureList>
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              custom={index}
              variants={featureVariants}
              initial="hidden"
              animate="visible"
            >
              <span>✦</span> {feature}
            </FeatureItem>
          ))}
        </FeatureList>
        
        <CtaButton
          href="#contact"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.5, 
            delay: 1.2,
            ease: [0, 0.71, 0.2, 1.01]
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          לקביעת תור
        </CtaButton>
      </HeroContent>
      
      {/* חיבור חלק בין הסקשנים */}
      <SectionDivider>
        <motion.svg 
          data-name="Layer 1" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          variants={waveVariants}
          animate="animate"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
        </motion.svg>
      </SectionDivider>
    </HeroSection>
  );
};

export default Hero;