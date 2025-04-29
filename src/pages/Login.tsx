import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, User, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const result = await login(username, password);
      
      if (result.success) {
        // Redirect based on user role
        const role = username === 'admin' ? 'admin' : 
                    username === 'faculty' ? 'faculty' : 'student';
                    
        navigate(`/${role}/${role === 'admin' ? 'dashboard' : 
                           role === 'faculty' ? 'my-students' : 'my-profile'}`);
      } else {
        setError(result.message || 'Failed to login');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center" style={{
      background: 'linear-gradient(135deg, var(--color-primary-light), var(--color-secondary))'
    }}>
      <div className="card" style={{ maxWidth: '400px', width: '90%', animation: 'fadeIn 0.8s' }}>
        <div className="text-center mb-5">
          <div style={{ 
            margin: '0 auto',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            marginBottom: 'var(--space-4)'
          }}>
            <User size={40} />
          </div>
          <h2 className="card-title text-center" style={{ marginBottom: 'var(--space-2)' }}>Educational Management System</h2>
          <p style={{ color: 'var(--color-gray-600)' }}>Sign in to your account</p>
        </div>
        
        {error && (
          <div style={{ 
            padding: 'var(--space-3)',
            backgroundColor: 'rgba(255, 59, 48, 0.1)',
            color: 'var(--color-error)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--space-4)'
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                id="username"
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{ paddingLeft: 'var(--space-8)' }}
              />
              <div style={{ 
                position: 'absolute', 
                left: 'var(--space-3)', 
                top: '50%', 
                transform: 'translateY(-50%)',
                color: 'var(--color-gray-600)'
              }}>
                <User size={18} />
              </div>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                id="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ paddingLeft: 'var(--space-8)' }}
              />
              <div style={{ 
                position: 'absolute', 
                left: 'var(--space-3)', 
                top: '50%', 
                transform: 'translateY(-50%)',
                color: 'var(--color-gray-600)'
              }}>
                <Lock size={18} />
              </div>
            </div>
          </div>
          
          <div className="form-group" style={{ marginTop: 'var(--space-5)' }}>
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              disabled={loading}
            >
              {loading ? (
                <span>Loading...</span>
              ) : (
                <>
                  <LogIn size={18} style={{ marginRight: 'var(--space-2)' }} />
                  Sign In
                </>
              )}
            </button>
          </div>
        </form>
        
        <div style={{ marginTop: 'var(--space-4)', textAlign: 'center', fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-600)' }}>
          <p>Demo Accounts:</p>
          <p>Admin: admin / admin123</p>
          <p>Faculty: faculty / faculty123</p>
          <p>Student: student / student123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;