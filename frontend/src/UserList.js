import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserList.css';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showUpdate, setShowUpdate] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({ id: null, username: '', email: '' });
    const [updatePassword, setUpdatePassword] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/users', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users', error);
            }
        };

        fetchUsers();
    }, []);

    const handleDeleteClick = (userId) => {
        setUserIdToDelete(userId);
        setPassword(''); // รีเซ็ตค่าของรหัสผ่าน
        setShowConfirm(true);
    };

    const handleConfirmDelete = async () => {
        if (password !== 'admin123') {
            setError('Incorrect password');
            return;
        }

        try {
            await axios.delete(`http://localhost:5000/users/${userIdToDelete}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setUsers(users.filter(user => user.id !== userIdToDelete));
            setShowConfirm(false);
            setPassword(''); // รีเซ็ตค่าของรหัสผ่าน
            setError('');
        } catch (error) {
            console.error('Error deleting user', error);
        }
    };

    const handleCancel = () => {
        setShowConfirm(false);
        setPassword(''); // รีเซ็ตค่าของรหัสผ่าน
        setError('');
    };

    const handleUpdateClick = (user) => {
        setUpdatedUser({ id: user.id, username: user.username, email: user.email });
        setUpdatePassword(''); // รีเซ็ตค่าของรหัสผ่านสำหรับการอัปเดต
        setShowUpdate(true);
    };

    const handleUpdateChange = (e) => {
        setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        if (updatePassword !== 'admin123') {
            setError('Incorrect password');
            return;
        }

        try {
            await axios.put(`http://localhost:5000/users/${updatedUser.id}`, {
                username: updatedUser.username,
                email: updatedUser.email
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
            setShowUpdate(false);
            setUpdatedUser({ id: null, username: '', email: '' });
            setUpdatePassword(''); // รีเซ็ตค่าของรหัสผ่าน
            setError('');
        } catch (error) {
            console.error('Error updating user', error);
        }
    };

    const handleCancelUpdate = () => {
        setShowUpdate(false);
        setUpdatedUser({ id: null, username: '', email: '' });
        setUpdatePassword(''); // รีเซ็ตค่าของรหัสผ่าน
    };

    return (
        <div className="userlist-container">
            <h2>User List</h2>
            {error && <p className="error-message">{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => handleUpdateClick(user)}>Update</button>
                                <button className="delete-button" onClick={() => handleDeleteClick(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showConfirm && (
                <div className="confirm-dialog">
                    <h3>Confirm Deletion</h3>
                    <p>Please enter the password to confirm deletion.</p>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleConfirmDelete}>Confirm</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            )}

            {showUpdate && (
                <div className="confirm-dialog">
                    <h3>Update User</h3>
                    <p>Please enter the password to confirm update.</p>
                    <input
                        type="password"
                        value={updatePassword}
                        onChange={(e) => setUpdatePassword(e.target.value)}
                    />
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
                        <button onClick={handleCancelUpdate}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default UserList;
