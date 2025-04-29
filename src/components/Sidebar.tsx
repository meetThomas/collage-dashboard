import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import '../styles/components/Sidebar.css';

interface SidebarLink {
  to: string;
  icon: React.ReactNode;
  label: string;
}

interface SidebarProps {
  title: string;
  links: SidebarLink[];
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ title, links, onLogout }) => {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button 
        className="sidebar-toggle" 
        onClick={toggleSidebar}
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <h1>{title}</h1>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            {links.map((link, index) => (
              <li key={index} className="sidebar-nav-item">
                <NavLink 
                  to={link.to} 
                  className={({ isActive }) => 
                    `sidebar-nav-link ${isActive ? 'active' : ''}`
                  }
                  onClick={() => window.innerWidth <= 768 && setIsOpen(false)}
                >
                  <span className="sidebar-nav-link-icon">{link.icon}</span>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <button 
            className="btn btn-outline" 
            style={{ width: '100%', color: 'white', borderColor: 'white' }} 
            onClick={onLogout}
          >
            <LogOut size={18} style={{ marginRight: 'var(--space-2)' }} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;