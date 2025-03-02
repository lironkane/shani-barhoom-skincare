import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaPhone, FaWhatsapp, FaInstagram, FaHeart, FaMapMarkerAlt, FaClock, FaLaptopCode } from 'react-icons/fa';

// מיכל כללי לפוטר
const FooterContainer = styled.footer`
  position: relative;
  background: linear-gradient(to bottom, rgba(242, 212, 196, 0.2), rgba(255, 255, 255, 1));
  padding: 80px 20px 30px;
  text-align: center;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 60px 20px 20px;
  }
`;

// גל עליון דקורטיבי
const WaveTop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  transform: rotate(180deg);
  
  svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 70px;
    
    @media (max-width: 768px) {
      height: 40px;
    }
  }
  
  .shape-fill {
    fill: #FFFFFF;
  }
`;

// עיטור דקורטיבי
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

// לוגו בפוטר
const FooterLogo = styled(motion.div)`
  margin-bottom: 30px;
  
  img {
    max-width: 150px;
    height: auto;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 20px;
    
    img {
      max-width: 120px;
    }
  }
`;

// כותרת הפוטר
const FooterTitle = styled(motion.h2)`
  font-size: 2rem;
  font-weight: 600;
  color: #3E2F2C;
  margin-bottom: 15px;
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

// תיאור בפוטר
const FooterDescription = styled(motion.p)`
  font-size: 1.1rem;
  color: #4A3F3A;
  max-width: 600px;
  margin: 0 auto 30px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 25px;
  }
`;

// אייקוני קשר
const SocialIcons = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    gap: 15px;
    margin-bottom: 30px;
  }
`;

// אייקון קשר בודד
const SocialIcon = styled(motion.a)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.bg || '#fff'};
  color: ${props => props.color || '#BD8263'};
  font-size: 1.4rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(242, 212, 196, 0.3);
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    font-size: 1.2rem;
  }
`;

// מידע קשר נוסף
const ContactInfo = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    gap: 20px;
    margin-bottom: 30px;
  }
`;

// פריט מידע קשר
const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  
  .icon {
    font-size: 1.2rem;
    color: #BD8263;
  }
  
  .text {
    font-size: 1rem;
    color: #4A3F3A;
  }
  
  @media (max-width: 768px) {
    .icon {
      font-size: 1.1rem;
    }
    
    .text {
      font-size: 0.9rem;
    }
  }
`;

// כפתור צור קשר בפוטר
const ContactButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #3E2F2C;
  color: white;
  padding: 12px 30px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
  position: relative;
  overflow: hidden;
  
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
    padding: 10px 25px;
    font-size: 1rem;
  }
`;

// מפריד
const Divider = styled.div`
  height: 1px;
  background: linear-gradient(to right, rgba(242, 212, 196, 0), rgba(242, 212, 196, 0.7), rgba(242, 212, 196, 0));
  max-width: 80%;
  margin: 0 auto 20px;
`;

// זכויות יוצרים
const Copyright = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  
  .heart {
    color: #BD8263;
    animation: heartbeat 1.5s infinite;
  }
  
  @keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

// קרדיט למפתח
const DeveloperCredit = styled.div`
  font-size: 0.85rem;
  color: #999;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  .icon {
    color: #BD8263;
    font-size: 1rem;
  }
  
  a {
    color: #BD8263;
    text-decoration: none;
    font-weight: 500;
    position: relative;
    
    &::after {
      content: "";
      position: absolute;
      width: 0;
      height: 1px;
      bottom: -2px;
      left: 0;
      background-color: #BD8263;
      transition: width 0.3s ease;
    }
    
    &:hover {
      &::after {
        width: 100%;
      }
    }
  }
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
    
    .icon {
      font-size: 0.9rem;
    }
  }
`;

// וריאנטים לאנימציה
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
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
      delayChildren: 0.2
    }
  }
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: {
    scale: 0.95
  }
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <WaveTop>
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
        </svg>
      </WaveTop>
      
      {/* אלמנטים דקורטיביים */}
      <DecorativeElement 
        top="20%" 
        left="8%" 
        size="100px" 
        shape="circle" 
        color="rgba(189, 130, 99, 0.08)"
        blur="15px"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut'
        }}
      />
      
      <DecorativeElement 
        top="30%" 
        right="10%" 
        size="120px" 
        shape="circle"
        color="rgba(242, 212, 196, 0.1)"
        blur="20px"
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut'
        }}
      />
      
      <FooterLogo
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img src="/images/shani-barhoom-logo.png" alt="Shani Barhoom Skin Care" />
      </FooterLogo>
      
      <FooterTitle
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        זמינה עבורך פה
      </FooterTitle>
      
      <FooterDescription
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        מוזמנת לשלוח הודעה או להתקשר לקביעת תור לטיפול מקצועי ויעיל.
        חווית טיפול מותאמת אישית לצרכי העור שלך, עם תוצאות מוכחות.
      </FooterDescription>
      
      <SocialIcons
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <SocialIcon 
          href="tel:+972506863593"
          color="#3E2F2C"
          bg="rgba(242, 212, 196, 0.3)"
          variants={fadeInUp}
          whileHover="hover"
          whileTap="tap"
          aria-label="התקשר עכשיו"
        >
          <FaPhone />
        </SocialIcon>
        
        <SocialIcon 
          href="https://api.whatsapp.com/send?phone=972506863593"
          target="_blank"
          rel="noopener noreferrer"
          color="#25D366"
          bg="rgba(37, 211, 102, 0.1)"
          variants={fadeInUp}
          whileHover="hover"
          whileTap="tap"
          aria-label="וואטסאפ"
        >
          <FaWhatsapp />
        </SocialIcon>
        
        <SocialIcon 
          href="https://instagram.com/shanibarhoom_skincare"
          target="_blank"
          rel="noopener noreferrer"
          color="#E1306C"
          bg="rgba(225, 48, 108, 0.1)"
          variants={fadeInUp}
          whileHover="hover"
          whileTap="tap"
          aria-label="אינסטגרם"
        >
          <FaInstagram />
        </SocialIcon>
      </SocialIcons>
      
      <ContactInfo
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <ContactItem>
          <div className="icon">
            <FaPhone />
          </div>
          <div className="text">050-686-3593</div>
        </ContactItem>
        
        <ContactItem>
          <div className="icon">
            <FaMapMarkerAlt />
          </div>
          <div className="text">הוד השרון, ישראל</div>
        </ContactItem>
        
        <ContactItem>
          <div className="icon">
            <FaClock />
          </div>
          <div className="text">א-ה: 09:00-20:00 | ו: 09:00-14:00</div>
        </ContactItem>
      </ContactInfo>
      
      <ContactButton
        href="#contact"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        צרי קשר עכשיו
      </ContactButton>
      
      <Divider />
      
      <Copyright>
        © כל הזכויות שמורות {currentYear} | Shani Barhoom Skin Care
        <span className="heart"><FaHeart /></span>
      </Copyright>
      
      <DeveloperCredit>
        <span className="icon"><FaLaptopCode /></span>
        האתר מנוהל על ידי <a href="https://tech-start.co.il/" target="_blank" rel="noopener noreferrer">tech-start</a>
      </DeveloperCredit>
    </FooterContainer>
  );
};

export default Footer;