import React, { createContext, useState } from 'react';

// สร้าง Context
export const UserContext = createContext();

// สร้าง Provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // คืนค่า Context Provider ที่ให้ components ทั้งหมดเข้าถึง user และ setUser ได้
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
