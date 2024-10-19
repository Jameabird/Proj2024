import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // นำเข้าไอคอนตา

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // เพิ่ม state สำหรับแสดงรหัสผ่าน
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ตรวจสอบว่าไม่ว่างเปล่า
        if (!username || !email || !password) {
            setError('All fields are required');
            return;
        }

        // ตรวจสอบความปลอดภัยของรหัสผ่าน (ต้องมีตัวพิมพ์ใหญ่ ตัวพิมพ์เล็ก ตัวอักษรพิเศษ และมีความยาวอย่างน้อย 7 ตัว)
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{7,}$/;
        if (!passwordRegex.test(password)) {
            setError('Password must be at least 7 characters long, include both uppercase and lowercase letters, and contain at least one special character (!@#$%^&*)');
            return;
        }

        try {
            await axios.post('http://localhost:5000/register', { username, email, password });
            alert('User registered successfully');
            setUsername('');
            setEmail('');
            setPassword('');
            setError('');
            navigate('/login');
        } catch (error) {
            setError('Error registering user');
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
                <div className="form-group password-container"> {/* เพิ่ม class password-container */}
                    <label>Password:</label>
                    <input
                        type={showPassword ? 'text' : 'password'} // แสดง/ซ่อนรหัสผ่าน
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />} {/* เปลี่ยนไอคอนตาม state */}
                    </span>
                </div>
                <button type="submit">Register</button>
            </form>
            <p className="login-link">
                มี account อยู่แล้ว? <Link to="/login">เข้าสู่ระบบที่นี่</Link>
            </p>
        </div>
    );
};

export default Register;
