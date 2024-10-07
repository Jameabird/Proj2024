import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
    const [latestSensorData, setLatestSensorData] = useState(null);
    const [sensorHistory, setSensorHistory] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date());

    // ฟังก์ชันสำหรับการดึงข้อมูลเซนเซอร์
    const fetchSensorData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/sensor_data');
            const data = response.data;
            const latestData = data[data.length - 1]; // Get the latest data
            const last20Entries = data.slice(-20); // Get the last 20 entries
            setLatestSensorData(latestData);
            setSensorHistory(last20Entries);
        } catch (error) {
            console.error('Error fetching sensor data:', error);
        }
    };

    useEffect(() => {
        fetchSensorData(); // เรียกใช้ครั้งแรก

        // อัปเดตเวลาเรียลไทม์ทุกวินาที
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    return (
        <div className="dashboard-container">
            <h1>Welcome to your Dashboard</h1>
            <p>This page is only accessible after login.</p>

            {latestSensorData ? (
                <div className="sensor-data">
                    <h2>Latest Sensor Data:</h2>
                    <p>
                        Current Date and Time (Thailand): {currentTime.toLocaleDateString('th-TH')} {currentTime.toLocaleTimeString('th-TH')}
                    </p> {/* แสดงวันที่และเวลาเรียลไทม์ */}
                    <p>Temperature: {latestSensorData.temperature} °C</p>
                    <p>Humidity: {latestSensorData.humidity} %</p>
                    <p>Dust Density: {latestSensorData.dustDensity} mg/m³</p>
                </div>
            ) : (
                <p>Loading latest sensor data...</p>
            )}

            {/* ปุ่ม Update ไว้ตรงกลาง */}
            <div className="update-button-container">
                <button onClick={fetchSensorData} className="update-button">Update Latest Data</button>
            </div>

            <h2>Last 20 Sensor Data Entries:</h2>
            {sensorHistory.length > 0 ? (
                <table className="sensor-history-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Temperature (°C)</th>
                            <th>Humidity (%)</th>
                            <th>Dust Density (ug/m³)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sensorHistory.map((entry) => (
                            <tr key={entry.id}>
                                <td>{entry.id}</td>
                                <td>{entry.temperature}</td>
                                <td>{entry.humidity}</td>
                                <td>{entry.dustDensity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Loading sensor history...</p>
            )}
        </div>
    );
};

export default Dashboard;
