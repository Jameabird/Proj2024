import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserList.css';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

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
                                <button onClick={() => handleDeleteClick(user.id)}>Delete</button>
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
        </div>
    );
};

export default UserList;
