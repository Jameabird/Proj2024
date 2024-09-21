import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <h1>Welcome to My App</h1>
            <p>A platform to manage your users and more!</p>
            <Link to="/register">
                <button className="get-started-button">Get Started</button>
            </Link>
        </div>
    );
};

export default Home;
