import React, { useState } from 'react';
import Table from '../../components/Table';
import Card from '../../components/Card';
import { students, Student } from '../../data/mockData';
import { Search, Plus } from 'lucide-react';

const Students: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter students based on search term
  const filteredStudents = students.filter(student => 
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
      header: 'Subjects', 
      accessor: (student: Student) => (
        <div>
          {student.subjects.map((subject, index) => (
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
      ),
      width: '30%'
    },
    {
      header: 'Average Marks',
      accessor: (student: Student) => {
        const marks = Object.values(student.marks);
        const average = marks.reduce((sum, mark) => sum + mark, 0) / marks.length;
        return (
          <div style={{
            color: average >= 80 ? 'var(--color-success)' : 
                  average >= 60 ? 'var(--color-primary)' : 'var(--color-error)',
            fontWeight: 'var(--font-weight-medium)'
          }}>
            {average.toFixed(1)}
          </div>
        );
      },
      width: '15%'
    },
    {
      header: 'Actions',
      accessor: () => (
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <button className="btn btn-outline" style={{ padding: '4px 8px', fontSize: 'var(--font-size-sm)' }}>
            View
          </button>
          <button className="btn btn-outline" style={{ padding: '4px 8px', fontSize: 'var(--font-size-sm)' }}>
            Edit
          </button>
        </div>
      ),
      width: '10%'
    }
  ];

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
        <h2>Students</h2>
        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center' }}>
          <Plus size={18} style={{ marginRight: 'var(--space-2)' }} />
          Add Student
        </button>
      </div>
      
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
        
        <Table
          columns={columns}
          data={filteredStudents}
          keyField="id"
        />
      </Card>
    </div>
  );
};

export default Students;