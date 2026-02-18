import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './features/auth/Login';
import DashboardLayout from './layout/Dashboard';
import DashboardHome from './features/dashboard/DashboardHome';
import Students from './features/students/Students';
import Classes from './features/classes/Classes';
import Fees from './features/fees/Fees';
import Exams from './features/exams/Exams';
import Settings from './features/settings/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="students" element={<Students />} />
          <Route path="classes" element={<Classes />} />
          <Route path="fees" element={<Fees />} />
          <Route path="exams" element={<Exams />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
