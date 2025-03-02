import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useRef } from 'react';

// מיכל כללי לסקשן
const ServicesSection = styled.section`
  position: relative;
  max-width: 1200px;
  margin: 0 auto 80px;
  padding: 80px 20px;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 60px 20px;
    margin-bottom: 40px;
  }
`;

// אלמנט רקע דקורטיבי
const BackgroundDecoration = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at center, rgba(242, 212, 196, 0.1) 0%, rgba(255, 255, 255, 0) 70%);
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0.7;
`;

// כותרת הסקשן
const SectionTitle = styled(motion.div)`
  text-align: center;
  margin-bottom: 60px;
  position: relative;
  z-index: 2;
  
  h2 {
    font-family: "Poppins", sans-serif;
    font-size: 3rem;
    font-weight: 700;
    color: #3E2F2C;
    margin-bottom: 15px;
    position: relative;
    display: inline-block;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -15px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 4px;
      background: linear-gradient(to right, rgba(189, 130, 99, 0.3), rgba(189, 130, 99, 1), rgba(189, 130, 99, 0.3));
      border-radius: 2px;
    }
  }
  
  @media (max-width: 768px) {
    margin-bottom: 40px;
    
    h2 {
      font-size: 2.2rem;
    }
  }
`;

// מיכל לכרטיסי השירותים
const ServicesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin: 0 auto;
  max-width: 1100px;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 25px;
  }
`;

// כרטיס שירות יחיד
const ServiceCard = styled(motion.div)`
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  height: 320px;
  background: ${(props) => `url(${props.bgImage}) no-repeat center center/cover`};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  cursor: pointer;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.85) 0%,
      rgba(0, 0, 0, 0.6) 30%,
      rgba(0, 0, 0, 0.3) 70%,
      rgba(0, 0, 0, 0.1) 100%
    );
    transition: all 0.5s ease;
    z-index: 1;
  }
  
  &:hover::before {
    background: linear-gradient(
      to top,
      rgba(62, 47, 44, 0.9) 0%,
      rgba(62, 47, 44, 0.7) 30%,
      rgba(189, 130, 99, 0.4) 70%,
      rgba(189, 130, 99, 0.2) 100%
    );
  }
  
  @media (max-width: 768px) {
    height: 280px;
  }
`;

// תוכן הכרטיס
const ServiceContent = styled.div`
  position: relative;
  z-index: 2;
  padding: 30px 25px;
  transition: transform 0.4s ease-out;
  transform: translateY(calc(100% - 90px));
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  
  ${ServiceCard}:hover & {
    transform: translateY(0);
    background: rgba(41, 31, 29, 0.85);
  }
  
  @media (max-width: 768px) {
    padding: 25px 20px;
  }
`;

// כותרת השירות
const ServiceTitle = styled.h3`
  color: white;
  font-size: 1.8rem;
  margin-bottom: 15px;
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 0;
    height: 2px;
    background: #F2D4C4;
    transition: width 0.4s ease;
  }
  
  ${ServiceCard}:hover &::after {
    width: 80px;
  }
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

// תיאור השירות
const ServiceDescription = styled.p`
  color: rgba(255, 255, 255, 0.95);
  font-size: 1.05rem;
  line-height: 1.6;
  margin-bottom: 15px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.4s ease;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  font-weight: 400;
  
  ${ServiceCard}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

// כפתור "קרא עוד"
const ReadMoreButton = styled(motion.a)`
  display: inline-block;
  background: #BD8263;
  color: white;
  padding: 8px 20px;
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.4s ease 0.1s;
  
  ${ServiceCard}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
  
  &:hover {
    background: #9e6b57;
  }
`;

// אייקון פלוס - אפקט למעלה בכרטיס
const PlusIcon = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(242, 212, 196, 0.2);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: all 0.3s ease;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    background: white;
    transition: all 0.3s ease;
  }
  
  &::before {
    width: 16px;
    height: 2px;
  }
  
  &::after {
    width: 2px;
    height: 16px;
  }
  
  ${ServiceCard}:hover & {
    background: rgba(189, 130, 99, 0.5);
    transform: rotate(135deg);
  }
`;

// יצירת תג שמציג קטגוריה
const ServiceTag = styled.span`
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(242, 212, 196, 0.85);
  color: #3E2F2C;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 20px;
  z-index: 2;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

// אלמנט דקורטיבי
const DecorativeElement = styled(motion.div)`
  position: absolute;
  width: ${props => props.size || '60px'};
  height: ${props => props.size || '60px'};
  border-radius: ${props => props.shape === 'circle' ? '50%' : '10px'};
  background: ${props => props.color || 'rgba(242, 212, 196, 0.3)'};
  opacity: 0.5;
  z-index: 1;
  top: ${props => props.top};
  left: ${props => props.left};
  right: ${props => props.right};
  bottom: ${props => props.bottom};
  filter: blur(${props => props.blur || '0'});
`;

// מפריד בתחתית הסקשן
const Separator = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  padding-top: 3%;
  margin-top: 80px;
  
  svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 70px;
    filter: drop-shadow(0 -2px 1px rgba(0,0,0,0.03));
    
    @media (max-width: 768px) {
      height: 40px;
    }
  }
  
  .shape-fill {
    fill: #F2D4C4;
  }
  
  @media (max-width: 768px) {
    margin-top: 50px;
  }
`;

// מבנה נתונים של השירותים
const services = [
  {
    id: 1,
    title: "טיפול באקנה",
    description: "טיפולי עומק בשילוב חומרים פעילים וטכנולוגיה חדישה להחזרת הברק והבריאות לעור. התוצאות נראות כבר אחרי טיפול ראשון.",
    image: "/images/akne-treatment.jpg",
    category: "טיפולי פנים"
  },
  {
    id: 2,
    title: "אנטי אייג'ינג",
    description: "שיטות מתקדמות להפחתת קמטים וחידוש העור, למראה צעיר וזוהר. שילוב טכנולוגיות חדשניות עם חומרים טבעיים.",
    image: "/images/anti-aging.jpg",
    category: "חידוש עור"
  },
  {
    id: 3,
    title: "טיפול פנים מפנק",
    description: "ניקוי יסודי, עיסוי והזנת העור, חוויה מרגיעה שמשאירה את פנייך קורנות. הטיפול כולל פילינג, מסכות ייחודיות ועוד.",
    image: "/images/face-treatment.jpg",
    category: "פינוק והרגעה"
  },
  {
    id: 4,
    title: "הסרת שיער בלייזר",
    description: "סוף לגלח ולשעווה - מכשיר לייזר עוצמתי למהירות ויעילות בכל אזורי הגוף. תהליך בטוח ומהיר עם תוצאות ארוכות טווח.",
    image: "/images/service-box-laser.jpg",
    category: "טיפולי לייזר"
  }
];

// אנימציות
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 12,
      duration: 0.6
    }
  }
};

const Services = () => {
  const controls = useAnimation();
  const titleRef = useRef(null);
  const servicesRef = useRef(null);
  
  const titleInView = useInView(titleRef, { once: true, amount: 0.3 });
  const servicesInView = useInView(servicesRef, { once: true, amount: 0.1 });
  
  useEffect(() => {
    if (titleInView) {
      controls.start('visible');
    }
  }, [controls, titleInView]);
  
  return (
    <ServicesSection id="services">
      <BackgroundDecoration 
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          repeatType: 'reverse'
        }}
      />
      
      {/* אלמנטים דקורטיביים */}
      <DecorativeElement 
        top="10%" 
        left="5%" 
        size="150px" 
        shape="circle" 
        color="rgba(189, 130, 99, 0.05)"
        blur="15px"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ 
          duration: 12,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut'
        }}
      />
      
      <DecorativeElement 
        bottom="15%" 
        right="8%" 
        size="180px" 
        shape="circle"
        color="rgba(242, 212, 196, 0.08)"
        blur="20px"
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut'
        }}
      />
      
      <SectionTitle
        ref={titleRef}
        variants={fadeInUp}
        initial="hidden"
        animate={titleInView ? 'visible' : 'hidden'}
      >
        <h2>טיפולים פופולריים</h2>
      </SectionTitle>
      
      <ServicesGrid
        ref={servicesRef}
        variants={staggerContainer}
        initial="hidden"
        animate={servicesInView ? 'visible' : 'hidden'}
      >
        {services.map((service) => (
          <ServiceCard 
            key={service.id} 
            bgImage={service.image}
            variants={cardVariant}
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
          >
            <ServiceTag>{service.category}</ServiceTag>
            <PlusIcon />
            <ServiceContent>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
              <ReadMoreButton href="#contact">לפרטים נוספים</ReadMoreButton>
            </ServiceContent>
          </ServiceCard>
        ))}
      </ServicesGrid>
      
      <Separator>
        <svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
        </svg>
      </Separator>
    </ServicesSection>
  );
};

export default Services;