import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeaderContainer = styled.header`
  text-align: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 10px 20px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  transition: margin-top 0.3s ease;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  
  a {
    display: flex;
    align-items: center;
  }

  img {
    max-width: 200px;
    height: auto;
    object-fit: contain;
    background-color: #fff;
    padding: 8px 14px;
    border-radius: 8px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.1);
    display: inline-block;
  }
`;

const NavbarContainer = styled.nav`
  ul {
    display: flex;
    gap: 20px;
  }

  li a {
    text-decoration: none;
    color: var(--color-text);
    font-weight: 500;
    transition: color 0.3s;
  }

  li a:hover {
    color: var(--color-accent);
  }

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    gap: 10px;
    background-color: var(--color-bg);
    position: fixed;
    top: 60px;
    left: 0;
    width: 100%;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: all 0.3s ease-in-out;
    z-index: 1001;

    ul {
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    li a {
      font-size: 1rem;
      color: var(--color-text);
    }
  }
`;

const Hamburger = styled.div`
  display: none;
  cursor: pointer;
  flex-direction: column;
  gap: 5px;
  z-index: 999;
  position: absolute;
  left: 20px;
  top: 15px;

  span {
    display: block;
    width: 25px;
    height: 3px;
    background-color: #000;
    transition: transform 0.3s, opacity 0.3s;
  }

  &.open span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }

  &.open span:nth-child(2) {
    opacity: 0;
  }

  &.open span:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const DiscountBanner = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: var(--color-main);
  color: #fff;
  text-align: center;
  padding: 5px 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  z-index: 9999;

  p {
    margin: 0;
    font-size: 1rem;
    background: transparent;
    padding: 0;
  }

  button {
    background: none;
    border: none;
    color: var(--color-text);
    text-decoration: underline;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
  }
`;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  // האפקט הזה יציג את הבאנר לאחר 3 שניות
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBanner(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleShowPopup = () => {
    // בשלב זה רק נסתיר את הבאנר
    setShowBanner(false);
    // כאן נפעיל את הפופאפ בהמשך
    console.log('Show popup');
  };

  return (
    <>


      <HeaderContainer style={{ marginTop: showBanner ? '40px' : '0' }}>
        <Hamburger className={isOpen ? 'open' : ''} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </Hamburger>

        <Logo>
          <Link to="/" className="logo-link">
            <img
              src="/images/shani-barhoom-logo.png"
              alt="Shani Barhoom Skin Care"
              className="logo-img"
            />
          </Link>
        </Logo>

        <NavbarContainer isOpen={isOpen}>
          <ul>
            <li><a href="#about" onClick={() => setIsOpen(false)}>קצת עלי</a></li>
            <li><a href="#services" onClick={() => setIsOpen(false)}>טיפולים</a></li>
            <li><a href="#gallery" onClick={() => setIsOpen(false)}>תוצאות</a></li>
            <li><a href="#testimonials" onClick={() => setIsOpen(false)}>לקוחות ממליצות</a></li>
            <li><a href="#contact" onClick={() => setIsOpen(false)}>צרי קשר</a></li>
          </ul>
        </NavbarContainer>
      </HeaderContainer>
    </>
  );
};

export default Header;