import React, { useState } from 'react';
import Card from '../../components/Card';
import Table from '../../components/Table';
import { students, Student } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { Save } from 'lucide-react';

const AddMarks: React.FC = () => {
  const { currentUser } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState('');
  const [marksData, setMarksData] = useState<Record<string, number>>({});
  const [savedMessage, setSavedMessage] = useState('');
  
  // Get current faculty data
  const facultyData = currentUser?.profile || null;
  const facultySubjects = facultyData?.subjects || [];
  
  // Filter students who are enrolled in the selected subject
  const filteredStudents = selectedSubject ? 
    students.filter(student => student.subjects.includes(selectedSubject)) : [];
    
  // Initialize marks data if not set
  React.useEffect(() => {
    if (selectedSubject && filteredStudents.length > 0) {
      const initialData: Record<string, number> = {};
      filteredStudents.forEach(student => {
        // Use existing marks if available, otherwise default to 0
        initialData[student.id] = student.marks[selectedSubject] || 0;
      });
      setMarksData(initialData);
    } else {
      setMarksData({});
    }
  }, [selectedSubject, filteredStudents]);
  
  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubject(e.target.value);
    setSavedMessage('');
  };
  
  const handleMarksChange = (studentId: string, value: string) => {
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
      setMarksData(prev => ({
        ...prev,
        [studentId]: numValue
      }));
    }
  };
  
  const saveMarks = () => {
    // In a real app, this would save the marks to a database
    console.log('Saving marks for', selectedSubject, marksData);
    setSavedMessage('Marks saved successfully!');
    
    // Show message for 3 seconds
    setTimeout(() => {
      setSavedMessage('');
    }, 3000);
  };
  
  const columns = [
    { header: 'ID', accessor: 'id', width: '15%' },
    { header: 'Name', accessor: 'name', width: '30%' },
    { 
      header: 'Current Marks', 
      accessor: (student: Student) => (
        <div style={{
          color: (student.marks[selectedSubject] || 0) >= 80 ? 'var(--color-success)' : 
                (student.marks[selectedSubject] || 0) >= 60 ? 'var(--color-primary)' : 'var(--color-error)',
          fontWeight: 'var(--font-weight-medium)'
        }}>
          {student.marks[selectedSubject] || 'N/A'}
        </div>
      ),
      width: '20%'
    },
    {
      header: 'New Marks',
      accessor: (student: Student) => (
        <div>
          <input 
            type="number" 
            className="input"
            min="0"
            max="100"
            value={marksData[student.id] || 0}
            onChange={(e) => handleMarksChange(student.id, e.target.value)}
            style={{ maxWidth: '100px' }}
          />
          <span style={{ marginLeft: 'var(--space-2)', color: 'var(--color-gray-600)' }}>/ 100</span>
        </div>
      ),
      width: '35%'
    }
  ];

  return (
    <div className="fade-in">
      <h2 style={{ marginBottom: 'var(--space-4)' }}>Add Marks</h2>
      
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
              onClick={saveMarks}
              disabled={!selectedSubject || filteredStudents.length === 0}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <Save size={18} style={{ marginRight: 'var(--space-2)' }} />
              Save Marks
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
        <Card title={`Marks for ${selectedSubject}`} style={{ marginTop: 'var(--space-4)' }}>
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
          Please select a subject to add marks.
        </div>
      )}
    </div>
  );
};

export default AddMarks;