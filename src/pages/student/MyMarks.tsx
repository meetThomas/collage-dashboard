import React from 'react';
import Card from '../../components/Card';
import { useAuth } from '../../context/AuthContext';
import { Award, TrendingUp, BarChart3 } from 'lucide-react';

const MyMarks: React.FC = () => {
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
  
  // Find highest and lowest marks
  const highestMark = Math.max(...marks);
  const lowestMark = Math.min(...marks);
  
  // Find best and worst subjects
  const bestSubject = Object.entries(studentData.marks).reduce((best, [subject, mark]) => 
    mark > (best.mark || 0) ? { subject, mark } : best, { subject: '', mark: 0 }
  );
  
  const worstSubject = Object.entries(studentData.marks).reduce((worst, [subject, mark]) => 
    mark < (worst.mark || 101) ? { subject, mark } : worst, { subject: '', mark: 101 }
  );
  
  // Calculate grade
  const getGrade = (mark: number) => {
    if (mark >= 90) return 'A+';
    if (mark >= 80) return 'A';
    if (mark >= 70) return 'B';
    if (mark >= 60) return 'C';
    if (mark >= 50) return 'D';
    return 'F';
  };
  
  const averageGrade = getGrade(averageMarks);
  
  return (
    <div className="fade-in">
      <h2 style={{ marginBottom: 'var(--space-4)' }}>My Marks</h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: 'var(--space-4)',
        marginBottom: 'var(--space-4)'
      }}>
        <Card title="Overall Performance">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-4)' }}>
            <div style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: averageMarks >= 80 ? 'var(--color-success)' : 
                        averageMarks >= 60 ? 'var(--color-primary)' : 'var(--color-error)',
              color: 'white',
              fontSize: 'var(--font-size-3xl)',
              marginBottom: 'var(--space-3)'
            }}>
              {averageGrade}
            </div>
            <div style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-medium)' }}>
              Average Score: {averageMarks.toFixed(1)}
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 'var(--space-4)' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: 'var(--font-size-sm)', 
                color: 'var(--color-gray-600)',
                marginBottom: 'var(--space-1)'
              }}>
                Highest
              </div>
              <div style={{ 
                fontSize: 'var(--font-size-xl)', 
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--color-success)'
              }}>
                {highestMark}
              </div>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: 'var(--font-size-sm)', 
                color: 'var(--color-gray-600)',
                marginBottom: 'var(--space-1)'
              }}>
                Average
              </div>
              <div style={{ 
                fontSize: 'var(--font-size-xl)', 
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--color-primary)'
              }}>
                {averageMarks.toFixed(1)}
              </div>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: 'var(--font-size-sm)', 
                color: 'var(--color-gray-600)',
                marginBottom: 'var(--space-1)'
              }}>
                Lowest
              </div>
              <div style={{ 
                fontSize: 'var(--font-size-xl)', 
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--color-error)'
              }}>
                {lowestMark}
              </div>
            </div>
          </div>
          
          <div style={{ marginBottom: 'var(--space-3)' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center',
              marginBottom: 'var(--space-2)'
            }}>
              <TrendingUp size={18} style={{ color: 'var(--color-success)', marginRight: 'var(--space-2)' }} />
              <div>
                <span style={{ color: 'var(--color-gray-600)', fontSize: 'var(--font-size-sm)' }}>Best Subject: </span>
                <span style={{ fontWeight: 'var(--font-weight-medium)' }}>{bestSubject.subject}</span>
                <span style={{ color: 'var(--color-success)', marginLeft: 'var(--space-2)' }}>{bestSubject.mark}</span>
              </div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center'
            }}>
              <BarChart3 size={18} style={{ color: 'var(--color-error)', marginRight: 'var(--space-2)' }} />
              <div>
                <span style={{ color: 'var(--color-gray-600)', fontSize: 'var(--font-size-sm)' }}>Area for Improvement: </span>
                <span style={{ fontWeight: 'var(--font-weight-medium)' }}>{worstSubject.subject}</span>
                <span style={{ color: 'var(--color-error)', marginLeft: 'var(--space-2)' }}>{worstSubject.mark}</span>
              </div>
            </div>
          </div>
        </Card>
        
        <Card title="Mark Distribution">
          <div>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-4)' }}>
              <Award size={24} style={{ color: 'var(--color-primary)', marginBottom: 'var(--space-2)' }} />
              <div style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-medium)' }}>
                Subject-wise Performance
              </div>
            </div>
            
            {Object.entries(studentData.marks)
              .sort((a, b) => b[1] - a[1]) // Sort by mark (descending)
              .map(([subject, mark], index) => (
                <div key={index} style={{ marginBottom: index < Object.keys(studentData.marks).length - 1 ? 'var(--space-3)' : 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-1)' }}>
                    <div style={{ fontWeight: 'var(--font-weight-medium)' }}>{subject}</div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{
                        background: mark >= 80 ? 'var(--color-success)' : 
                                 mark >= 60 ? 'var(--color-primary)' : 'var(--color-error)',
                        color: 'white',
                        padding: '1px 6px',
                        borderRadius: 'var(--radius-md)',
                        fontSize: 'var(--font-size-xs)',
                        marginRight: 'var(--space-2)'
                      }}>
                        {getGrade(mark)}
                      </div>
                      <div style={{ 
                        fontWeight: 'var(--font-weight-bold)',
                        color: mark >= 80 ? 'var(--color-success)' : 
                              mark >= 60 ? 'var(--color-primary)' : 'var(--color-error)',
                        minWidth: '30px',
                        textAlign: 'right'
                      }}>
                        {mark}
                      </div>
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
      
      <Card title="Grading Scale">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <h4 style={{ marginBottom: 'var(--space-3)' }}>Grade Scale</h4>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ 
                    padding: 'var(--space-2)', 
                    textAlign: 'left', 
                    borderBottom: '1px solid var(--color-gray-300)'
                  }}>
                    Grade
                  </th>
                  <th style={{ 
                    padding: 'var(--space-2)', 
                    textAlign: 'left', 
                    borderBottom: '1px solid var(--color-gray-300)'
                  }}>
                    Range
                  </th>
                  <th style={{ 
                    padding: 'var(--space-2)', 
                    textAlign: 'left', 
                    borderBottom: '1px solid var(--color-gray-300)'
                  }}>
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: 'var(--space-2)', color: 'var(--color-success)', fontWeight: 'var(--font-weight-bold)' }}>A+</td>
                  <td style={{ padding: 'var(--space-2)' }}>90-100</td>
                  <td style={{ padding: 'var(--space-2)' }}>Outstanding</td>
                </tr>
                <tr>
                  <td style={{ padding: 'var(--space-2)', color: 'var(--color-success)', fontWeight: 'var(--font-weight-bold)' }}>A</td>
                  <td style={{ padding: 'var(--space-2)' }}>80-89</td>
                  <td style={{ padding: 'var(--space-2)' }}>Excellent</td>
                </tr>
                <tr>
                  <td style={{ padding: 'var(--space-2)', color: 'var(--color-primary)', fontWeight: 'var(--font-weight-bold)' }}>B</td>
                  <td style={{ padding: 'var(--space-2)' }}>70-79</td>
                  <td style={{ padding: 'var(--space-2)' }}>Good</td>
                </tr>
                <tr>
                  <td style={{ padding: 'var(--space-2)', color: 'var(--color-primary)', fontWeight: 'var(--font-weight-bold)' }}>C</td>
                  <td style={{ padding: 'var(--space-2)' }}>60-69</td>
                  <td style={{ padding: 'var(--space-2)' }}>Satisfactory</td>
                </tr>
                <tr>
                  <td style={{ padding: 'var(--space-2)', color: 'var(--color-warning)', fontWeight: 'var(--font-weight-bold)' }}>D</td>
                  <td style={{ padding: 'var(--space-2)' }}>50-59</td>
                  <td style={{ padding: 'var(--space-2)' }}>Pass</td>
                </tr>
                <tr>
                  <td style={{ padding: 'var(--space-2)', color: 'var(--color-error)', fontWeight: 'var(--font-weight-bold)' }}>F</td>
                  <td style={{ padding: 'var(--space-2)' }}>0-49</td>
                  <td style={{ padding: 'var(--space-2)' }}>Fail</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div style={{ flex: 1, minWidth: '200px' }}>
            <h4 style={{ marginBottom: 'var(--space-3)' }}>Your Performance</h4>
            <div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                padding: 'var(--space-3)',
                backgroundColor: 'rgba(76, 217, 100, 0.1)',
                borderRadius: 'var(--radius-md)',
                marginBottom: 'var(--space-3)'
              }}>
                <div style={{ 
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: averageMarks >= 80 ? 'var(--color-success)' : 
                           averageMarks >= 60 ? 'var(--color-primary)' : 'var(--color-error)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'var(--font-weight-bold)',
                  marginRight: 'var(--space-3)'
                }}>
                  {averageGrade}
                </div>
                <div>
                  <div style={{ fontWeight: 'var(--font-weight-medium)' }}>Your Average Grade</div>
                  <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-600)' }}>
                    Score: {averageMarks.toFixed(1)} / 100
                  </div>
                </div>
              </div>
              
              <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-700)' }}>
                <p>Your overall performance is <strong style={{ 
                  color: averageMarks >= 80 ? 'var(--color-success)' : 
                         averageMarks >= 60 ? 'var(--color-primary)' : 'var(--color-error)' 
                }}>{
                  averageMarks >= 80 ? 'excellent' : 
                  averageMarks >= 70 ? 'good' : 
                  averageMarks >= 60 ? 'satisfactory' : 
                  averageMarks >= 50 ? 'passing' : 'below passing'
                }</strong>.</p>
                
                {averageMarks < 60 && (
                  <p style={{ marginTop: 'var(--space-2)' }}>Focus on improving your marks in {worstSubject.subject} to enhance your overall grade.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MyMarks;