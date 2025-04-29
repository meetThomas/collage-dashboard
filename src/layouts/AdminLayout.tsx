import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, LogOut, GraduationCap } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';

const AdminLayout: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const getPageTitle = () => {
    // Extract the page title from the location pathname
    const path = location.pathname.split('/').pop() || 'dashboard';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sidebarLinks = [
    {
      to: "/admin/dashboard",
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard"
    },
    {
      to: "/admin/students",
      icon: <GraduationCap size={20} />,
      label: "Students"
    },
    {
      to: "/admin/faculty",
      icon: <Users size={20} />,
      label: "Faculty"
    },
    {
      to: "/admin/subjects",
      icon: <BookOpen size={20} />,
      label: "Subjects"
    }
  ];

  return (
    <div className="dashboard-container">
      <Sidebar 
        title="Admin Panel" 
        links={sidebarLinks} 
        onLogout={handleLogout} 
      />
      
      <div className="dashboard-content">
        <Header 
          title={getPageTitle()}
          username={currentUser?.name || 'Admin'}
          role="Administrator"
          onLogout={handleLogout}
        />
        
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;