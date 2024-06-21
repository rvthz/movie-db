import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import AddMovie from './pages/AddMovie';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Footer from './components/Footer';
import MovieDetails from './pages/MovieDetails';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

    useEffect(() => {
        const checkLoginStatus = () => {
            setIsLoggedIn(!!localStorage.getItem('token'));
        };

        checkLoginStatus();
        window.addEventListener('storage', checkLoginStatus);

        return () => {
            window.removeEventListener('storage', checkLoginStatus);
        };
    }, []);

    return (
        <div className="App" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <div className="container" style={{ paddingTop: '5px', paddingBottom: '20px', backgroundColor: '#d3d3d3', flex: "1" }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/addmovie" element={<AddMovie />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/signin" element={<SignIn setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/details/:id" element={<MovieDetails />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default App;
