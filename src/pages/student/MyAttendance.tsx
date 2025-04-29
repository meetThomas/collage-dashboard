import React from 'react';
import Card from '../../components/Card';
import { useAuth } from '../../context/AuthContext';
import { Calendar, AlertTriangle, Check } from 'lucide-react';

const MyAttendance: React.FC = () => {
  const { currentUser } = useAuth();
  const studentData = currentUser?.profile || null;
  
  if (!studentData) {
    return (
      <div style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--color-gray-600)' }}>
        Student data not found.
      </div>
    );
  }
  
  // Mock attendance data
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  // Generate mock attendance records
  const mockAttendance: Record<string, boolean> = {};
  const mockAttendanceBySubject: Record<string, Record<string, boolean>> = {};
  
  studentData.subjects.forEach(subject => {
    mockAttendanceBySubject[subject] = {};
  });
  
  // Fill with random attendance data
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    // Skip future days
    if (date > new Date()) continue;
    
    const dateString = date.toISOString().split('T')[0];
    
    // Overall attendance (70% probability of being present)
    mockAttendance[dateString] = Math.random() < (studentData.attendance / 100);
    
    // Subject-wise attendance
    studentData.subjects.forEach(subject => {
      // Attendance probability proportional to overall attendance
      mockAttendanceBySubject[subject][dateString] = Math.random() < (studentData.attendance / 100);
    });
  }
  
  // Get current month name
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const currentMonthName = monthNames[currentMonth];
  
  // Calculate days present and absent
  const totalDays = Object.keys(mockAttendance).length;
  const presentDays = Object.values(mockAttendance).filter(v => v).length;
  const absentDays = totalDays - presentDays;
  
  return (
    <div className="fade-in">
      <h2 style={{ marginBottom: 'var(--space-4)' }}>My Attendance</h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: 'var(--space-4)',
        marginBottom: 'var(--space-4)'
      }}>
        <Card title="Attendance Overview">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ 
                fontSize: 'var(--font-size-sm)', 
                color: 'var(--color-gray-600)',
                marginBottom: 'var(--space-1)'
              }}>
                Total Days
              </div>
              <div style={{ 
                fontSize: 'var(--font-size-2xl)', 
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--color-gray-900)'
              }}>
                {totalDays}
              </div>
            </div>
            
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ 
                fontSize: 'var(--font-size-sm)', 
                color: 'var(--color-gray-600)',
                marginBottom: 'var(--space-1)'
              }}>
                Present
              </div>
              <div style={{ 
                fontSize: 'var(--font-size-2xl)', 
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--color-success)'
              }}>
                {presentDays}
              </div>
            </div>
            
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ 
                fontSize: 'var(--font-size-sm)', 
                color: 'var(--color-gray-600)',
                marginBottom: 'var(--space-1)'
              }}>
                Absent
              </div>
              <div style={{ 
                fontSize: 'var(--font-size-2xl)', 
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--color-error)'
              }}>
                {absentDays}
              </div>
            </div>
          </div>
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
              <div style={{ fontWeight: 'var(--font-weight-medium)' }}>Attendance Percentage</div>
              <div style={{
                background: studentData.attendance >= 90 ? 'var(--color-success)' : 
                            studentData.attendance >= 75 ? 'var(--color-warning)' : 'var(--color-error)',
                color: 'white',
                padding: '2px 8px',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--font-size-sm)'
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
          
          {studentData.attendance < 75 && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: 'var(--space-3)',
              marginTop: 'var(--space-4)',
              backgroundColor: 'rgba(255, 59, 48, 0.1)',
              color: 'var(--color-error)',
              borderRadius: 'var(--radius-md)'
            }}>
              <AlertTriangle size={18} style={{ marginRight: 'var(--space-2)' }} />
              Your attendance is below the required 75%. Please improve your attendance to avoid academic penalties.
            </div>
          )}
        </Card>
        
        <Card title={`${currentMonthName} ${currentYear} - Calendar`}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '4px'
          }}>
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
              <div key={index} style={{ 
                textAlign: 'center', 
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--color-gray-700)',
                padding: '4px'
              }}>
                {day}
              </div>
            ))}
            
            {Array.from({ length: new Date(currentYear, currentMonth, 1).getDay() }).map((_, index) => (
              <div key={`empty-${index}`} />
            ))}
            
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const date = new Date(currentYear, currentMonth, day);
              const dateString = date.toISOString().split('T')[0];
              const isWeekend = date.getDay() === 0 || date.getDay() === 6;
              const isFuture = date > new Date();
              const isPresent = mockAttendance[dateString];
              const isToday = new Date().toDateString() === date.toDateString();
              
              let backgroundColor = 'transparent';
              let textColor = 'var(--color-gray-800)';
              
              if (isToday) {
                backgroundColor = 'var(--color-primary)';
                textColor = 'white';
              } else if (isFuture) {
                backgroundColor = 'transparent';
                textColor = 'var(--color-gray-400)';
              } else if (isWeekend) {
                backgroundColor = 'var(--color-gray-200)';
                textColor = 'var(--color-gray-600)';
              } else if (isPresent === true) {
                backgroundColor = 'rgba(76, 217, 100, 0.2)';
                textColor = 'var(--color-success)';
              } else if (isPresent === false) {
                backgroundColor = 'rgba(255, 59, 48, 0.2)';
                textColor = 'var(--color-error)';
              }
              
              return (
                <div 
                  key={day}
                  style={{ 
                    textAlign: 'center',
                    padding: '8px 4px',
                    backgroundColor,
                    color: textColor,
                    borderRadius: 'var(--radius-md)',
                    position: 'relative'
                  }}
                >
                  {day}
                  {!isWeekend && !isFuture && isPresent !== undefined && (
                    <div style={{ 
                      position: 'absolute',
                      bottom: '2px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: '10px'
                    }}>
                      {isPresent ? (
                        <Check size={10} style={{ color: 'var(--color-success)' }} />
                      ) : (
                        <span style={{ color: 'var(--color-error)' }}>×</span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      </div>
      
      <Card title="Attendance by Subject">
        {studentData.subjects.map((subject, index) => {
          // Calculate subject attendance
          const subjectAttendance = mockAttendanceBySubject[subject];
          const totalSubjectDays = Object.keys(subjectAttendance).length;
          const presentSubjectDays = Object.values(subjectAttendance).filter(v => v).length;
          const subjectAttendancePercentage = totalSubjectDays > 0 
            ? Math.round((presentSubjectDays / totalSubjectDays) * 100) 
            : 0;
            
          return (
            <div key={index} style={{ marginBottom: index < studentData.subjects.length - 1 ? 'var(--space-4)' : 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                <div style={{ fontWeight: 'var(--font-weight-medium)' }}>{subject}</div>
                <div style={{
                  background: subjectAttendancePercentage >= 90 ? 'var(--color-success)' : 
                              subjectAttendancePercentage >= 75 ? 'var(--color-warning)' : 'var(--color-error)',
                  color: 'white',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--font-size-sm)'
                }}>
                  {subjectAttendancePercentage}%
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
                  width: `${subjectAttendancePercentage}%`,
                  background: subjectAttendancePercentage >= 90 ? 'var(--color-success)' : 
                              subjectAttendancePercentage >= 75 ? 'var(--color-warning)' : 'var(--color-error)',
                  borderRadius: 'var(--radius-full)'
                }} />
              </div>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                color: 'var(--color-gray-600)',
                fontSize: 'var(--font-size-sm)',
                marginTop: 'var(--space-1)'
              }}>
                <div>Present: {presentSubjectDays} days</div>
                <div>Absent: {totalSubjectDays - presentSubjectDays} days</div>
              </div>
            </div>
          );
        })}
      </Card>
    </div>
  );
};

export default MyAttendance;