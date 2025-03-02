import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --color-main: #F2D4C4;       /* ורוד אפרסק עדין */
    --color-accent: #BD8263;     /* חום-ורדרד חם */
    --color-bg: #FEF8F6;         /* רקע בהיר */
    --color-text: #4A3F3A;       /* טקסט (חום-אפור כהה) */
    --color-emphasis: #3E2F2C;   /* כותרות / טקסט מודגש */
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: "Assistant", sans-serif;
    background-color: var(--color-bg);
    color: var(--color-text);
    line-height: 1.6;
    direction: rtl;
    padding-bottom: 130px;
  }

  h1, h2, h3 {
    font-family: "Poppins", sans-serif;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: var(--color-emphasis);
    text-align: center;
    margin-bottom: 20px;
    position: relative;
  }

  /* עיצוב ייחודי ל-h1 */
  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--color-accent);
    text-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  }

  /* עיצוב ייחודי ל-h2 */
  h2 {
    font-size: 2rem;
    font-weight: 600;
    color: var(--color-emphasis);
  }

  /* עיצוב ייחודי ל-h3 */
  h3 {
    font-size: 1.5rem;
    font-weight: 500;
    color: var(--color-emphasis);
  }

  p {
    font-family: "Assistant", sans-serif;
    font-size: 1.1rem;
    line-height: 1.8;
    color: var(--color-text);
    margin-bottom: 15px;
    background: rgba(251, 239, 233, 0.1);
    padding: 10px 15px;
    border-radius: 8px;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  /* Media Queries */
  @media (max-width: 768px) {
    h1 {
      font-size: 1.8rem;
    }
    
    h2 {
      font-size: 1.6rem;
    }
    
    h3 {
      font-size: 1.3rem;
    }
    
    p {
      font-size: 1rem;
    }
  }
`;

export default GlobalStyles;