import React from 'react';
import Card from '../../components/Card';
import { students, faculty, subjects } from '../../data/mockData';
import { Users, BookOpen, GraduationCap, Percent } from 'lucide-react';

const Dashboard: React.FC = () => {
  // Calculate average attendance
  const averageAttendance = 
    students.reduce((sum, student) => sum + student.attendance, 0) / students.length;
  
  // Create stats cards
  const stats = [
    {
      title: 'Total Students',
      value: students.length,
      icon: <GraduationCap size={24} color="var(--color-primary)" />,
      color: 'var(--color-primary)',
      bgColor: 'rgba(67, 97, 238, 0.1)'
    },
    {
      title: 'Total Faculty',
      value: faculty.length,
      icon: <Users size={24} color="var(--color-secondary)" />,
      color: 'var(--color-secondary)',
      bgColor: 'rgba(63, 55, 201, 0.1)'
    },
    {
      title: 'Total Subjects',
      value: subjects.length,
      icon: <BookOpen size={24} color="var(--color-accent)" />,
      color: 'var(--color-accent)',
      bgColor: 'rgba(247, 37, 133, 0.1)'
    },
    {
      title: 'Average Attendance',
      value: `${averageAttendance.toFixed(1)}%`,
      icon: <Percent size={24} color="var(--color-success)" />,
      color: 'var(--color-success)',
      bgColor: 'rgba(76, 217, 100, 0.1)'
    }
  ];

  // Department distribution
  const departmentCounts: Record<string, number> = {};
  faculty.forEach(f => {
    departmentCounts[f.department] = (departmentCounts[f.department] || 0) + 1;
  });

  return (
    <div className="fade-in">
      <h2 style={{ marginBottom: 'var(--space-4)' }}>Admin Dashboard</h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: 'var(--space-4)' 
      }}>
        {stats.map((stat, index) => (
          <div key={index} className="card" style={{ margin: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ 
                background: stat.bgColor, 
                borderRadius: '50%', 
                width: '50px', 
                height: '50px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginRight: 'var(--space-4)'
              }}>
                {stat.icon}
              </div>
              <div>
                <h3 style={{ 
                  fontSize: 'var(--font-size-lg)', 
                  margin: 0, 
                  color: 'var(--color-gray-700)' 
                }}>{stat.title}</h3>
                <p style={{ 
                  fontSize: 'var(--font-size-2xl)', 
                  fontWeight: 'var(--font-weight-bold)', 
                  margin: 0,
                  color: stat.color
                }}>{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: 'var(--space-4)',
        marginTop: 'var(--space-5)'
      }}>
        <Card title="Recent Students">
          <ul style={{ padding: 0 }}>
            {students.slice(0, 5).map(student => (
              <li key={student.id} style={{
                padding: 'var(--space-3)',
                borderBottom: '1px solid var(--color-gray-300)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontWeight: 'var(--font-weight-medium)' }}>{student.name}</div>
                  <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-600)' }}>ID: {student.id}</div>
                </div>
                <div style={{
                  background: student.attendance >= 90 ? 'var(--color-success)' : 
                              student.attendance >= 75 ? 'var(--color-warning)' : 'var(--color-error)',
                  color: 'white',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--font-size-sm)'
                }}>
                  {student.attendance}%
                </div>
              </li>
            ))}
          </ul>
        </Card>
        
        <Card title="Department Distribution">
          <div style={{ padding: 'var(--space-3)' }}>
            {Object.entries(departmentCounts).map(([dept, count], index) => (
              <div key={index} style={{ marginBottom: 'var(--space-3)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-1)' }}>
                  <span>{dept}</span>
                  <span>{count} faculty</span>
                </div>
                <div style={{ 
                  height: '8px', 
                  background: 'var(--color-gray-300)', 
                  borderRadius: 'var(--radius-full)',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    height: '100%', 
                    width: `${(count / faculty.length) * 100}%`,
                    background: `var(--color-primary)`,
                    borderRadius: 'var(--radius-full)'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;