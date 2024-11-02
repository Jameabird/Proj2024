import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [resetCode, setResetCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false); // state สำหรับแสดงรหัสผ่านใหม่
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // state สำหรับแสดงการยืนยันรหัสผ่าน
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{7,}$/;
        if (!passwordRegex.test(newPassword)) {
            setError('Password must be at least 7 characters long, include both uppercase and lowercase letters, and contain at least one special character (!@#$%^&*)');
            return;
        }

        try {
            await axios.post('http://localhost:5000/reset-password', { email, resetCode, newPassword });
            alert('Password has been reset successfully');
            navigate('/login');
        } catch (error) {
            if (error.response) {
                setError(error.response.data);
            } else {
                setError('Invalid reset code or other error');
            }
        }
    };

    return (
        <div className="auth-container">
            <h2>Reset Password</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleResetPassword}>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Reset Code:</label>
                    <input
                        type="text"
                        value={resetCode}
                        onChange={(e) => setResetCode(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>New Password:</label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type={showNewPassword ? 'text' : 'password'}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <span
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                cursor: 'pointer'
                            }}
                        >
                            {showNewPassword ? <FaEye /> : <FaEyeSlash />}
                        </span>
                    </div>
                </div>
                <div className="form-group">
                    <label>Confirm Password:</label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <span
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                cursor: 'pointer'
                            }}
                        >
                            {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                        </span>
                    </div>
                </div>
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;
