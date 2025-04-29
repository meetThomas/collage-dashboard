import React, { useState } from 'react';
import Card from '../../components/Card';
import Table from '../../components/Table';
import { students, Student } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { Save, Check, X } from 'lucide-react';

const AddAttendance: React.FC = () => {
  const { currentUser } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState('');
  const [attendanceData, setAttendanceData] = useState<Record<string, boolean>>({});
  const [savedMessage, setSavedMessage] = useState('');
  
  // Get current faculty data
  const facultyData = currentUser?.profile || null;
  const facultySubjects = facultyData?.subjects || [];
  
  // Filter students who are enrolled in the selected subject
  const filteredStudents = selectedSubject ? 
    students.filter(student => student.subjects.includes(selectedSubject)) : [];
    
  // Initialize attendance data if not set
  React.useEffect(() => {
    if (selectedSubject && filteredStudents.length > 0) {
      const initialData: Record<string, boolean> = {};
      filteredStudents.forEach(student => {
        // Default to present (true)
        initialData[student.id] = true;
      });
      setAttendanceData(initialData);
    } else {
      setAttendanceData({});
    }
  }, [selectedSubject, filteredStudents]);
  
  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubject(e.target.value);
    setSavedMessage('');
  };
  
  const toggleAttendance = (studentId: string) => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: !prev[studentId]
    }));
  };
  
  const saveAttendance = () => {
    // In a real app, this would save the attendance to a database
    console.log('Saving attendance for', selectedSubject, attendanceData);
    setSavedMessage('Attendance saved successfully!');
    
    // Show message for 3 seconds
    setTimeout(() => {
      setSavedMessage('');
    }, 3000);
  };
  
  const columns = [
    { header: 'ID', accessor: 'id', width: '15%' },
    { header: 'Name', accessor: 'name', width: '30%' },
    { 
      header: 'Current Attendance %', 
      accessor: (student: Student) => (
        <div style={{
          background: student.attendance >= 90 ? 'var(--color-success)' : 
                      student.attendance >= 75 ? 'var(--color-warning)' : 'var(--color-error)',
          color: 'white',
          padding: '2px 8px',
          borderRadius: 'var(--radius-md)',
          display: 'inline-block',
          fontSize: 'var(--font-size-sm)'
        }}>
          {student.attendance}%
        </div>
      ),
      width: '25%'
    },
    {
      header: 'Today\'s Attendance',
      accessor: (student: Student) => (
        <div>
          <button 
            className={`btn ${attendanceData[student.id] ? 'btn-primary' : 'btn-outline'}`} 
            style={{ 
              marginRight: 'var(--space-2)',
              padding: '4px 8px',
              display: 'inline-flex',
              alignItems: 'center'
            }}
            onClick={() => toggleAttendance(student.id)}
          >
            <Check size={16} style={{ marginRight: '4px' }} />
            Present
          </button>
          <button 
            className={`btn ${!attendanceData[student.id] ? 'btn-danger' : 'btn-outline'}`} 
            style={{ 
              padding: '4px 8px',
              display: 'inline-flex',
              alignItems: 'center'
            }}
            onClick={() => toggleAttendance(student.id)}
          >
            <X size={16} style={{ marginRight: '4px' }} />
            Absent
          </button>
        </div>
      ),
      width: '30%'
    }
  ];

  return (
    <div className="fade-in">
      <h2 style={{ marginBottom: 'var(--space-4)' }}>Add Attendance</h2>
      
      <Card title="Select Subject">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <div style={{ flex: 1 }}>
            <select
              className="select"
              value={selectedSubject}
              onChange={handleSubjectChange}
            >
              <option value="">Select a subject</option>
              {facultySubjects.map((subject, index) => (
                <option key={index} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <button 
              className="btn btn-primary"
              onClick={saveAttendance}
              disabled={!selectedSubject || filteredStudents.length === 0}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <Save size={18} style={{ marginRight: 'var(--space-2)' }} />
              Save Attendance
            </button>
          </div>
        </div>
        
        {savedMessage && (
          <div style={{ 
            marginTop: 'var(--space-3)',
            padding: 'var(--space-3)',
            backgroundColor: 'rgba(76, 217, 100, 0.1)',
            color: 'var(--color-success)',
            borderRadius: 'var(--radius-md)'
          }}>
            {savedMessage}
          </div>
        )}
      </Card>
      
      {selectedSubject ? (
        <Card title={`Attendance for ${selectedSubject}`} style={{ marginTop: 'var(--space-4)' }}>
          {filteredStudents.length > 0 ? (
            <Table
              columns={columns}
              data={filteredStudents}
              keyField="id"
            />
          ) : (
            <div style={{ textAlign: 'center', padding: 'var(--space-5)', color: 'var(--color-gray-600)' }}>
              No students enrolled in this subject.
            </div>
          )}
        </Card>
      ) : (
        <div style={{ 
          textAlign: 'center', 
          padding: 'var(--space-8)', 
          color: 'var(--color-gray-600)',
          backgroundColor: 'var(--color-white)',
          borderRadius: 'var(--radius-lg)',
          marginTop: 'var(--space-4)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          Please select a subject to mark attendance.
        </div>
      )}
    </div>
  );
};

export default AddAttendance;