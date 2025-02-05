import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import LinkForm from './components/LinkForm/LinkForm';
import LinkResult from './components/LinkResult/LinkResult';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LinkForm />} />
        <Route path="/result" element={<LinkResult />} />
      </Routes>
    </Router>
  );
}

export default App;
