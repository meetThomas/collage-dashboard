import React, { useState } from 'react';
import Table from '../../components/Table';
import Card from '../../components/Card';
import { students, Student } from '../../data/mockData';
import { Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const MyStudents: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { currentUser } = useAuth();
  
  // Get current faculty data
  const facultyData = currentUser?.profile || null;
  
  // Filter students who are enrolled in faculty's subjects
  const myStudents = facultyData ? 
    students.filter(student => 
      student.subjects.some(subject => 
        facultyData.subjects.includes(subject)
      )
    ) : [];
  
  // Further filter based on search term
  const filteredStudents = myStudents.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const columns = [
    { header: 'ID', accessor: 'id', width: '10%' },
    { header: 'Name', accessor: 'name', width: '20%' },
    { 
      header: 'Attendance', 
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
      width: '15%'
    },
    { 
      header: 'My Subjects', 
      accessor: (student: Student) => {
        // Only show subjects taught by this faculty
        const mySubjects = facultyData ? 
          student.subjects.filter(subject => 
            facultyData.subjects.includes(subject)
          ) : [];
          
        return (
          <div>
            {mySubjects.map((subject, index) => (
              <span key={index} style={{
                background: 'var(--color-gray-200)',
                padding: '2px 8px',
                borderRadius: 'var(--radius-md)',
                margin: '2px',
                display: 'inline-block',
                fontSize: 'var(--font-size-sm)'
              }}>
                {subject}
              </span>
            ))}
          </div>
        );
      },
      width: '25%'
    },
    {
      header: 'Marks',
      accessor: (student: Student) => {
        // Only show marks for subjects taught by this faculty
        const relevantMarks = facultyData ? 
          Object.entries(student.marks)
            .filter(([subject]) => facultyData.subjects.includes(subject)) : [];
            
        return (
          <div>
            {relevantMarks.map(([subject, mark], index) => (
              <div key={index} style={{ marginBottom: '4px' }}>
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-gray-600)' }}>
                  {subject}:
                </span> 
                <span style={{
                  marginLeft: '4px',
                  color: mark >= 80 ? 'var(--color-success)' : 
                          mark >= 60 ? 'var(--color-primary)' : 'var(--color-error)',
                  fontWeight: 'var(--font-weight-medium)'
                }}>
                  {mark}
                </span>
              </div>
            ))}
          </div>
        );
      },
      width: '20%'
    },
    {
      header: 'Actions',
      accessor: () => (
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <button className="btn btn-outline" style={{ padding: '4px 8px', fontSize: 'var(--font-size-sm)' }}>
            View
          </button>
          <button className="btn btn-primary" style={{ padding: '4px 8px', fontSize: 'var(--font-size-sm)' }}>
            Update
          </button>
        </div>
      ),
      width: '10%'
    }
  ];

  return (
    <div className="fade-in">
      <h2 style={{ marginBottom: 'var(--space-4)' }}>My Students</h2>
      
      <Card title="">
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <input
              type="text"
              className="input"
              placeholder="Search students by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: 'var(--space-8)' }}
            />
            <div style={{ position: 'absolute', left: 'var(--space-3)', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-gray-600)' }}>
              <Search size={18} />
            </div>
          </div>
        </div>
        
        {filteredStudents.length > 0 ? (
          <Table
            columns={columns}
            data={filteredStudents}
            keyField="id"
          />
        ) : (
          <div style={{ textAlign: 'center', padding: 'var(--space-5)', color: 'var(--color-gray-600)' }}>
            No students found for your subjects.
          </div>
        )}
      </Card>
    </div>
  );
};

export default MyStudents;