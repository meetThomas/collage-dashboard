import React from 'react';
import Card from '../../components/Card';
import { useAuth } from '../../context/AuthContext';
import { subjects, Subject } from '../../data/mockData';
import { BookOpen, User } from 'lucide-react';

const MySubjects: React.FC = () => {
  const { currentUser } = useAuth();
  const studentData = currentUser?.profile || null;
  
  if (!studentData) {
    return (
      <div style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--color-gray-600)' }}>
        Student data not found.
      </div>
    );
  }
  
  // Get full subject details
  const mySubjects = subjects.filter(subject => 
    studentData.subjects.includes(subject.name)
  );
  
  return (
    <div className="fade-in">
      <h2 style={{ marginBottom: 'var(--space-4)' }}>My Subjects</h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: 'var(--space-4)'
      }}>
        {mySubjects.map((subject, index) => (
          <Card 
            key={index} 
            title={subject.name}
            className="slide-in"
            style={{ 
              animationDelay: `${index * 0.1}s`,
              borderTop: '4px solid var(--color-primary)'
            }}
          >
            <div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                padding: 'var(--space-2) 0',
                borderBottom: '1px solid var(--color-gray-300)'
              }}>
                <BookOpen size={18} style={{ color: 'var(--color-gray-600)', marginRight: 'var(--space-3)' }} />
                <div>
                  <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-600)' }}>Department</div>
                  <div style={{ fontWeight: 'var(--font-weight-medium)' }}>{subject.department}</div>
                </div>
              </div>
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                padding: 'var(--space-2) 0',
                borderBottom: '1px solid var(--color-gray-300)'
              }}>
                <User size={18} style={{ color: 'var(--color-gray-600)', marginRight: 'var(--space-3)' }} />
                <div>
                  <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-600)' }}>Faculty</div>
                  <div style={{ fontWeight: 'var(--font-weight-medium)' }}>{subject.faculty}</div>
                </div>
              </div>
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                padding: 'var(--space-2) 0',
                borderBottom: '1px solid var(--color-gray-300)'
              }}>
                <div style={{ width: '18px', marginRight: 'var(--space-3)' }}>
                  <span style={{ 
                    display: 'inline-block',
                    width: '18px',
                    height: '18px',
                    lineHeight: '18px',
                    textAlign: 'center',
                    background: 'var(--color-gray-300)',
                    color: 'var(--color-gray-700)',
                    borderRadius: '50%',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 'var(--font-weight-bold)'
                  }}>C</span>
                </div>
                <div>
                  <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-600)' }}>Credits</div>
                  <div style={{ fontWeight: 'var(--font-weight-medium)' }}>{subject.credits}</div>
                </div>
              </div>
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                padding: 'var(--space-2) 0',
              }}>
                <div style={{ width: '18px', marginRight: 'var(--space-3)' }}>
                  <span style={{ 
                    display: 'inline-block',
                    width: '18px',
                    height: '18px',
                    lineHeight: '18px',
                    textAlign: 'center',
                    background: 'var(--color-gray-300)',
                    color: 'var(--color-gray-700)',
                    borderRadius: '50%',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 'var(--font-weight-bold)'
                  }}>M</span>
                </div>
                <div>
                  <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-600)' }}>My Mark</div>
                  <div style={{ 
                    fontWeight: 'var(--font-weight-medium)',
                    color: (studentData.marks[subject.name] || 0) >= 80 ? 'var(--color-success)' : 
                          (studentData.marks[subject.name] || 0) >= 60 ? 'var(--color-primary)' : 'var(--color-error)',
                  }}>
                    {studentData.marks[subject.name] || 'N/A'}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MySubjects;