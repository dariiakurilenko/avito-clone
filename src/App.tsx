import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Header from './components/Header'; 
import Footer from './components/Footer'; 
import CardPage from './pages/card-page/CardPage';
import theme from './theme'; 

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Routes>
          <Route path="*" element={<CardPage />} />
          <Route path="/list" element={<CardPage />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
