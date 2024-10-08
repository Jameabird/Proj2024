import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import UserList from './UserList'; 
import About from './About';
import Profile from './Profile';
import { UserProvider } from './UserContext';
import './App.css';

const App = () => {
    return (
        <UserProvider>
            <Router>
                <div className="app-container">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/users" element={<UserList />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </div>
            </Router>
        </UserProvider>
    );
};

export default App;
