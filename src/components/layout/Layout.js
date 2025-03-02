import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import { FaArrowUp, FaComment, FaPhoneAlt } from 'react-icons/fa';

// מיכל המסגרת הכללי
const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

// מיכל התוכן המרכזי
const Main = styled.main`
  flex: 1;
  position: relative;
`;

// אינדיקטור גלילה עליון
const ScrollIndicator = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  background: linear-gradient(to right, var(--color-main), var(--color-accent));
  z-index: 1000;
`;

// באנר תחתון - מיקום מרכזי מוחלט
const BottomBanner = styled(motion.div)`
  position: fixed;
  bottom: 30px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 400px;
  max-width: 90%;
  z-index: 1003;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  background: white;
  
  @media (max-width: 768px) {
    width: 90%;
    bottom: 20px;
  }
`;

// כפתור קריאה לפעולה מעוצב
const ActionButton = styled(motion.button)`
  background: linear-gradient(135deg, #BD8263, #9e6b57);
  color: white;
  border: none;
  padding: 18px 32px;
  font-weight: 600;
  font-size: 1.15rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.3s ease;
  
  .icon {
    font-size: 1.25rem;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }
  
  &:hover {
    &::before {
      transform: translateX(100%);
    }
  }
  
  @media (max-width: 768px) {
    padding: 15px 30px;
    font-size: 1.05rem;
  }
`;

// שורת טקסט נוספת תחת הכפתור
const BannerText = styled.div`
  padding: 15px 25px;
  background: rgba(255, 255, 255, 0.95);
  text-align: center;
  border-top: 1px solid rgba(189, 130, 99, 0.2);
  
  p {
    margin: 0;
    font-size: 0.9rem;
    color: #3E2F2C;
    font-weight: 500;
    background: transparent;
    padding: 0;
  }
`;

// כפתור חזרה למעלה
const ScrollToTopButton = styled(motion.button)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: white;
  color: var(--color-accent);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  z-index: 1002;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--color-accent);
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
    width: 45px;
    height: 45px;
    font-size: 1.1rem;
  }
`;

// באנר הנחה עליון
const DiscountBanner = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(to right, var(--color-main), #BD8263);
  color: white;
  text-align: center;
  padding: 10px 20px;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  
  p {
    margin: 0;
    font-size: 1rem;
    font-weight: 500;
    color: white;
    background: transparent;
    padding: 0;
  }
  
  @media (max-width: 768px) {
    padding: 8px 15px;
    
    p {
      font-size: 0.9rem;
    }
  }
`;

// כפתור באנר הנחה
const DiscountButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: white;
  padding: 6px 15px;
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    padding: 5px 12px;
    font-size: 0.85rem;
  }
`;

const Layout = ({ children, showDiscountBanner, onBannerClick }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBottomBanner, setShowBottomBanner] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // טיפול בגלילה ועדכון מחוונים
  useEffect(() => {
    const handleScroll = () => {
      // חישוב אחוז הגלילה
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
      
      // הצגת הבאנר התחתון לאחר גלילה של 40% מהדף
      if (window.scrollY > totalHeight * 0.4 && !showBottomBanner) {
        setShowBottomBanner(true);
      } else if (window.scrollY <= totalHeight * 0.1 && showBottomBanner) {
        setShowBottomBanner(false);
      }
      
      // הצגת כפתור חזרה למעלה כשגוללים למטה
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showBottomBanner]);

  // פונקציה לגלילה לטופס יצירת קשר
  const handleBottomBannerClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      
      // התמקדות בשדה הראשון אחרי הגלילה
      setTimeout(() => {
        const firstInput = contactSection.querySelector('input');
        if (firstInput) {
          firstInput.focus();
        }
      }, 800);
      
      setShowBottomBanner(false);
    }
  };
  
  // פונקציה לגלילה בחזרה למעלה
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <PageContainer>
      <ScrollIndicator style={{ width: `${scrollProgress}%` }} />
      
      {/* באנר ההנחה - רק אם showDiscountBanner הוא true */}
      <AnimatePresence>
        {showDiscountBanner && (
          <DiscountBanner
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ duration: 0.5 }}
          >
            <p>מגיע לך 10% הנחה בטיפול הראשון!</p>
            <DiscountButton onClick={onBannerClick}>
              לחצי כאן
            </DiscountButton>
          </DiscountBanner>
        )}
      </AnimatePresence>
      
      <Header />
      <Main style={{ marginTop: showDiscountBanner ? '50px' : '0' }}>
        {children}
      </Main>
      <Footer />
      
      {/* באנר תחתון ליצירת קשר - במרכז העמוד */}
      <AnimatePresence>
        {showBottomBanner && (
          <BottomBanner
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.5, type: 'spring', damping: 20 }}
          >
            <ActionButton 
              onClick={handleBottomBannerClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="icon"><FaPhoneAlt /></span>
              <span>יצירת קשר</span>
            </ActionButton>
            <BannerText>
              <p>רוצה לשמוע פרטים נוספים או לקבוע תור? נשמח לעזור לך!</p>
            </BannerText>
          </BottomBanner>
        )}
      </AnimatePresence>
      
      {/* כפתור חזרה למעלה */}
      <AnimatePresence>
        {showScrollTop && (
          <ScrollToTopButton
            onClick={handleScrollToTop}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="חזרה לראש העמוד"
          >
            <FaArrowUp />
          </ScrollToTopButton>
        )}
      </AnimatePresence>
    </PageContainer>
  );
};

export default Layout;