import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Banners from './components/Banners';
import Statistics from './components/Statistics';
import Footer from './components/Footer';
import Medicines from './Pages/Medicines';
import Cart from './Pages/Cart';
import HomeRemedies from './Pages/HomeRemedies';
import Login from './components/Login';
import Checkout from './Pages/Checkout'; 
import YogaPoses from './Pages/YogaPoses'; 
import Recipe from './Pages/Recipe'; // ✅ Import Checkout
import DoshaQuiz from './Pages/DoshaQuiz'; 

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Home route with all components */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <HeroSection />
              <Banners />
              <Statistics />
              <Footer />
            </>
          }
        />

        {/* Medicines route */}
        <Route
          path="/medicines"
          element={
            <>
              <Navbar />
              <Medicines />
              <Footer />
            </>
          }
        />

        {/* Home Remedies route */}
        <Route
          path="/remedies"
          element={
            <>
              <Navbar />
              <HomeRemedies />
              <Footer />
            </>
          }
        />

        {/* Login route */}
        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <Login />
            </>
          }
        />

        {/* Cart route */}
        <Route
          path="/cart"
          element={
            <>
              <Navbar />
              <Cart />
              <Footer />
            </>
          }
        />

        {/* ✅ Checkout route */}
        <Route
          path="/checkout"
          element={
            <>
              <Navbar />
              <Checkout />
              <Footer />
            </>
          }
        />
          <Route
          path="/yoga"
          element={
            <>
              <Navbar />
              <YogaPoses />
              <Footer />
            </>
          }
        />
        {/* Dosha Quiz route */}
        <Route
          path="/quiz"
          element={
            <>
              <Navbar />
              <DoshaQuiz />
              <Footer />
            </>
          }
        />

          <Route
          path="/recipes"
          element={
            <>
              <Navbar />
              <Recipe />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
