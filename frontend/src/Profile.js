import React, { useState, useContext } from 'react';
import axios from 'axios';
import './Profile.css';
import { UserContext } from './UserContext';

const Profile = () => {
    const { setUser } = useContext(UserContext); // ใช้ Context
    const [user, setUserProfile] = useState({ username: '', email: '' });
    const [showUpdate, setShowUpdate] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(true); 
    const [error, setError] = useState('');
    const [updatedUser, setUpdatedUser] = useState({ username: '', email: '' });
    const [inputEmail, setInputEmail] = useState('');
    const [isConfirmed, setIsConfirmed] = useState(false);

    const fetchUser = async () => {
        try {
            const response = await axios.get('http://localhost:5000/users', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            const loggedInUser = response.data.find(user => user.email === inputEmail);
            if (loggedInUser) {
                setUserProfile(loggedInUser);
                setUpdatedUser({ username: loggedInUser.username, email: loggedInUser.email });
                setIsConfirmed(true);
                setShowEmailModal(false);
                setError('');
            } else {
                setError('User not found');
            }
        } catch (error) {
            console.error('Error fetching user profile', error);
            setError('Error fetching user profile');
        }
    };

    const handleConfirmClick = () => {
        fetchUser();
    };

    const handleUpdateClick = () => {
        setShowUpdate(true);
    };

    const handleUpdateChange = (e) => {
        setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        try {
            const updateData = {};
            if (updatedUser.username) updateData.username = updatedUser.username; // ถ้ามีการเปลี่ยน username
            if (updatedUser.email) updateData.email = updatedUser.email; // ถ้ามีการเปลี่ยน email

            await axios.put(`http://localhost:5000/users/${user.id}`, updateData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            // อัปเดต user profile และ context
            setUserProfile(prev => ({ ...prev, ...updateData }));
            setUser(prev => ({ ...prev, username: updatedUser.username || prev.username })); // อัปเดต Context ด้วย username ใหม่
            setShowUpdate(false);
            setError('');
        } catch (error) {
            console.error('Error updating user details', error);
            setError('Failed to update details. Please try again.');
        }
    };

    const handleCancelUpdate = () => {
        setShowUpdate(false);
        setUpdatedUser({ username: '', email: '' }); // รีเซ็ตค่า
    };

    const handleInputChange = (e) => {
        setInputEmail(e.target.value);
    };

    return (
        <div className="profile-container">
            <h2>User Profile</h2>
            {error && <p className="error-message">{error}</p>}

            {showEmailModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Confirm with Your Email</h3>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={inputEmail}
                            onChange={handleInputChange}
                        />
                        <button onClick={handleConfirmClick}>Confirm</button>
                    </div>
                </div>
            )}

            {isConfirmed && (
                <div className="profile-details">
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <button onClick={handleUpdateClick}>Change Details</button>
                </div>
            )}

            {showUpdate && (
                <div className="confirm-dialog">
                    <h3>Update Details</h3>
                    <form onSubmit={handleUpdateSubmit}>
                        <label>
                            Username:
                            <input
                                type="text"
                                name="username"
                                value={updatedUser.username}
                                onChange={handleUpdateChange}
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={updatedUser.email}
                                onChange={handleUpdateChange}
                            />
                        </label>
                        <button type="submit">Update</button>
                        <button type="button" onClick={handleCancelUpdate}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Profile;
