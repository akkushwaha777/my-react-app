// StudentList.jsx
import React from 'react';
import Card from './card.jsx';

const students = [
  { name: 'Avinsh', age: 24, course: 'MERN', address: 'Mumbai, India', mobile: '+91 9876543210' },
  { name: 'Amit', age: 23, course: 'UI/UX', address: 'Delhi, India', mobile: '+91 9876543211' },
  { name: 'Anil', age: 25, course: 'Frontend', address: 'Bangalore, India', mobile: '+91 9876543212' },
  { name: 'Vijay', age: 22, course: 'Backend', address: 'Pune, India', mobile: '+91 9876543213' },
  { name: 'Ravi', age: 24, course: 'Fullstack', address: 'Hyderabad, India', mobile: '+91 9876543214' },
  { name: 'Suresh', age: 23, course: 'UI/UX', address: 'Chennai, India', mobile: '+91 9876543215' },
  { name: 'Mahesh', age: 26, course: 'Frontend', address: 'Kolkata, India', mobile: '+91 9876543216' },
  { name: 'Rajesh', age: 24, course: 'Backend', address: 'Jaipur, India', mobile: '+91 9876543217' },
];

const StudentList = () => {
  return (
    <div className="container">
      <h1 className="hero-sub">Student List</h1>
      <div className="student-container">
        {students.map((student, index) => (
          <Card
            key={index}
            title={student.name}
            description={`Course: ${student.course}`}
            category={`Age: ${student.age}`}
            details={{
              Address: student.address,
              Mobile: student.mobile,
            }}
            actionText="More Details"
          />
        ))}
      </div>
    </div>
  );
};

export default StudentList;