import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import './Login.css'; 
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // นำเข้าไอคอนตา

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false); // เพิ่ม state สำหรับแสดงรหัสผ่าน
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
            localStorage.setItem('user', JSON.stringify({ username: response.data.username, email: response.data.email }));
            setUser({ username: response.data.username, email: response.data.email });
            alert('Login successful');
            navigate('/dashboard');
        } catch (error) {
            setError('Error logging in');
        }
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
                <div className="form-group password-container"> {/* เพิ่ม class password-container */}
                    <label>Password:</label>
                    <input
                        type={showPassword ? 'text' : 'password'} // เปลี่ยนประเภทของ input ตาม state
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />} {/* แสดงไอคอนตาม state */}
                    </span>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
