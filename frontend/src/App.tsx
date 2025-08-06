import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Main Site Components
import Layout from './components/Layout'; // Your user-facing Layout with Navigation/Footer
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Services from './pages/Services';
import Pricing from './pages/Pricing';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import Terms from './pages/Terms'; 


// Standalone Page Components
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        {/* --- Group 1: Main User-Facing Site --- */}
        {/* All routes inside here will have the main Navbar and Footer */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/services" element={<Services />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/terms" element={<Terms />} /> 

        </Route>

        {/* --- Group 2: Standalone Pages --- */}
        {/* These routes do NOT have the main Layout. They are their own pages. */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;