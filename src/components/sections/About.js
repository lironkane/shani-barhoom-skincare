import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useRef } from 'react';

// מיכל כללי לסקשן
const AboutSection = styled.section`
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
  background: radial-gradient(ellipse at center, rgba(242, 212, 196, 0.15) 0%, rgba(255, 255, 255, 0) 70%);
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

// תוכן ראשי
const AboutContent = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
  position: relative;
  
  @media (max-width: 960px) {
    flex-direction: column-reverse;
    gap: 30px;
  }
`;

// צד הטקסט
const AboutText = styled(motion.div)`
  flex: 1;
  z-index: 2;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.05),
    0 1px 0 rgba(255, 255, 255, 0.8) inset;
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(to right, #F2D4C4, #BD8263, #F2D4C4);
  }
  
  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

// פסקאות טקסט מסוגננות
const Paragraph = styled(motion.p)`
  margin-bottom: 24px;
  font-size: 1.15rem;
  line-height: 1.8;
  color: #4A3F3A;
  text-align: right;
  
  strong {
    color: #BD8263;
    font-weight: 600;
    position: relative;
    display: inline-block;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: rgba(189, 130, 99, 0.2);
      border-radius: 1px;
    }
  }
  
  &:last-of-type {
    margin-bottom: 0;
  }
  
  @media (max-width: 768px) {
    font-size: 1.05rem;
    text-align: center;
  }
`;

// תגים של התמחויות בעיצוב אלגנטי
const SpecialtiesContainer = styled(motion.div)`
  margin: 30px 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(189, 130, 99, 0.2), transparent);
    transform: translateY(-50%);
  }
`;

const SpecialtiesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 15px;
  margin: 15px 0;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 10px;
  }
`;

const SpecialtyItem = styled(motion.div)`
  text-align: center;
  padding: 15px 10px;
  background: rgba(242, 212, 196, 0.1);
  border-radius: 10px;
  border: 1px solid rgba(242, 212, 196, 0.3);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;
  
  span {
    display: block;
    font-weight: 600;
    font-size: 0.95rem;
    color: #3E2F2C;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(189, 130, 99, 0.1);
    background: rgba(242, 212, 196, 0.2);
  }
  
  @media (max-width: 768px) {
    padding: 10px 8px;
    
    span {
      font-size: 0.85rem;
    }
  }
`;

// צד התמונה
const AboutImage = styled(motion.div)`
  flex: 1;
  z-index: 2;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 20px;
    width: 100%;
    height: 100%;
    background: rgba(242, 212, 196, 0.3);
    border-radius: 20px;
    z-index: -1;
  }
  
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 20px;
    max-height: 500px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    border: 4px solid #FFF;
    transition: transform 0.5s ease;
  }
  
  @media (max-width: 768px) {
    width: 90%;
    max-width: 400px;
    margin: 0 auto;
    
    &::before {
      top: 15px;
      left: 15px;
    }
  }
`;

// אלמנט דקורטיבי נוסף, יותר עדין
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

// מפריד חלק בין סקשנים
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

// התמחויות
const specialties = [
  "טיפול באקנה",
  "פוסט אקנה",
  "כתמים וצלקות",
  "פיגמנטציה",
  "הצרת היקפים",
  "טיפולי זוהר",
  "הסרת שיער בלייזר",
  "אנטי אייג'ינג"
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

const fadeInRight = {
  hidden: { opacity: 0, x: -80 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: 80 },
  visible: { 
    opacity: 1, 
    x: 0,
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
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 10,
      duration: 0.5 
    }
  }
};

const imageHoverVariant = {
  hover: {
    scale: 1.03,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const About = () => {
  const controls = useAnimation();
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const specialtiesRef = useRef(null);
  
  const titleInView = useInView(titleRef, { once: true, amount: 0.3 });
  const textInView = useInView(textRef, { once: true, amount: 0.3 });
  const imageInView = useInView(imageRef, { once: true, amount: 0.3 });
  const specialtiesInView = useInView(specialtiesRef, { once: true, amount: 0.3 });
  
  useEffect(() => {
    if (titleInView) {
      controls.start('visible');
    }
  }, [controls, titleInView]);
  
  return (
    <AboutSection id="about">
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
      
      {/* אלמנטים דקורטיביים מעודנים */}
      <DecorativeElement 
        top="15%" 
        right="10%" 
        size="180px" 
        shape="circle" 
        color="rgba(189, 130, 99, 0.08)"
        blur="15px"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut'
        }}
      />
      
      <DecorativeElement 
        bottom="20%" 
        left="5%" 
        size="150px" 
        shape="circle"
        color="rgba(242, 212, 196, 0.1)"
        blur="10px"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ 
          duration: 12,
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
        <h2>קצת עלי</h2>
      </SectionTitle>
      
      <AboutContent>
        <AboutText
          ref={textRef}
          variants={fadeInRight}
          initial="hidden"
          animate={textInView ? 'visible' : 'hidden'}
        >
          <Paragraph>
            שלום, אני <strong>שני ברהום</strong>, מומחית לטיפולי פנים וגוף ובעלת קליניקה מתקדמת שמציעה חוויה אישית ומפנקת.
          </Paragraph>
          
          <Paragraph>
            בקליניקה שלי אני מתמחה בטיפול במגוון רחב של בעיות עור וגוף, ומשתמשת במכשור המתקדם ביותר, כולל טכנולוגיות לייזר להסרת שיער שמבטיחות תוצאות כבר מהטיפול הראשון.
          </Paragraph>
          
          <SpecialtiesContainer
            ref={specialtiesRef}
          >
            <SpecialtiesGrid
              variants={staggerContainer}
              initial="hidden"
              animate={specialtiesInView ? 'visible' : 'hidden'}
            >
              {specialties.map((specialty, index) => (
                <SpecialtyItem key={index} variants={itemVariant}>
                  <span>{specialty}</span>
                </SpecialtyItem>
              ))}
            </SpecialtiesGrid>
          </SpecialtiesContainer>
          
          <Paragraph>
            הגיע הזמן שתפנקי את עצמך בטיפול מקצועי ויעיל לעור פנים זוהר –
            <strong> כי מגיע לך להרגיש נפלא ולהיראות במיטבך!</strong>
          </Paragraph>
        </AboutText>
        
        <AboutImage
          ref={imageRef}
          variants={fadeInLeft}
          initial="hidden"
          animate={imageInView ? 'visible' : 'hidden'}
          whileHover="hover"
        >
          <motion.img 
            src="/images/face1.png" 
            alt="תמונת אווירה של טיפולי פנים" 
            variants={imageHoverVariant}
          />
        </AboutImage>
      </AboutContent>
      
      <Separator>
        <svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
        </svg>
      </Separator>
    </AboutSection>
  );
};

export default About;