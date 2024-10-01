import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from './UserContext';
import './Navbar.css';

const Navbar = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <nav className="navbar">
            <div className="nav-left">
                {location.pathname === '/dashboard' ? (
                    <Link to="/dashboard">Dashboard</Link>
                ) : (
                    <Link to="/">Home</Link>
                )}
                <Link to="/about">About</Link>
            </div>
            <div className="nav-right">
                {user ? (
                    <div className="user-menu" onClick={toggleDropdown}>
                        <span>{user.username}</span>
                        {showDropdown && (
                            <div className="dropdown-menu">
                                <Link to="/profile">
                                    <button>Profile</button>
                                </Link>
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <span>/</span>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
