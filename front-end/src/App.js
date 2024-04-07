import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CompanyListing from './components/CompanyListing';

import ReviewListing from './components/ReviewListing';
import Navbar from './components/Navbar';

function App() {
  return (

    <Router>
      <Navbar/>
      <Routes> 
        <Route path="/"  element={<CompanyListing/>} />
        <Route path="/reviews" element={<ReviewListing />} />
      </Routes>
    </Router>
  );
}

export default App;
