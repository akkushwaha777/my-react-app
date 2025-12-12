import React, { useState } from 'react';
import Card from './card.jsx';

const initialStudents = [
  { id: 1, name: 'Avinsh', age: 24, course: 'MERN', address: 'Mumbai, India', mobile: '+91 9876543210' },
  { id: 2, name: 'Amit', age: 23, course: 'UI/UX', address: 'Delhi, India', mobile: '+91 9876543211' },
  { id: 3, name: 'Anil', age: 25, course: 'Frontend', address: 'Bangalore, India', mobile: '+91 9876543212' },
  { id: 4, name: 'Vijay', age: 22, course: 'Backend', address: 'Pune, India', mobile: '+91 9876543213' },
  { id: 5, name: 'Ravi', age: 24, course: 'Fullstack', address: 'Hyderabad, India', mobile: '+91 9876543214' },
  { id: 6, name: 'Suresh', age: 23, course: 'UI/UX', address: 'Chennai, India', mobile: '+91 9876543215' },
  { id: 7, name: 'Mahesh', age: 26, course: 'Frontend', address: 'Kolkata, India', mobile: '+91 9876543216' },
  { id: 8, name: 'Rajesh', age: 24, course: 'Backend', address: 'Jaipur, India', mobile: '+91 9876543217' }
];

function StudentList() {
  const [students, setStudents] = useState(initialStudents);

  const deleteStudent = (id) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="container">
      <h1 className="hero-sub">Student List</h1>
      <div className="student-container">
        {students.map((student) => (
          <Card
            key={student.id}
            title={student.name}
            description={`Course: ${student.course}`}
            category={`Age: ${student.age}`}
            details={{
              Address: student.address,
              Mobile: student.mobile
            }}
            actionText="More Details"
            onDelete={() => deleteStudent(student.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default StudentList;