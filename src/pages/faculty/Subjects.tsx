import React from 'react';
import Card from '../../components/Card';
import { useAuth } from '../../context/AuthContext';
import { subjects } from '../../data/mockData';
import { BookOpen, Users, Calendar } from 'lucide-react';

const Subjects: React.FC = () => {
  const { currentUser } = useAuth();
  const facultyData = currentUser?.profile || null;
  
  if (!facultyData) {
    return (
      <div style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--color-gray-600)' }}>
        Faculty data not found.
      </div>
    );
  }
  
  // Get full subject details for subjects taught by this faculty
  const mySubjects = subjects.filter(subject => 
    facultyData.subjects.includes(subject.name)
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
                <Calendar size={18} style={{ color: 'var(--color-gray-600)', marginRight: 'var(--space-3)' }} />
                <div>
                  <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-600)' }}>Schedule</div>
                  <div style={{ fontWeight: 'var(--font-weight-medium)' }}>
                    Mon, Wed, Fri - 10:00 AM
                  </div>
                </div>
              </div>
            </div>
            
            <div style={{ marginTop: 'var(--space-4)' }}>
              <button className="btn btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={18} style={{ marginRight: 'var(--space-2)' }} />
                View Students
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Subjects;