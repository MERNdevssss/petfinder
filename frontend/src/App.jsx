import React from 'react';
import Layout from './components/Layout/Layout';
import HomePage from './components/pages/HomePage';
import NotFound from './components/pages/NotFound.jsx';
import Navbar from './components/Layout/Navbar';
import PetSuggest from './components/pages/PetSuggest';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (

    <div className="bg-red-100 min-h-screen">
      <Router> 
      <div >
        <Navbar />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} /> 
            <Route path="/suggest" element={<PetSuggest />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </Router>
    </div>
    
  );
}

export default App;
