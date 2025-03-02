import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence, useAnimation, useInView } from 'framer-motion';
import { FaInstagram, FaExpand, FaArrowLeft, FaArrowRight, FaTimes } from 'react-icons/fa';

// מיכל כללי לסקשן
const GallerySection = styled.section`
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

// תיאור הסקשן
const SectionDescription = styled(motion.p)`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 40px;
  font-size: 1.1rem;
  color: #4A3F3A;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 30px;
  }
`;

// רשת הגלריה
const GalleryGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  margin-bottom: 40px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    grid-gap: 15px;
  }
`;

// פריט בגלריה
const GalleryItem = styled(motion.div)`
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 60%);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
    pointer-events: none;
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

// אוברליי של פריט בגלריה
const GalleryItemOverlay = styled(motion.div)`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 20px;
  z-index: 2;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${GalleryItem}:hover & {
    opacity: 1;
  }
`;

// כותרת פריט
const GalleryItemTitle = styled.h3`
  color: white;
  font-size: 1.2rem;
  margin-bottom: 8px;
  text-align: center;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

// תיאור פריט
const GalleryItemDescription = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  text-align: center;
  margin-bottom: 15px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
`;

// כפתור הגדלה
const ExpandButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  backdrop-filter: blur(5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  margin-bottom: 10px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

// מודל תצוגת תמונה
const LightboxOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(10px);
`;

const LightboxContent = styled(motion.div)`
  position: relative;
  width: 90%;
  max-width: 1000px;
  max-height: 80vh;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 8px;
  }
`;

const LightboxControls = styled.div`
  position: absolute;
  bottom: -60px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const LightboxButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 1.2rem;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const CloseButton = styled(LightboxButton)`
  position: absolute;
  top: -60px;
  right: 0;
`;

// כפתור לטעינת עוד תמונות
const LoadMoreButton = styled(motion.button)`
  background: #3E2F2C;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: block;
  margin: 0 auto 40px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease, transform 0.3s ease;
  
  &:hover {
    background: #574841;
    transform: translateY(-2px);
  }
`;

// הפניה לאינסטגרם
const InstagramLink = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 15px;
  background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
  color: white;
  text-decoration: none;
  padding: 15px 25px;
  border-radius: 10px;
  max-width: 450px;
  margin: 40px auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
  
  .icon {
    font-size: 2rem;
  }
  
  .text {
    h4 {
      font-size: 1.2rem;
      margin-bottom: 5px;
    }
    
    p {
      font-size: 0.9rem;
      margin: 0;
      opacity: 0.9;
    }
  }
`;

// סקשן הקליניקה
const ClinicSection = styled(motion.div)`
  margin-top: 80px;
  
  @media (max-width: 768px) {
    margin-top: 50px;
  }
`;

// כפתור צור קשר לתחתית גלריה
const ContactButton = styled(motion.a)`
  background: linear-gradient(135deg, #BD8263, #9e6b57);
  color: white;
  text-decoration: none;
  padding: 14px 35px;
  border-radius: 50px;
  display: inline-block;
  font-weight: 600;
  font-size: 1.1rem;
  margin: 20px 0;
  box-shadow: 0 10px 20px rgba(189, 130, 99, 0.25);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: rgba(255, 255, 255, 0.2);
    transform: rotate(45deg);
    z-index: 1;
    transition: transform 0.6s ease;
    transform-origin: 0 0;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(189, 130, 99, 0.35);
  }
  
  &:hover::before {
    transform: rotate(45deg) translate(80%, 80%);
  }
  
  span {
    position: relative;
    z-index: 2;
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
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 12,
      duration: 0.5
    }
  }
};

const lightboxVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

const contentVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8,
    transition: { duration: 0.2 }
  }
};

// נתוני גלריה
const galleryImages = [
  {
    id: 1,
    src: "/images/gallery1.jpeg",
    title: "תוצאות טיפול פנים",
    description: "תוצאות מרשימות לאחר סדרת טיפולים."
  },
  {
    id: 2,
    src: "/images/gallery2.jpg",
    title: "טיפול אקנה",
    description: "שיפור דרמטי במצב העור בטיפול ממוקד."
  },
  {
    id: 3,
    src: "/images/gallery3.jpeg",
    title: "חידוש עור",
    description: "עור מחודש וזוהר לאחר טיפול מתקדם."
  },
  {
    id: 4,
    src: "/images/gallery4.jpeg",
    title: "תהליך התחדשות",
    description: "תיעוד תהליך השיפור לאורך זמן."
  },
  {
    id: 5,
    src: "/images/gallery5.jpg",
    title: "טיפולי אנטי אייג'ינג",
    description: "מיצוק והצערת העור בטכנולוגיה מתקדמת."
  },
  {
    id: 6,
    src: "/images/gallery6.jpg",
    title: "הסרת כתמים",
    description: "טיפול יעיל בכתמי עור וקמטוטים."
  }
];

// נתוני תמונות קליניקה
const clinicImages = [
  {
    id: 1,
    src: "/images/clinic1.jpeg",
    title: "חדר טיפולים",
    description: "סביבה מפנקת ומרגיעה לטיפולים."
  },
  {
    id: 2,
    src: "/images/clinic2.png",
    title: "אזור המתנה",
    description: "אזור המתנה מעוצב ונעים."
  },
  {
    id: 3,
    src: "/images/clinic3.png",
    title: "ציוד מתקדם",
    description: "טכנולוגיות חדשניות לטיפולי עור."
  },
  {
    id: 4,
    src: "/images/clinic4.png",
    title: "סביבת עבודה",
    description: "סביבה סטרילית ובטוחה לכל הטיפולים."
  },
  {
    id: 5,
    src: "/images/clinic5.png",
    title: "אווירה מרגיעה",
    description: "אווירה נעימה ומרגיעה בקליניקה."
  },
  {
    id: 6,
    src: "/images/clinic6.png",
    title: "חדר פרוצדורות",
    description: "ציוד מתקדם לטיפולים מורכבים."
  }
];

const Gallery = () => {
  // מצבים ושמירה על ערכים
  const [selectedImage, setSelectedImage] = useState(null);
  const [visibleImages, setVisibleImages] = useState(3);
  const [visibleClinicImages, setVisibleClinicImages] = useState(3);
  
  // הפנייה לאלמנטים לצורך אנימציה
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const galleryRef = useRef(null);
  const clinicTitleRef = useRef(null);
  const clinicDescRef = useRef(null);
  const clinicGalleryRef = useRef(null);
  
  // בדיקה האם הגלגלנו לאלמנטים
  const titleInView = useInView(titleRef, { once: true, amount: 0.3 });
  const descInView = useInView(descRef, { once: true, amount: 0.3 });
  const galleryInView = useInView(galleryRef, { once: true, amount: 0.1 });
  const clinicTitleInView = useInView(clinicTitleRef, { once: true, amount: 0.3 });
  const clinicDescInView = useInView(clinicDescRef, { once: true, amount: 0.3 });
  const clinicGalleryInView = useInView(clinicGalleryRef, { once: true, amount: 0.1 });
  
  // בקרי אנימציה
  const controls = useAnimation();
  
  // אפקטים לאנימציה
  useEffect(() => {
    if (titleInView) {
      controls.start('visible');
    }
  }, [controls, titleInView]);
  
  // פתיחת תמונה במודל
  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };
  
  // סגירת המודל
  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };
  
  // ניווט לתמונה הבאה
  const nextImage = () => {
    const currentIndex = selectedImage.id;
    const nextIndex = currentIndex % galleryImages.length + 1;
    setSelectedImage(galleryImages.find(img => img.id === nextIndex) || galleryImages[0]);
  };
  
  // ניווט לתמונה הקודמת
  const prevImage = () => {
    const currentIndex = selectedImage.id;
    const prevIndex = currentIndex > 1 ? currentIndex - 1 : galleryImages.length;
    setSelectedImage(galleryImages.find(img => img.id === prevIndex) || galleryImages[galleryImages.length - 1]);
  };
  
  // טעינת עוד תמונות
  const loadMoreImages = () => {
    setVisibleImages(prev => Math.min(prev + 3, galleryImages.length));
  };
  
  // טעינת עוד תמונות קליניקה
  const loadMoreClinicImages = () => {
    setVisibleClinicImages(prev => Math.min(prev + 3, clinicImages.length));
  };
  
  return (
    <>
      {/* גלריית תוצאות */}
      <GallerySection id="gallery">
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
        
        <SectionTitle
          ref={titleRef}
          variants={fadeInUp}
          initial="hidden"
          animate={titleInView ? 'visible' : 'hidden'}
        >
          <h2>תוצאות מדהימות</h2>
        </SectionTitle>
        
        <SectionDescription
          ref={descRef}
          variants={fadeInUp}
          initial="hidden"
          animate={descInView ? 'visible' : 'hidden'}
        >
          הצצה לתוצאות המדהימות שהשגנו בקליניקה. כל תמונה מייצגת סיפור אישי של לקוחה מרוצה.
        </SectionDescription>
        
        <GalleryGrid
          ref={galleryRef}
          variants={staggerContainer}
          initial="hidden"
          animate={galleryInView ? 'visible' : 'hidden'}
        >
          {galleryImages.slice(0, visibleImages).map((image) => (
            <GalleryItem
              key={image.id}
              variants={itemVariant}
              whileHover={{ y: -5 }}
            >
              <img src={image.src} alt={image.title} />
              <GalleryItemOverlay>
                <GalleryItemTitle>{image.title}</GalleryItemTitle>
                <GalleryItemDescription>{image.description}</GalleryItemDescription>
                <ExpandButton
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openLightbox(image)}
                  aria-label="הגדל תמונה"
                >
                  <FaExpand />
                </ExpandButton>
              </GalleryItemOverlay>
            </GalleryItem>
          ))}
        </GalleryGrid>
        
        {visibleImages < galleryImages.length && (
          <LoadMoreButton
            onClick={loadMoreImages}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            טען עוד תמונות
          </LoadMoreButton>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{ textAlign: 'center' }}
        >
          <ContactButton 
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>לקביעת ייעוץ אישי</span>
          </ContactButton>
        </motion.div>
        
        <InstagramLink
          href="https://www.instagram.com/stories/highlights/18049006831430408/"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <div className="icon">
            <FaInstagram />
          </div>
          <div className="text">
            <h4>שינויים בעור</h4>
            <p>צפי בעוד תוצאות מדהימות בהיילייט האינסטגרם שלנו</p>
          </div>
        </InstagramLink>
        
        {/* גלריית הקליניקה */}
        <ClinicSection>
          <SectionTitle
            ref={clinicTitleRef}
            variants={fadeInUp}
            initial="hidden"
            animate={clinicTitleInView ? 'visible' : 'hidden'}
          >
            <h2>הקליניקה שלי</h2>
          </SectionTitle>
          
          <SectionDescription
            ref={clinicDescRef}
            variants={fadeInUp}
            initial="hidden"
            animate={clinicDescInView ? 'visible' : 'hidden'}
          >
            הציצי לתוך הבית המקצועי שלי, סביבה מפנקת ונעימה המצוידת במיטב הטכנולוגיות.
          </SectionDescription>
          
          <GalleryGrid
            ref={clinicGalleryRef}
            variants={staggerContainer}
            initial="hidden"
            animate={clinicGalleryInView ? 'visible' : 'hidden'}
          >
            {clinicImages.slice(0, visibleClinicImages).map((image) => (
              <GalleryItem
                key={image.id}
                variants={itemVariant}
                whileHover={{ y: -5 }}
              >
                <img src={image.src} alt={image.title} />
                <GalleryItemOverlay>
                  <GalleryItemTitle>{image.title}</GalleryItemTitle>
                  <GalleryItemDescription>{image.description}</GalleryItemDescription>
                  <ExpandButton
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openLightbox(image)}
                    aria-label="הגדל תמונה"
                  >
                    <FaExpand />
                  </ExpandButton>
                </GalleryItemOverlay>
              </GalleryItem>
            ))}
          </GalleryGrid>
          
          {visibleClinicImages < clinicImages.length && (
            <LoadMoreButton
              onClick={loadMoreClinicImages}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              טען עוד תמונות
            </LoadMoreButton>
          )}
          
          <InstagramLink
            href="https://www.instagram.com/stories/highlights/17926057309975928/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="icon">
              <FaInstagram />
            </div>
            <div className="text">
              <h4>הקליניקה שלי</h4>
              <p>לצפייה בסיור וירטואלי מלא בקליניקה בסטורי האינסטגרם</p>
            </div>
          </InstagramLink>
        </ClinicSection>
        
        <Separator>
          <svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
          </svg>
        </Separator>
      </GallerySection>
      
      {/* מודל תצוגת תמונה */}
      <AnimatePresence>
        {selectedImage && (
          <LightboxOverlay
            variants={lightboxVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeLightbox}
          >
            <LightboxContent
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedImage.src} alt={selectedImage.title} />
              <CloseButton onClick={closeLightbox} aria-label="סגור">
                <FaTimes />
              </CloseButton>
              <LightboxControls>
                <LightboxButton onClick={prevImage} aria-label="תמונה קודמת">
                  <FaArrowRight />
                </LightboxButton>
                <LightboxButton onClick={nextImage} aria-label="תמונה הבאה">
                  <FaArrowLeft />
                </LightboxButton>
              </LightboxControls>
            </LightboxContent>
          </LightboxOverlay>
        )}
      </AnimatePresence>
        </>
  );
};

export default Gallery;