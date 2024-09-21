import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // นำเข้า Link
import './Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // ใช้เพื่อแสดงข้อความผิดพลาด

    const navigate = useNavigate(); // ใช้ useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ตรวจสอบว่าไม่ว่างเปล่า
        if (!username || !email || !password) {
            setError('All fields are required');
            return;
        }

        try {
            await axios.post('http://localhost:5000/register', { username, email, password });
            alert('User registered successfully');
            // ล้างข้อมูลหลังจากสมัครสมาชิกสำเร็จ
            setUsername('');
            setEmail('');
            setPassword('');
            setError('');
            // นำทางไปยังหน้า Login
            navigate('/login');
        } catch (error) {
            setError('Error registering user'); // ตั้งค่าข้อความผิดพลาด
        }
    };

    return (
        <div className="auth-container">
            <h2>Register</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Register</button>
            </form>

            {/* เพิ่มข้อความและลิงก์ไปที่หน้า Login */}
            <p className="login-link">
                มี account อยู่แล้ว? <Link to="/login">เข้าสู่ระบบที่นี่</Link>
            </p>
        </div>
    );
};

export default Register;
