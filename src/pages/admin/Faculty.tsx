import React, { useState } from 'react';
import Table from '../../components/Table';
import Card from '../../components/Card';
import { faculty, Faculty, departments } from '../../data/mockData';
import { Search, Plus, X } from 'lucide-react';

const FacultyPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    subject: ''
  });
  
  // Filter faculty based on search term
  const filteredFaculty = faculty.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.department.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would add the faculty member to the database
    console.log('New faculty data:', formData);
    // Reset form and hide it
    setFormData({ name: '', email: '', department: '', subject: '' });
    setShowAddForm(false);
  };
  
  const columns = [
    { header: 'ID', accessor: 'id', width: '10%' },
    { header: 'Name', accessor: 'name', width: '25%' },
    { header: 'Email', accessor: 'email', width: '25%' },
    { header: 'Department', accessor: 'department', width: '15%' },
    { 
      header: 'Subjects', 
      accessor: (faculty: Faculty) => (
        <div>
          {faculty.subjects.map((subject, index) => (
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
        <h2>Faculty</h2>
        <button 
          className="btn btn-primary" 
          style={{ display: 'flex', alignItems: 'center' }}
          onClick={() => setShowAddForm(true)}
        >
          <Plus size={18} style={{ marginRight: 'var(--space-2)' }} />
          Add Faculty
        </button>
      </div>
      
      {showAddForm && (
        <Card title="Add New Faculty Member">
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
              <h3 style={{ margin: 0 }}>New Faculty Details</h3>
              <button 
                type="button" 
                className="btn btn-outline"
                onClick={() => setShowAddForm(false)}
                style={{ padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={20} />
              </button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="input"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="input"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="department" className="form-label">Department</label>
                <select
                  id="department"
                  name="department"
                  className="select"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="subject" className="form-label">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="input"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div style={{ marginTop: 'var(--space-4)', display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
              <button 
                type="button" 
                className="btn btn-outline"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save Faculty
              </button>
            </div>
          </form>
        </Card>
      )}
      
      <Card title="">
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <input
              type="text"
              className="input"
              placeholder="Search faculty by name, ID, or department..."
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
          data={filteredFaculty}
          keyField="id"
        />
      </Card>
    </div>
  );
};

export default FacultyPage;