import React from 'react';
import './About.css';
import EmbbedImage from './images/Embbed.jpg'; // ปรับเส้นทางให้ตรงกับที่เก็บไฟล์รูปภาพ

const About = () => {
    return (
        <div className="about-container">
            <h1>About SmartThingRobot001</h1>
            <div className="about-content"> {/* เพิ่ม div สำหรับการจัดเรียง */}
                <img src={EmbbedImage} alt="Smart Thing Robot" className="about-image" />
                <div className="about-text"> {/* div สำหรับข้อความ */}
                    <p>
                        SmartThingRobot001 จะใช้ตัวของ ESP32 เป็นตัวกลางเพื่อทำการสื่อสารเเละบอกข้อมูลเบื้องต้น เช่น อุณหภูมิ ความชื้น ปริมาณฝุ่น
                        โดยจะทำการรับ input ผ่านเซนเซอร์ต่างๆ และ 4x4 keypad โดยตัว keypad จะมีการเซตค่าของเเต่ละปุ่มว่าให้ทำอะไรได้บ้างหรือการคุยโต้ตอบบางอย่างจากการใช้ module เล่นเสียงกับตัวลำโพงขนาดเล็ก รวมไปถึงใช้  เซนเซอร์วัดระยะห่างแบบง่ายๆ (เซนติเมตร) 
                        เพื่อทำการเช็คว่ามีการ interact กับตัว keypad ไหม เเละค่าต่างๆจะทำการเเสดงค่าออกมาผ่านทางหน้าจอ OLED เเละส่วนสำคัญคือจะส่งข้อมูลที่ได้รับจากสัตว์เลี้ยงตัวนี้ 
                        ส่งไปยัง Web APP เพื่อเก็บข้อมูลเป็นสถิติในฐานข้อมูลได้ เช่นข้อมูลของ อุณหภูมิ ความชื้น ปริมาณฝุ่น
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
