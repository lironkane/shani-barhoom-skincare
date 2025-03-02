import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FaQuoteRight, FaStar, FaPhone, FaInstagram, FaWhatsapp } from 'react-icons/fa';

// מיכל כללי לסקשן
const TestimonialsSection = styled.section`
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

// מיכל כרטיסיות המלצות - עיצוב מסוג Tabs
const TestimonialTabs = styled.div`
  position: relative;
  margin-bottom: 60px;
`;

// ניווט הטאבים (טיפולים)
const TabsNav = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 30px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 6px;
    margin-bottom: 25px;
  }
`;

// כפתור טאב
const TabButton = styled.button`
  padding: 10px 20px;
  background: ${props => props.active ? '#BD8263' : 'rgba(242, 212, 196, 0.2)'};
  color: ${props => props.active ? '#fff' : '#3E2F2C'};
  border: 1px solid ${props => props.active ? '#BD8263' : 'rgba(242, 212, 196, 0.5)'};
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? '#BD8263' : 'rgba(242, 212, 196, 0.4)'};
  }
  
  @media (max-width: 768px) {
    padding: 8px 15px;
    font-size: 0.8rem;
  }
`;

// מיכל לתוכן המלצות
const TestimonialsContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

// כרטיס המלצה בודד
const TestimonialCard = styled(motion.div)`
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  padding: 30px;
  position: relative;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(242, 212, 196, 0.3);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(to right, #F2D4C4, #BD8263);
  }
  
  @media (max-width: 768px) {
    padding: 25px;
  }
`;

// אייקון ציטוט
const QuoteIcon = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  color: rgba(242, 212, 196, 0.3);
  font-size: 2.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

// ראש הכרטיס - פרטי לקוחה
const TestimonialHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

// תמונת פרופיל (אופציונלית)
const ProfileImage = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #F2D4C4, #BD8263);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 15px;
  flex-shrink: 0;
  font-size: 1.5rem;
  color: white;
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
  }
`;

// פרטי לקוחה
const ClientDetails = styled.div`
  flex-grow: 1;
  
  h4 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 5px;
    color: #3E2F2C;
  }
  
  .location {
    font-size: 0.9rem;
    color: #666;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  
  @media (max-width: 768px) {
    h4 {
      font-size: 1rem;
    }
    
    .location {
      font-size: 0.8rem;
    }
  }
`;

// דירוג כוכבים
const RatingStars = styled.div`
  display: flex;
  gap: 2px;
  color: #FFD700;
  font-size: 1rem;
  margin-top: 5px;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

// תוכן ההמלצה
const TestimonialContent = styled.div`
  flex-grow: 1;
  
  .text {
    font-size: 1rem;
    line-height: 1.7;
    color: #4A3F3A;
    margin-bottom: 20px;
    font-style: italic;
    position: relative;
    
    &::after {
      content: '';
      display: block;
      width: 40%;
      height: 1px;
      background: rgba(0, 0, 0, 0.1);
      margin-top: 15px;
    }
  }
  
  .treatment-type {
    font-size: 0.9rem;
    background: rgba(242, 212, 196, 0.2);
    color: #3E2F2C;
    padding: 6px 14px;
    border-radius: 20px;
    display: inline-block;
    margin-bottom: 15px;
  }
  
  .date {
    font-size: 0.85rem;
    color: #777;
    margin-top: auto;
  }
  
  @media (max-width: 768px) {
    .text {
      font-size: 0.95rem;
    }
    
    .treatment-type {
      font-size: 0.85rem;
    }
  }
`;

// כפתור יצירת קשר
const ContactButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 30px;
  background: #3E2F2C;
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: fit-content;
  margin: 20px auto 0;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 10px 25px;
  }
`;

// אפשרויות התקשרות
const ContactOptions = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
  margin-bottom: 40px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 15px;
  }
`;

// כפתור אפשרות התקשרות
const ContactOption = styled(motion.a)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 15px 25px;
  background: #fff;
  color: #3E2F2C;
  text-decoration: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(242, 212, 196, 0.3);
  min-width: 150px;
  
  .icon {
    font-size: 1.5rem;
    color: ${props => props.iconColor || '#BD8263'};
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 768px) {
    padding: 12px 20px;
    min-width: 140px;
    
    .icon {
      font-size: 1.3rem;
    }
  }
`;

// קישור לאינסטגרם
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
  
  @media (max-width: 768px) {
    padding: 12px 20px;
    
    .icon {
      font-size: 1.8rem;
    }
    
    .text {
      h4 {
        font-size: 1.1rem;
      }
    }
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
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
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

// הגדרת טיפולים
const treatmentCategories = [
  { id: 'all', name: 'כל ההמלצות' },
  { id: 'acne', name: 'טיפולי אקנה' },
  { id: 'antiaging', name: 'אנטי אייג׳ינג' },
  { id: 'facial', name: 'טיפולי פנים' },
  { id: 'laser', name: 'הסרת שיער' }
];

// מידע המלצות - מידע מפורט יותר עם המלצות אותנטיות יותר
const testimonials = [
  {
    id: 1,
    name: 'מיכל בן צבי',
    location: 'הוד השרון',
    initial: 'מ',
    rating: 5,
    content: 'התחלתי סדרת טיפולים לפני כחצי שנה עקב אקנה עקשנית שסבלתי ממנה שנים. שני יצרה תוכנית מותאמת אישית עבורי וכבר אחרי שני טיפולים ראיתי שיפור משמעותי. היום העור שלי חלק, בריא ונקי וזה שינה לי את הביטחון. ממליצה בחום!',
    treatment: 'טיפול באקנה',
    categories: ['acne', 'facial'],
    date: 'מאי, 2023'
  },
  {
    id: 2,
    name: 'לימור גולדשטיין',
    location: 'כפר סבא',
    initial: 'ל',
    rating: 5,
    content: 'לאחר לידה ראשונה העור שלי היה במצב נוראי עם פיגמנטציה והרבה כתמים. הגעתי כמעט מיואשת לשני, והיא ידעה בדיוק איך לטפל בעור שלי. עשיתי סדרת טיפולים משולבים והתוצאות פשוט מדהימות. העור שלי חזר להיות זוהר ואחיד. שני היא פשוט קוסמת!',
    treatment: 'טיפול פנים מתקדם',
    categories: ['facial'],
    date: 'ינואר, 2024'
  },
  {
    id: 3,
    name: 'יעל אדרי',
    location: 'רעננה',
    initial: 'י',
    rating: 5,
    content: 'כבר שנתיים שאני עושה טיפולי הסרת שיער בלייזר אצל שני, והתוצאות מדהימות! אין יותר צורך בגילוח או שעווה, הלייזר שלה לא כואב בכלל וכל טיפול בול במטרה. האווירה בקליניקה נעימה והשירות תמיד עם חיוך ומקצועיות. לא תמצאו יותר טובה ממנה!',
    treatment: 'הסרת שיער בלייזר',
    categories: ['laser'],
    date: 'פברואר, 2024'
  },
  {
    id: 4,
    name: 'נועה פרידמן',
    location: 'הוד השרון',
    initial: 'נ',
    rating: 5,
    content: 'בגיל 45 התחלתי לחפש טיפולים לא פולשניים לטיפול בסימני הגיל. הגעתי לשני דרך המלצה של חברה והבנתי מהרגע הראשון שהגעתי למקום הנכון. היא מקצועית מאוד, מבינה את הצרכים של העור ובעיקר - לא דוחפת טיפולים מיותרים. העור שלי נראה חי וצעיר יותר, ואני מקבלת המון מחמאות.',
    treatment: 'אנטי אייג׳ינג',
    categories: ['antiaging', 'facial'],
    date: 'נובמבר, 2023'
  },
  {
    id: 5,
    name: 'עדי לוינסון',
    location: 'רמת השרון',
    initial: 'ע',
    rating: 5,
    content: 'סבלתי מאקנה הורמונלית בעיקר באזור הסנטר והלחיים, וניסיתי כל כך הרבה מוצרים וטיפולים. שני השקיעה בי זמן רב באבחון הבעיה, והיא יצרה עבורי שילוב של טיפולים שממש עשה את ההבדל. היא מעבר לקוסמטיקאית, היא מבינה ברפואת עור ויודעת בדיוק מה העור צריך. מומלצת בחום!',
    treatment: 'טיפול באקנה הורמונלית',
    categories: ['acne'],
    date: 'מרץ, 2024'
  },
  {
    id: 6,
    name: 'שרון ויצמן',
    location: 'כפר סבא',
    initial: 'ש',
    rating: 5,
    content: 'לאחר שנים של לכסות את הפנים באיפור כבד בגלל כתמים וצלקות, החלטתי ללכת לשני. כבר אחרי 3 טיפולים ראיתי שינוי משמעותי. היום, אחרי 8 טיפולים, אני יוצאת מהבית עם מינימום איפור וביטחון מלא. הטיפולים אצלה תמיד נעימים והקליניקה נקייה ומזמינה. שני היא מקצוענית אמיתית!',
    treatment: 'טיפול בכתמי עור',
    categories: ['facial'],
    date: 'דצמבר, 2023'
  },
  {
    id: 7,
    name: 'אורית כהן',
    location: 'הרצליה',
    initial: 'א',
    rating: 5,
    content: 'התחלתי טיפולי אנטי אייג׳ינג בגיל 50 כמתנה לעצמי, וההחלטה לבחור בשני הייתה מושלמת. היא משלבת טכנולוגיות מתקדמות עם מגע אישי ופנים קורנות. התוצאות נראות טבעיות ולא מוגזמות - בדיוק מה שרציתי. בנוסף, הקליניקה שלה מפנקת והטיפולים הם ממש חוויה.',
    treatment: 'טיפולי אנטי אייג׳ינג',
    categories: ['antiaging'],
    date: 'אפריל, 2024'
  },
  {
    id: 8,
    name: 'דנית אברהם',
    location: 'רעננה',
    initial: 'ד',
    rating: 5,
    content: 'אחרי שנים של גילוח יומיומי וסבל משיער לא רצוי, לא האמנתי שיש פתרון באמת. החלטתי לנסות הסרת שיער בלייזר ולא יכולתי לבחור טוב יותר משני. היא רגישה, קשובה והטיפולים אצלה יעילים בצורה מדהימה. אני כבר אחרי 5 טיפולים והעור שלי חלק לגמרי. התוצאות ארוכות טווח באמת!',
    treatment: 'הסרת שיער בלייזר',
    categories: ['laser'],
    date: 'ינואר, 2024'
  }
];

const Testimonials = () => {
  // מצבים ושמירה על ערכים
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredTestimonials, setFilteredTestimonials] = useState(testimonials);
  
  // הפנייה לאלמנטים לצורך אנימציה
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const testimonialsRef = useRef(null);
  
  // בדיקה האם הגלגלנו לאלמנטים
  const titleInView = useInView(titleRef, { once: true, amount: 0.3 });
  const descInView = useInView(descRef, { once: true, amount: 0.3 });
  const testimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.1 });
  
  // בקרי אנימציה
  const controls = useAnimation();
  
  // אפקטים לאנימציה
  useEffect(() => {
    if (titleInView) {
      controls.start('visible');
    }
  }, [controls, titleInView]);
  
  // סינון המלצות לפי קטגוריה
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredTestimonials(testimonials);
    } else {
      setFilteredTestimonials(
        testimonials.filter(item => item.categories.includes(activeCategory))
      );
    }
  }, [activeCategory]);
  
  // בניית כוכבים לדירוג
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar key={index} color={index < rating ? '#FFD700' : '#e4e5e9'} />
    ));
  };
  
  return (
    <TestimonialsSection id="testimonials">
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
        <h2>לקוחות ממליצות</h2>
      </SectionTitle>
      
      <SectionDescription
        ref={descRef}
        variants={fadeInUp}
        initial="hidden"
        animate={descInView ? 'visible' : 'hidden'}
      >
        לא צריך לסמוך רק על המילה שלנו - הנה כמה מהחוויות האמיתיות שלקוחותינו חלקו.
      </SectionDescription>
      
      <TestimonialTabs>
        <TabsNav>
          {treatmentCategories.map((category) => (
            <TabButton
              key={category.id}
              active={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </TabButton>
          ))}
        </TabsNav>
        
        <TestimonialsContainer
          ref={testimonialsRef}
          variants={staggerContainer}
          initial="hidden"
          animate={testimonialsInView ? 'visible' : 'hidden'}
        >
          {filteredTestimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              variants={cardVariant}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <QuoteIcon>
                <FaQuoteRight />
              </QuoteIcon>
              
              <TestimonialHeader>
                <ProfileImage>{testimonial.initial}</ProfileImage>
                <ClientDetails>
                  <h4>{testimonial.name}</h4>
                  <div className="location">{testimonial.location}</div>
                  <RatingStars>
                    {renderStars(testimonial.rating)}
                  </RatingStars>
                </ClientDetails>
              </TestimonialHeader>
              
              <TestimonialContent>
                <div className="treatment-type">{testimonial.treatment}</div>
                <div className="text">{testimonial.content}</div>
                <div className="date">{testimonial.date}</div>
              </TestimonialContent>
            </TestimonialCard>
          ))}
        </TestimonialsContainer>
      </TestimonialTabs>
      
      <ContactOptions>
        <ContactOption 
          href="tel:+972506863593"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          iconColor="#3E2F2C"
        >
          <div className="icon">
            <FaPhone />
          </div>
          <span>התקשרי עכשיו</span>
        </ContactOption>
        
        <ContactOption 
          href="https://api.whatsapp.com/send?phone=972506863593"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          iconColor="#25D366"
        >
          <div className="icon">
            <FaWhatsapp />
          </div>
          <span>שלחי הודעה</span>
        </ContactOption>
        
        <ContactOption 
          href="https://instagram.com/shanibarhoom_skincare"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          iconColor="#E1306C"
        >
          <div className="icon">
            <FaInstagram />
          </div>
          <span>עקבי אחרי</span>
        </ContactOption>
      </ContactOptions>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        style={{ textAlign: 'center' }}
      >
        <ContactButton 
          href="tel:+972506863593"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <FaPhone style={{ marginLeft: '8px' }} /> התקשרי עכשיו ליעוץ ללא עלות
        </ContactButton>
      </motion.div>
      
      <InstagramLink
        href="https://www.instagram.com/stories/highlights/17943398857726206/"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <div className="icon">
          <FaInstagram />
        </div>
        <div className="text">
          <h4>לקוחות ממליצות</h4>
          <p>לצפייה בעוד המלצות אמיתיות בסטורי האינסטגרם</p>
        </div>
      </InstagramLink>
      
      <Separator>
        <svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
        </svg>
      </Separator>
    </TestimonialsSection>
  );
};

export default Testimonials;