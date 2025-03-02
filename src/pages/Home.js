import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import Gallery from '../components/sections/Gallery';
import Testimonials from '../components/sections/Testimonials';
import ContactForm from '../components/sections/ContactForm';
import DiscountPopup from '../components/ui/DiscountPopup';

const HomePage = styled.div`
  width: 100%;
`;

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  // הגדרת הפופאפ להופיע לאחר 5 שניות או לאחר גלילה
  useEffect(() => {
    if (!hasInteracted) {
      const popupTimer = setTimeout(() => {
        setShowPopup(true);
        setHasInteracted(true);
      }, 5000);
      
      const handleScroll = () => {
        if (window.scrollY > 300 && !hasInteracted) {
          setShowPopup(true);
          setHasInteracted(true);
          clearTimeout(popupTimer);
        }
      };
      
      window.addEventListener('scroll', handleScroll);
      
      return () => {
        clearTimeout(popupTimer);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [hasInteracted]);
  
  // טיפול בסגירת הפופאפ והצגת הבאנר
  const handleClosePopup = () => {
    setShowPopup(false);
    setShowBanner(true);
  };
  
  const handleShowPopup = () => {
    setShowBanner(false);
    setShowPopup(true);
  };

  return (
    <Layout showDiscountBanner={showBanner} onBannerClick={handleShowPopup}>
      <HomePage>
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Testimonials />
        <ContactForm />
        
        <DiscountPopup 
          isOpen={showPopup} 
          onClose={handleClosePopup} 
          onShowBanner={() => setShowBanner(true)}
        />
      </HomePage>
    </Layout>
  );
};

export default Home;