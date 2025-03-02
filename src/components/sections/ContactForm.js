import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FaPhone, FaWhatsapp, FaInstagram, FaMapMarkerAlt, FaClock, FaStar } from 'react-icons/fa';

// מיכל כללי לסקשן
const ContactSection = styled.section`
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

// רקע דקורטיבי
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

// אלמנט דקורטיבי
const DecorativeElement = styled(motion.div)`
  position: absolute;
  width: ${props => props.size || '60px'};
  height: ${props => props.size || '60px'};
  border-radius: ${props => props.shape === 'circle' ? '50%' : '10px'};
  background: ${props => props.color || 'rgba(242, 212, 196, 0.3)'};
  opacity: ${props => props.opacity || 0.5};
  z-index: 1;
  top: ${props => props.top};
  left: ${props => props.left};
  right: ${props => props.right};
  bottom: ${props => props.bottom};
  filter: blur(${props => props.blur || '0'});
`;

// כותרת הסקשן
const SectionTitle = styled(motion.div)`
  text-align: center;
  margin-bottom: 30px;
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
    margin-bottom: 20px;
    
    h2 {
      font-size: 2.2rem;
    }
  }
`;

// תיאור הסקשן
const SectionDescription = styled(motion.p)`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 50px;
  font-size: 1.15rem;
  color: #4A3F3A;
  line-height: 1.7;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 30px;
  }
`;

// מיכל גלובלי לכל אפשרויות הקשר
const ContactOptionsGrid = styled(motion.div)`
  display: grid;
  /* שינוי חשוב: מחליף את minmax ל-1fr קבוע כדי ליצור שורה של 3 תמיד */
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 60px;
  
  @media (max-width: 992px) {
    /* מתחת ל-992px נציג 2 כרטיסיות בשורה */
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

// קישורים ליצירת קשר
const ContactCard = styled(motion.a)`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  padding: 30px;
  text-decoration: none;
  color: #3E2F2C;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(242, 212, 196, 0.3);
  transition: transform 0.3s ease;
  height: 100%;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 6px;
    height: 100%;
    background: ${props => props.accentColor || '#BD8263'};
    transform: scaleY(0);
    transform-origin: bottom;
    transition: transform 0.4s ease;
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  }
  
  &:hover::before {
    transform: scaleY(1);
  }
  
  @media (max-width: 768px) {
    padding: 25px;
  }
`;

// אייקון הקשר
const ContactIcon = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: ${props => props.bgColor || 'rgba(242, 212, 196, 0.2)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  color: ${props => props.iconColor || '#BD8263'};
  margin-left: 20px;
  flex-shrink: 0;
  transition: transform 0.3s ease, background-color 0.3s ease;
  
  ${ContactCard}:hover & {
    transform: scale(1.1);
    background: ${props => props.hoverBgColor || 'rgba(242, 212, 196, 0.3)'};
  }
  
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
    margin-left: 15px;
  }
`;

// מידע הקשר
const ContactInfo = styled.div`
  flex-grow: 1;
  
  h3 {
    font-size: 1.3rem;
    margin-bottom: 8px;
    color: #3E2F2C;
    font-weight: 600;
  }
  
  p {
    font-size: 1rem;
    color: #666;
    margin-bottom: 12px;
    line-height: 1.5;
  }
  
  .action {
    font-weight: 600;
    font-size: 0.95rem;
    color: ${props => props.actionColor || '#BD8263'};
    display: flex;
    align-items: center;
    
    &::after {
      content: '→';
      margin-right: 6px;
      transition: transform 0.3s ease;
    }
  }
  
  ${ContactCard}:hover .action::after {
    transform: translateX(5px);
  }
  
  @media (max-width: 768px) {
    h3 {
      font-size: 1.2rem;
    }
    
    p {
      font-size: 0.95rem;
    }
  }
`;

// מיכל כרטיס שעות פעילות
const OpeningHoursCard = styled(motion.div)`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  padding: 30px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(242, 212, 196, 0.3);
  max-width: 600px;
  margin: 0 auto 60px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(to right, #F2D4C4, #BD8263);
  }
  
  @media (max-width: 768px) {
    padding: 25px;
  }
`;

// כותרת שעות הפעילות
const HoursTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  
  .icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: rgba(242, 212, 196, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: #BD8263;
    margin-left: 15px;
  }
  
  h3 {
    font-size: 1.3rem;
    color: #3E2F2C;
    font-weight: 600;
  }
  
  @media (max-width: 768px) {
    .icon {
      width: 40px;
      height: 40px;
      font-size: 1.3rem;
    }
    
    h3 {
      font-size: 1.2rem;
    }
  }
`;

// רשימת שעות הפעילות
const HoursList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

// פריט יום ושעות
const HoursItem = styled(motion.div)`
  padding: 10px 15px;
  background: rgba(242, 212, 196, 0.1);
  border-radius: 8px;
  
  .day {
    font-weight: 600;
    margin-bottom: 4px;
    color: #3E2F2C;
  }
  
  .hours {
    font-size: 0.95rem;
    color: #666;
  }
  
  &.active {
    background: rgba(189, 130, 99, 0.1);
    border-right: 3px solid #BD8263;
  }
`;

// כפתורי CTA גדולים למטה
const CtaButtonsContainer = styled(motion.div)`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 900px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    gap: 15px;
  }
`;

// כפתור CTA גדול
const CtaButton = styled(motion.a)`
  background: ${props => props.bgColor || '#3E2F2C'};
  color: white;
  text-decoration: none;
  padding: 20px 30px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  flex: 1;
  min-width: 250px;
  max-width: 350px;
  text-align: center;
  font-weight: 600;
  font-size: 1.1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  
  .icon {
    font-size: 1.6rem;
    z-index: 2;
  }
  
  .text {
    z-index: 2;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }
  
  &:hover::before {
    transform: translateX(100%);
  }
  
  @media (max-width: 768px) {
    padding: 15px 20px;
    font-size: 1rem;
    min-width: 200px;
    
    .icon {
      font-size: 1.4rem;
    }
  }
  
  @media (max-width: 480px) {
    min-width: 100%;
  }
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

// לוקיישן על גבי בקע של ההפרדה - תיקון מיקום
const LocationBadge = styled(motion.div)`
  position: absolute;
  top: 15px; /* שינוי מיקום למעלה יותר - היה -25px */
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  border-radius: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 10;
  border: 1px solid rgba(242, 212, 196, 0.3);
  
  .icon {
    color: #BD8263;
    font-size: 1.2rem;
  }
  
  .text {
    font-weight: 600;
    color: #3E2F2C;
  }
  
  @media (max-width: 768px) {
    padding: 8px 15px;
    
    .icon {
      font-size: 1rem;
    }
    
    .text {
      font-size: 0.9rem;
    }
  }
`;

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
      delayChildren: 0.2
    }
  }
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 12,
      duration: 0.5
    }
  }
};

const buttonVariants = {
  hover: {
    scale: 1.03,
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15
    }
  },
  tap: {
    scale: 0.98
  }
};

// נתוני שעות פעילות
const openingHours = [
  { day: 'ראשון', hours: '09:00 - 20:00', active: false },
  { day: 'שני', hours: '10:00 - 19:00', active: false },
  { day: 'שלישי', hours: '09:00 - 20:00', active: false },
  { day: 'רביעי', hours: '10:00 - 19:00', active: false },
  { day: 'חמישי', hours: '09:00 - 20:00', active: false },
  { day: 'שישי', hours: '09:00 - 14:00', active: false },
];

// פונקציה להחזרת היום הנוכחי כאקטיבי
const markTodayActive = (hoursArray) => {
  const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
  const today = new Date().getDay(); // 0 for Sunday, 1 for Monday, etc.
  
  // שבת סגור, לכן לא צריך לסמן
  if (today === 6) return hoursArray;
  
  return hoursArray.map((item, index) => {
    return {
      ...item,
      active: index === today
    };
  });
};

const Contact = () => {
  // הפנייה לאלמנטים לצורך אנימציה
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const cardsRef = useRef(null);
  const hoursRef = useRef(null);
  const buttonsRef = useRef(null);
  
  // בדיקה האם הגלגלנו לאלמנטים
  const titleInView = useInView(titleRef, { once: true, amount: 0.3 });
  const descInView = useInView(descRef, { once: true, amount: 0.3 });
  const cardsInView = useInView(cardsRef, { once: true, amount: 0.1 });
  const hoursInView = useInView(hoursRef, { once: true, amount: 0.3 });
  const buttonsInView = useInView(buttonsRef, { once: true, amount: 0.2 });
  
  // בקרי אנימציה
  const controls = useAnimation();
  
  // אפקטים לאנימציה
  useEffect(() => {
    if (titleInView) {
      controls.start('visible');
    }
  }, [controls, titleInView]);
  
  // סימון היום הנוכחי כפעיל
  const hoursWithActiveDay = markTodayActive(openingHours);
  
  return (
    <ContactSection id="contact">
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
        <h2>יצירת קשר</h2>
      </SectionTitle>
      
      <SectionDescription
        ref={descRef}
        variants={fadeInUp}
        initial="hidden"
        animate={descInView ? 'visible' : 'hidden'}
      >
        מוזמנת לפנות אלי בכל שאלה! אני זמינה דרך מגוון אפשרויות ואשמח להעניק ייעוץ ראשוני ללא עלות.
      </SectionDescription>
      
      <ContactOptionsGrid
        ref={cardsRef}
        variants={staggerContainer}
        initial="hidden"
        animate={cardsInView ? 'visible' : 'hidden'}
      >
        <ContactCard 
          href="tel:+972506863593"
          variants={itemVariant}
          accentColor="#3E2F2C"
        >
          <ContactIcon 
            bgColor="rgba(62, 47, 44, 0.1)" 
            iconColor="#3E2F2C"
            hoverBgColor="rgba(62, 47, 44, 0.15)"
          >
            <FaPhone />
          </ContactIcon>
          <ContactInfo actionColor="#3E2F2C">
            <h3>שיחת טלפון</h3>
            <p>זמינה לענות לשיחות בשעות הפעילות של הקליניקה</p>
            <div className="action">050-686-3593</div>
          </ContactInfo>
        </ContactCard>
        
        <ContactCard 
          href="https://api.whatsapp.com/send?phone=972506863593"
          target="_blank"
          rel="noopener noreferrer"
          variants={itemVariant}
          accentColor="#25D366"
        >
          <ContactIcon 
            bgColor="rgba(37, 211, 102, 0.1)" 
            iconColor="#25D366"
            hoverBgColor="rgba(37, 211, 102, 0.15)"
          >
            <FaWhatsapp />
          </ContactIcon>
          <ContactInfo actionColor="#25D366">
            <h3>וואטסאפ</h3>
            <p>שלחי הודעה ישירה לקבלת מענה מהיר וקביעת תור</p>
            <div className="action">שלחי הודעה</div>
          </ContactInfo>
        </ContactCard>
        
        <ContactCard 
          href="https://instagram.com/shanibarhoom_skincare"
          target="_blank"
          rel="noopener noreferrer"
          variants={itemVariant}
          accentColor="#E1306C"
        >
          <ContactIcon 
            bgColor="rgba(225, 48, 108, 0.1)" 
            iconColor="#E1306C"
            hoverBgColor="rgba(225, 48, 108, 0.15)"
          >
            <FaInstagram />
          </ContactIcon>
          <ContactInfo actionColor="#E1306C">
            <h3>אינסטגרם</h3>
            <p>עקבי אחרינו לתוכן מעניין, טיפים לטיפוח ומבצעים</p>
            <div className="action">@shanibarhoom_skincare</div>
          </ContactInfo>
        </ContactCard>
      </ContactOptionsGrid>
      
      <OpeningHoursCard
        ref={hoursRef}
        variants={fadeInUp}
        initial="hidden"
        animate={hoursInView ? 'visible' : 'hidden'}
      >
        <HoursTitle>
          <div className="icon">
            <FaClock />
          </div>
          <h3>שעות פעילות</h3>
        </HoursTitle>
        
        <HoursList>
          {hoursWithActiveDay.map((item, index) => (
            <HoursItem 
              key={index} 
              className={item.active ? 'active' : ''}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <div className="day">{item.day}</div>
              <div className="hours">{item.hours}</div>
            </HoursItem>
          ))}
        </HoursList>
      </OpeningHoursCard>
      
      <CtaButtonsContainer
        ref={buttonsRef}
        variants={staggerContainer}
        initial="hidden"
        animate={buttonsInView ? 'visible' : 'hidden'}
      >
        <CtaButton 
          href="tel:+972506863593"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          bgColor="#3E2F2C"
        >
          <div className="icon"><FaPhone /></div>
          <div className="text">חייגי עכשיו לייעוץ</div>
        </CtaButton>
        
        <CtaButton 
          href="https://api.whatsapp.com/send?phone=972506863593"
          target="_blank"
          rel="noopener noreferrer"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          bgColor="#25D366"
        >
          <div className="icon"><FaWhatsapp /></div>
          <div className="text">וואטסאפ לקביעת תור</div>
        </CtaButton>
        
        <CtaButton 
          href="https://instagram.com/shanibarhoom_skincare"
          target="_blank"
          rel="noopener noreferrer"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          bgColor="linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)"
        >
          <div className="icon"><FaInstagram /></div>
          <div className="text">עקבי באינסטגרם</div>
        </CtaButton>
      </CtaButtonsContainer>
      
      <Separator>
        <LocationBadge
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="icon"><FaMapMarkerAlt /></div>
          <div className="text">הוד השרון, ישראל</div>
        </LocationBadge>
        <svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
        </svg>
      </Separator>
    </ContactSection>
  );
};

export default Contact;