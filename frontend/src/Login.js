import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import './Login.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Email and password are required');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/login', { email, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify({ username: response.data.username, email }));
            setUser({ username: response.data.username, email });
            alert('Login successful');
            navigate('/dashboard');
        } catch (error) {
            if (error.response) {
                setError(error.response.data); // แสดงข้อผิดพลาดที่ส่งกลับจากเซิร์ฟเวอร์
            } else {
                setError('Error logging in');
            }
        }
        
    };

    const handleForgetPassword = () => {
        navigate('/forget-password'); // เปลี่ยนเส้นทางไปที่หน้า Forget Password
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group password-container">
                    <label>Password:</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                <button type="submit">Login</button>
                <p className="forget-password" onClick={handleForgetPassword}>
                    Forget Password?
                </p>
            </form>
        </div>
    );
};

export default Login;
