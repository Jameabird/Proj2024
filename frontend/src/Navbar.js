import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from './UserContext'; // นำเข้า UserContext
import './Navbar.css';

const Navbar = () => {
    const { user, setUser } = useContext(UserContext); // ดึง user และ setUser จาก context
    const navigate = useNavigate();
    const location = useLocation(); // ดึง path ปัจจุบัน

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null); // ลบสถานะ user ออกจาก context
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="nav-left">
                {/* ตรวจสอบ path ถ้าอยู่ที่ /dashboard ให้แสดง Dashboard ถ้าไม่ใช่ให้แสดง Home */}
                {location.pathname === '/dashboard' ? (
                    <Link to="/dashboard">Dashboard</Link>
                ) : (
                    <Link to="/">Home</Link>
                )}
            </div>
            <div className="nav-right">
                {user ? (
                    <>
                        <span>{user.username}</span> {/* แสดงชื่อผู้ใช้ที่ล็อกอิน */}
                        <button onClick={handleLogout}>Logout</button> {/* ปุ่ม Logout */}
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <span>/</span>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
