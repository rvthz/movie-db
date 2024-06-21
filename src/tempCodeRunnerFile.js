import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddMovie from './pages/AddMovie';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import MovieDetails from './pages/MovieDetails';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddMovie />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/details/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
