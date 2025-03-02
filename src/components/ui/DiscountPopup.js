import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhone, FaGift, FaTimes } from 'react-icons/fa';

const PopupOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(5px);
`;

const PopupContent = styled(motion.div)`
  background: url("/images/popup-background.jpg") no-repeat center center/cover;
  padding: 40px 30px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 400px;
  color: #fff;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 20px;
    z-index: 1;
  }
  
  * {
    position: relative;
    z-index: 2;
  }
  
  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 1.5rem;
  color: #fff;
  cursor: pointer;
  z-index: 10;
  background: rgba(37, 37, 37, 0.5);
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: background 0.3s ease, transform 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: rotate(90deg);
  }
`;

const DiscountIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #F2D4C4, #BD8263);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 2.5rem;
  color: white;
  box-shadow: 0 10px 25px rgba(189, 130, 99, 0.5);
  
  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
    font-size: 2rem;
  }
`;

const PopupTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 15px;
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const PopupDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 30px;
  color: rgba(255, 255, 255, 0.9);
  
  strong {
    color: #F2D4C4;
    font-weight: 600;
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 25px;
  }
`;

const CallButton = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #3E2F2C;
  color: white;
  text-decoration: none;
  padding: 15px 30px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
  width: fit-content;
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
  
  .icon {
    font-size: 1.3rem;
  }
  
  @media (max-width: 768px) {
    padding: 12px 25px;
    font-size: 1rem;
    
    .icon {
      font-size: 1.1rem;
    }
  }
`;

// קישור לפנייה לוואטסאפ
const WhatsappOption = styled.div`
  margin-top: 20px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  
  a {
    color: #F2D4C4;
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const popupVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.3
    }
  }
};

const DiscountPopup = ({ isOpen, onClose, onShowBanner }) => {
  const [animationComplete, setAnimationComplete] = useState(false);
  
  const handleClose = () => {
    onClose();
    setTimeout(() => {
      onShowBanner();
    }, 500);
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <PopupOverlay
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={popupVariants}
          onClick={handleClose}
        >
          <PopupContent 
            onClick={e => e.stopPropagation()}
            onAnimationComplete={() => setAnimationComplete(true)}
          >
            <CloseButton onClick={handleClose} aria-label="סגור">
              <FaTimes />
            </CloseButton>
            
            <DiscountIcon>
              <FaGift />
            </DiscountIcon>
            
            <PopupTitle>10% הנחה!</PopupTitle>
            
            <PopupDescription>
              מגיע לך פינוק! התקשרי עכשיו וציני שראית את ההנחה באתר
              וקבלי <strong>10% הנחה</strong> על הטיפול הראשון.
            </PopupDescription>
            
            <CallButton
              href="tel:+972506863593"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="icon"><FaPhone /></span>
              <span>התקשרי עכשיו לקבלת ההנחה</span>
            </CallButton>
            
            <WhatsappOption>
              <span>או פני דרך </span>
              <a href="https://api.whatsapp.com/send?phone=972506863593&text=היי,%20ראיתי%20באתר%20שמגיע%20לי%2010%%20הנחה%20בטיפול%20הראשון" target="_blank" rel="noopener noreferrer">
                וואטסאפ
              </a>
              <span> וציני שראית את ההנחה באתר</span>
            </WhatsappOption>
          </PopupContent>
        </PopupOverlay>
      )}
    </AnimatePresence>
  );
};

export default DiscountPopup;