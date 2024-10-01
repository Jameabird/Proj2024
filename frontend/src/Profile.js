import React, { useContext } from 'react';
import { UserContext } from './UserContext';
import { Link } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
    const { user } = useContext(UserContext);

    return (
        <div className="profile-container">
            <h2>User Profile</h2>
            {user ? (
                <div>
                    <p><strong>Username:</strong> {user.username}</p>
                    <Link to="/dashboard">
                        <button className="profile-button">Back to Dashboard</button>
                    </Link>
                </div>
            ) : (
                <p>No user information available.</p>
            )}
        </div>
    );
};

export default Profile;
