// Mock data for development purposes

// Student Data
export interface Student {
  id: string;
  name: string;
  attendance: number;
  subjects: string[];
  marks: { [subject: string]: number };
}

export const students: Student[] = [
  {
    id: 'S001',
    name: 'John Smith',
    attendance: 92,
    subjects: ['Mathematics', 'Physics', 'Computer Science'],
    marks: {
      'Mathematics': 85,
      'Physics': 78,
      'Computer Science': 92
    }
  },
  {
    id: 'S002',
    name: 'Emily Johnson',
    attendance: 88,
    subjects: ['Mathematics', 'Chemistry', 'Biology'],
    marks: {
      'Mathematics': 76,
      'Chemistry': 82,
      'Biology': 89
    }
  },
  {
    id: 'S003',
    name: 'Michael Brown',
    attendance: 95,
    subjects: ['Physics', 'Computer Science', 'English'],
    marks: {
      'Physics': 90,
      'Computer Science': 95,
      'English': 79
    }
  },
  {
    id: 'S004',
    name: 'Sarah Davis',
    attendance: 86,
    subjects: ['Mathematics', 'Biology', 'Chemistry'],
    marks: {
      'Mathematics': 72,
      'Biology': 88,
      'Chemistry': 75
    }
  },
  {
    id: 'S005',
    name: 'David Wilson',
    attendance: 78,
    subjects: ['English', 'History', 'Computer Science'],
    marks: {
      'English': 82,
      'History': 81,
      'Computer Science': 88
    }
  }
];

// Faculty Data
export interface Faculty {
  id: string;
  name: string;
  email: string;
  department: string;
  subjects: string[];
}

export const faculty: Faculty[] = [
  {
    id: 'F001',
    name: 'Dr. Robert Miller',
    email: 'r.miller@example.edu',
    department: 'Science',
    subjects: ['Physics', 'Mathematics']
  },
  {
    id: 'F002',
    name: 'Prof. Lisa Taylor',
    email: 'l.taylor@example.edu',
    department: 'Computer Science',
    subjects: ['Computer Science', 'Artificial Intelligence']
  },
  {
    id: 'F003',
    name: 'Dr. James Anderson',
    email: 'j.anderson@example.edu',
    department: 'Science',
    subjects: ['Chemistry', 'Biology']
  },
  {
    id: 'F004',
    name: 'Prof. Jennifer White',
    email: 'j.white@example.edu',
    department: 'Humanities',
    subjects: ['English', 'History']
  }
];

// Subjects Data
export interface Subject {
  id: string;
  name: string;
  department: string;
  faculty: string;
  credits: number;
}

export const subjects: Subject[] = [
  {
    id: 'SUB001',
    name: 'Mathematics',
    department: 'Science',
    faculty: 'Dr. Robert Miller',
    credits: 4
  },
  {
    id: 'SUB002',
    name: 'Physics',
    department: 'Science',
    faculty: 'Dr. Robert Miller',
    credits: 4
  },
  {
    id: 'SUB003',
    name: 'Computer Science',
    department: 'Computer Science',
    faculty: 'Prof. Lisa Taylor',
    credits: 3
  },
  {
    id: 'SUB004',
    name: 'Biology',
    department: 'Science',
    faculty: 'Dr. James Anderson',
    credits: 3
  },
  {
    id: 'SUB005',
    name: 'Chemistry',
    department: 'Science',
    faculty: 'Dr. James Anderson',
    credits: 4
  },
  {
    id: 'SUB006',
    name: 'English',
    department: 'Humanities',
    faculty: 'Prof. Jennifer White',
    credits: 2
  },
  {
    id: 'SUB007',
    name: 'History',
    department: 'Humanities',
    faculty: 'Prof. Jennifer White',
    credits: 2
  }
];

// Departments
export const departments = [
  'Science',
  'Computer Science',
  'Humanities',
  'Arts',
  'Business'
];

// Users for authentication
export interface User {
  id: string;
  username: string;
  password: string;
  role: 'admin' | 'faculty' | 'student';
  name: string;
  profile: any;
}

export const users: User[] = [
  {
    id: 'U001',
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    name: 'Admin User',
    profile: {}
  },
  {
    id: 'U002',
    username: 'faculty',
    password: 'faculty123',
    role: 'faculty',
    name: 'Dr. Robert Miller',
    profile: faculty[0]
  },
  {
    id: 'U003',
    username: 'student',
    password: 'student123',
    role: 'student',
    name: 'John Smith',
    profile: students[0]
  }
];