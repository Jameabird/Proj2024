import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
    const [user, setUser] = useState({ username: '', email: '' });
    const [showUpdate, setShowUpdate] = useState(false);
    const [error, setError] = useState('');
    const [updatedUser, setUpdatedUser] = useState({ username: '', email: '' });
    const [inputEmail, setInputEmail] = useState(''); // State สำหรับ input email
    const [isConfirmed, setIsConfirmed] = useState(false); // State สำหรับตรวจสอบการยืนยัน

    // ฟังก์ชันสำหรับค้นหาผู้ใช้จาก email
    const fetchUser = async () => {
        try {
            const response = await axios.get('http://localhost:5000/users', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            // ค้นหาผู้ใช้ตาม email
            const loggedInUser = response.data.find(user => user.email === inputEmail);
            if (loggedInUser) {
                setUser(loggedInUser);
                setUpdatedUser({ username: loggedInUser.username, email: loggedInUser.email });
                setIsConfirmed(true); // ตั้งค่าสถานะยืนยันเป็น true
                setError(''); // ลบข้อความผิดพลาดเมื่อพบผู้ใช้
            } else {
                setError('User not found'); // แสดงข้อความถ้าผู้ใช้ไม่พบ
            }
        } catch (error) {
            console.error('Error fetching user profile', error);
            setError('Error fetching user profile'); // แสดงข้อความถ้ามีข้อผิดพลาดในการดึงข้อมูล
        }
    };

    const handleConfirmClick = () => {
        fetchUser(); // เรียกใช้ฟังก์ชันค้นหาผู้ใช้เมื่อกดปุ่มยืนยัน
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
            await axios.put(`http://localhost:5000/users/${user.id}`, updatedUser, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setUser({ ...user, ...updatedUser });
            setShowUpdate(false);
            setError(''); // ลบข้อความผิดพลาด
        } catch (error) {
            console.error('Error updating user details', error);
            setError('Failed to update details. Please try again.');
        }
    };

    const handleCancelUpdate = () => {
        setShowUpdate(false);
        setUpdatedUser({ username: user.username, email: user.email });
    };

    const handleInputChange = (e) => {
        setInputEmail(e.target.value); // อัพเดต inputEmail
    };

    return (
        <div className="profile-container">
            <h2>User Profile</h2>
            {error && <p className="error-message">{error}</p>}

            {/* ฟอร์มสำหรับกรอก email */}
            <div className="username-input">
                <input
                    type="email" // เปลี่ยนประเภท input เป็น email
                    placeholder="Enter your email"
                    value={inputEmail}
                    onChange={handleInputChange}
                />
                <button onClick={handleConfirmClick}>Confirm</button> {/* ปุ่มยืนยัน */}
            </div>

            {isConfirmed && ( // แสดงข้อมูลโปรไฟล์เมื่อมีการยืนยัน
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
                                required
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={updatedUser.email}
                                onChange={handleUpdateChange}
                                required
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
