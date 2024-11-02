import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleForgetPassword = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/forget-password', { email });
            alert('Reset code sent to your email.');
            navigate('/reset-password');
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data); // แสดงข้อผิดพลาดที่ส่งกลับจากเซิร์ฟเวอร์
            } else {
                setMessage('Error sending reset code');
            }
        }
    };
    

    return (
        <div className="auth-container">
            <h2>Forget Password</h2>
            {message && <p className="error-message">{message}</p>}
            <form onSubmit={handleForgetPassword}>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Send Reset Code</button>
            </form>
        </div>
    );
};

export default ForgetPassword;
