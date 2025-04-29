import React from 'react';
import Card from '../../components/Card';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, BookOpen, GraduationCap } from 'lucide-react';

const MyProfile: React.FC = () => {
  const { currentUser } = useAuth();
  const studentData = currentUser?.profile || null;
  
  if (!studentData) {
    return (
      <div style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--color-gray-600)' }}>
        Student data not found.
      </div>
    );
  }
  
  // Calculate average marks
  const marks = Object.values(studentData.marks);
  const averageMarks = marks.reduce((sum, mark) => sum + mark, 0) / marks.length;
  
  return (
    <div className="fade-in">
      <h2 style={{ marginBottom: 'var(--space-4)' }}>My Profile</h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: 'var(--space-4)'
      }}>
        <Card title="Personal Information">
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <div style={{ 
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: 'var(--space-4)'
            }}>
              {studentData.name.charAt(0)}
            </div>
            
            <h3 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-2)' }}>
              {studentData.name}
            </h3>
            
            <div style={{ 
              background: 'var(--color-gray-200)',
              padding: '4px 12px',
              borderRadius: 'var(--radius-md)',
              marginBottom: 'var(--space-4)'
            }}>
              ID: {studentData.id}
            </div>
            
            <div style={{ width: '100%', marginTop: 'var(--space-4)' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                padding: 'var(--space-3) 0',
                borderBottom: '1px solid var(--color-gray-300)'
              }}>
                <User size={18} style={{ color: 'var(--color-gray-600)', marginRight: 'var(--space-3)' }} />
                <div>
                  <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-600)' }}>Name</div>
                  <div style={{ fontWeight: 'var(--font-weight-medium)' }}>{studentData.name}</div>
                </div>
              </div>
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                padding: 'var(--space-3) 0',
                borderBottom: '1px solid var(--color-gray-300)'
              }}>
                <Mail size={18} style={{ color: 'var(--color-gray-600)', marginRight: 'var(--space-3)' }} />
                <div>
                  <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-600)' }}>Email</div>
                  <div style={{ fontWeight: 'var(--font-weight-medium)' }}>{studentData.id.toLowerCase()}@example.edu</div>
                </div>
              </div>
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                padding: 'var(--space-3) 0',
              }}>
                <GraduationCap size={18} style={{ color: 'var(--color-gray-600)', marginRight: 'var(--space-3)' }} />
                <div>
                  <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-600)' }}>Student ID</div>
                  <div style={{ fontWeight: 'var(--font-weight-medium)' }}>{studentData.id}</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        <Card title="Academic Overview">
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <h4 style={{ marginBottom: 'var(--space-2)' }}>
              <BookOpen size={18} style={{ verticalAlign: 'middle', marginRight: 'var(--space-2)' }} />
              Enrolled Subjects
            </h4>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
              {studentData.subjects.map((subject, index) => (
                <div key={index} style={{
                  background: 'var(--color-primary)',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-md)',
                  display: 'inline-block'
                }}>
                  {subject}
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
              <h4 style={{ margin: 0 }}>Attendance</h4>
              <div style={{
                background: studentData.attendance >= 90 ? 'var(--color-success)' : 
                            studentData.attendance >= 75 ? 'var(--color-warning)' : 'var(--color-error)',
                color: 'white',
                padding: '4px 12px',
                borderRadius: 'var(--radius-md)',
                fontWeight: 'var(--font-weight-medium)'
              }}>
                {studentData.attendance}%
              </div>
            </div>
            
            <div style={{ 
              height: '8px', 
              background: 'var(--color-gray-300)', 
              borderRadius: 'var(--radius-full)',
              overflow: 'hidden'
            }}>
              <div style={{ 
                height: '100%', 
                width: `${studentData.attendance}%`,
                background: studentData.attendance >= 90 ? 'var(--color-success)' : 
                            studentData.attendance >= 75 ? 'var(--color-warning)' : 'var(--color-error)',
                borderRadius: 'var(--radius-full)'
              }} />
            </div>
          </div>
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
              <h4 style={{ margin: 0 }}>Average Marks</h4>
              <div style={{
                background: averageMarks >= 80 ? 'var(--color-success)' : 
                          averageMarks >= 60 ? 'var(--color-primary)' : 'var(--color-error)',
                color: 'white',
                padding: '4px 12px',
                borderRadius: 'var(--radius-md)',
                fontWeight: 'var(--font-weight-medium)'
              }}>
                {averageMarks.toFixed(1)}
              </div>
            </div>
            
            <div style={{ 
              height: '8px', 
              background: 'var(--color-gray-300)', 
              borderRadius: 'var(--radius-full)',
              overflow: 'hidden'
            }}>
              <div style={{ 
                height: '100%', 
                width: `${(averageMarks / 100) * 100}%`,
                background: averageMarks >= 80 ? 'var(--color-success)' : 
                          averageMarks >= 60 ? 'var(--color-primary)' : 'var(--color-error)',
                borderRadius: 'var(--radius-full)'
              }} />
            </div>
          </div>
        </Card>
      </div>
      
      <Card title="Performance Breakdown" style={{ marginTop: 'var(--space-4)' }}>
        <div>
          <h4 style={{ marginBottom: 'var(--space-4)' }}>Subject-wise Marks</h4>
          
          {Object.entries(studentData.marks).map(([subject, mark], index) => (
            <div key={index} style={{ marginBottom: 'var(--space-4)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                <div style={{ fontWeight: 'var(--font-weight-medium)' }}>{subject}</div>
                <div style={{
                  color: mark >= 80 ? 'var(--color-success)' : 
                         mark >= 60 ? 'var(--color-primary)' : 'var(--color-error)',
                  fontWeight: 'var(--font-weight-bold)'
                }}>
                  {mark} / 100
                </div>
              </div>
              
              <div style={{ 
                height: '8px', 
                background: 'var(--color-gray-300)', 
                borderRadius: 'var(--radius-full)',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  height: '100%', 
                  width: `${mark}%`,
                  background: mark >= 80 ? 'var(--color-success)' : 
                              mark >= 60 ? 'var(--color-primary)' : 'var(--color-error)',
                  borderRadius: 'var(--radius-full)'
                }} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default MyProfile;