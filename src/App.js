import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';

// ייבוא דף הבית
import Home from './pages/Home';

const NotFound = () => {
  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '20px',
      textAlign: 'center'
    }}>
      <h1>404 - הדף לא נמצא</h1>
      <p>נראה שהדף שחיפשת לא קיים.</p>
      <a href="/" style={{
        display: 'inline-block',
        margin: '20px 0',
        padding: '10px 20px',
        background: 'var(--color-accent)',
        color: 'white',
        borderRadius: '5px',
        textDecoration: 'none'
      }}>חזרה לדף הבית</a>
    </div>
  );
};

function App() {
  return (
    <Router>
      <GlobalStyles />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;