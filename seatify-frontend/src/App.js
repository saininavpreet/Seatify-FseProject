import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
// import BookingSummary from './pages/BookingSummary'; ← ❌ remove this line
import ConfirmationPage from './pages/ConfirmationPage';
import MyBookings from './pages/MyBookings';
import SummaryPage from './pages/SummaryPage';
import MovieList from './pages/MovieList';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';





function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book/:movieId" element={<BookingPage />} />
          <Route path="/summary" element={<SummaryPage />} /> {/* ✅ Use this for final summary */}
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/movies" element={<MovieList />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
      </Routes>

    </Router>
  );
}

export default App;