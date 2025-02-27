import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Header from './components/Header'; 
import Footer from './components/Footer'; 
import CardPage from './pages/card-page/CardPage';
import theme from './theme'; 
import ProductPage from './pages/product-page/ProductPage';
import NewAdPage from './pages/new-ad-page/NewAdPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/list" />} />
          <Route path="/list" element={<CardPage />} />
          <Route path="/form" element={<NewAdPage />} />
          <Route path="/item/:id" element={<ProductPage />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
