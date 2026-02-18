import { useNavigate, Link, Outlet, useLocation } from 'react-router-dom';

export default function DashboardLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    const isActive = (path: string) => location.pathname === path ? 'bg-blue-900' : 'hover:bg-blue-700';

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-blue-800 text-white flex flex-col">
                <div className="p-4 text-xl font-bold border-b border-blue-700">School Desk</div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link to="/dashboard" className={`block py-2 px-4 rounded ${isActive('/dashboard')}`}>Dashboard</Link>
                    <Link to="/dashboard/students" className={`block py-2 px-4 rounded ${isActive('/dashboard/students')}`}>Students</Link>
                    <Link to="/dashboard/classes" className={`block py-2 px-4 rounded ${isActive('/dashboard/classes')}`}>Classes</Link>
                    <Link to="/dashboard/fees" className={`block py-2 px-4 rounded ${isActive('/dashboard/fees')}`}>Fees</Link>
                    <Link to="/dashboard/exams" className={`block py-2 px-4 rounded ${isActive('/dashboard/exams')}`}>Exams</Link>
                    <Link to="/dashboard/settings" className={`block py-2 px-4 rounded ${isActive('/dashboard/settings')}`}>Settings</Link>
                </nav>
                <div className="p-4 border-t border-blue-700">
                    <div className="text-sm opacity-75">Logged in as:</div>
                    <div className="font-bold">{user?.username} ({user?.role})</div>
                    <button
                        onClick={handleLogout}
                        className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded text-sm transition-colors cursor-pointer"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto flex flex-col">
                <header className="bg-white shadow p-4 flex justify-between items-center">
                    <h1 className="text-2xl font-semibold text-gray-800">School Management System</h1>
                </header>
                <main className="flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
