import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { User, BookOpen, ClipboardCheck, Award } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';

const StudentLayout: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const getPageTitle = () => {
    // Extract the page title from the location pathname
    const path = location.pathname.split('/').pop() || 'dashboard';
    const formatted = path.replace(/-/g, ' ');
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sidebarLinks = [
    {
      to: "/student/my-profile",
      icon: <User size={20} />,
      label: "My Profile"
    },
    {
      to: "/student/my-subjects",
      icon: <BookOpen size={20} />,
      label: "My Subjects"
    },
    {
      to: "/student/my-attendance",
      icon: <ClipboardCheck size={20} />,
      label: "My Attendance"
    },
    {
      to: "/student/my-marks",
      icon: <Award size={20} />,
      label: "My Marks"
    }
  ];

  return (
    <div className="dashboard-container">
      <Sidebar 
        title="Student Portal" 
        links={sidebarLinks} 
        onLogout={handleLogout} 
      />
      
      <div className="dashboard-content">
        <Header 
          title={getPageTitle()}
          username={currentUser?.name || 'Student'}
          role="Student"
          onLogout={handleLogout}
        />
        
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;