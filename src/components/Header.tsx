import React, { useState } from 'react';
import { User, Settings, LogOut, Bell } from 'lucide-react';
import '../styles/components/Header.css';

interface HeaderProps {
  title: string;
  username: string;
  role: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, username, role, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.header-dropdown') && dropdownOpen) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <header className="header">
      <h1 className="header-title">{title}</h1>
      
      <div className="header-actions">
        <div 
          className={`header-dropdown ${dropdownOpen ? 'open' : ''}`} 
          onClick={toggleDropdown}
        >
          <div className="header-user">
            <div className="header-user-avatar">
              <User size={20} />
            </div>
            <div className="header-user-info">
              <div className="header-user-name">{username}</div>
              <div className="header-user-role">{role}</div>
            </div>
          </div>
          
          {dropdownOpen && (
            <div className="header-dropdown-menu">
              <a href="#" className="header-dropdown-item">
                <User size={16} />
                Profile
              </a>
              <a href="#" className="header-dropdown-item">
                <Settings size={16} />
                Settings
              </a>
              <a href="#" className="header-dropdown-item" onClick={onLogout}>
                <LogOut size={16} />
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;