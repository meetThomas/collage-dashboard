import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Layouts
import AdminLayout from './layouts/AdminLayout';
import FacultyLayout from './layouts/FacultyLayout';
import StudentLayout from './layouts/StudentLayout';

// Pages - Admin
import AdminDashboard from './pages/admin/Dashboard';
import Students from './pages/admin/Students';
import Faculty from './pages/admin/Faculty';
import Subjects from './pages/admin/Subjects';

// Pages - Faculty
import MyStudents from './pages/faculty/MyStudents';
import AddAttendance from './pages/faculty/AddAttendance';
import AddMarks from './pages/faculty/AddMarks';
import FacultySubjects from './pages/faculty/Subjects';

// Pages - Student
import MyProfile from './pages/student/MyProfile';
import MySubjects from './pages/student/MySubjects';
import MyAttendance from './pages/student/MyAttendance';
import MyMarks from './pages/student/MyMarks';

// Auth Pages
import Login from './pages/Login';

// Styles
import './styles/global.css';

// Protected Route Component
const ProtectedRoute = ({ 
  element, 
  allowedRoles 
}: { 
  element: React.ReactNode, 
  allowedRoles: string[] 
}) => {
  const { isAuthenticated, currentUser } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles.length > 0 && currentUser && !allowedRoles.includes(currentUser.role)) {
    // Redirect to appropriate dashboard based on role
    if (currentUser.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (currentUser.role === 'faculty') {
      return <Navigate to="/faculty/my-students" replace />;
    } else if (currentUser.role === 'student') {
      return <Navigate to="/student/my-profile" replace />;
    }
  }
  
  return <>{element}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute 
              element={<AdminLayout />} 
              allowedRoles={['admin']} 
            />
          }>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="students" element={<Students />} />
            <Route path="faculty" element={<Faculty />} />
            <Route path="subjects" element={<Subjects />} />
            <Route path="" element={<Navigate to="/admin/dashboard" replace />} />
          </Route>
          
          {/* Faculty Routes */}
          <Route path="/faculty" element={
            <ProtectedRoute 
              element={<FacultyLayout />} 
              allowedRoles={['faculty']} 
            />
          }>
            <Route path="my-students" element={<MyStudents />} />
            <Route path="add-attendance" element={<AddAttendance />} />
            <Route path="add-marks" element={<AddMarks />} />
            <Route path="subjects" element={<FacultySubjects />} />
            <Route path="" element={<Navigate to="/faculty/my-students" replace />} />
          </Route>
          
          {/* Student Routes */}
          <Route path="/student" element={
            <ProtectedRoute 
              element={<StudentLayout />} 
              allowedRoles={['student']} 
            />
          }>
            <Route path="my-profile" element={<MyProfile />} />
            <Route path="my-subjects" element={<MySubjects />} />
            <Route path="my-attendance" element={<MyAttendance />} />
            <Route path="my-marks" element={<MyMarks />} />
            <Route path="" element={<Navigate to="/student/my-profile" replace />} />
          </Route>
          
          {/* Root Redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Catch All */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;