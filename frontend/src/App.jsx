import React from 'react';
import Layout from './components/Layout/Layout';
import HomePage from './components/pages/HomePage';
import NotFound from './components/pages/NotFound.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <>
      
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<HomePage />} />
           
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>


    </>
  );
}

export default App;
