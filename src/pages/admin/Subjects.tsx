import React, { useState } from 'react';
import Table from '../../components/Table';
import Card from '../../components/Card';
import { subjects, Subject } from '../../data/mockData';
import { Search, Plus } from 'lucide-react';

const Subjects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter subjects based on search term
  const filteredSubjects = subjects.filter(subject => 
    subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.faculty.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const columns = [
    { header: 'ID', accessor: 'id', width: '10%' },
    { header: 'Name', accessor: 'name', width: '20%' },
    { header: 'Department', accessor: 'department', width: '20%' },
    { header: 'Faculty', accessor: 'faculty', width: '20%' },
    { 
      header: 'Credits', 
      accessor: (subject: Subject) => (
        <div style={{
          background: 'var(--color-gray-200)',
          padding: '2px 12px',
          borderRadius: 'var(--radius-md)',
          display: 'inline-block',
          fontSize: 'var(--font-size-sm)',
          fontWeight: 'var(--font-weight-medium)'
        }}>
          {subject.credits}
        </div>
      ),
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
      width: '15%'
    }
  ];

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
        <h2>Subjects</h2>
        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center' }}>
          <Plus size={18} style={{ marginRight: 'var(--space-2)' }} />
          Add Subject
        </button>
      </div>
      
      <Card title="">
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <input
              type="text"
              className="input"
              placeholder="Search subjects..."
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
          data={filteredSubjects}
          keyField="id"
        />
      </Card>
    </div>
  );
};

export default Subjects;