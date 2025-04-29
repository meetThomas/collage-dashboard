import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Users, ClipboardCheck, Award, BookOpen } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';

const FacultyLayout: React.FC = () => {
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
      to: "/faculty/my-students",
      icon: <Users size={20} />,
      label: "My Students"
    },
    {
      to: "/faculty/add-attendance",
      icon: <ClipboardCheck size={20} />,
      label: "Add Attendance"
    },
    {
      to: "/faculty/add-marks",
      icon: <Award size={20} />,
      label: "Add Marks"
    },
    {
      to: "/faculty/subjects",
      icon: <BookOpen size={20} />,
      label: "My Subjects"
    }
  ];

  return (
    <div className="dashboard-container">
      <Sidebar 
        title="Faculty Portal" 
        links={sidebarLinks} 
        onLogout={handleLogout} 
      />
      
      <div className="dashboard-content">
        <Header 
          title={getPageTitle()}
          username={currentUser?.name || 'Faculty'}
          role="Faculty Member"
          onLogout={handleLogout}
        />
        
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default FacultyLayout;