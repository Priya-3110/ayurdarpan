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
import Recipe from './Pages/Recipe';
import DoshaQuiz from './Pages/DoshaQuiz';

// ✅ IMPORT CHATBOT
import FloatingChatbot from './components/FloatingChatbot';

const App = () => {
  return (
    <Router>

      {/* 🔥 ROUTES */}
      <Routes>

        {/* Home route */}
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

        {/* Medicines */}
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

        {/* Remedies */}
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

        {/* Login */}
        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <Login />
            </>
          }
        />

        {/* Cart */}
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

        {/* Checkout */}
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

        {/* Yoga */}
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

        {/* Quiz */}
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

        {/* Recipes */}
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

      {/* 🔥 GLOBAL CHATBOT (VISIBLE EVERYWHERE) */}
      <FloatingChatbot />

    </Router>
  );
};

export default App;