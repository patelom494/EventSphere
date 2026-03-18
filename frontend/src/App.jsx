import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthPage from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import Loader from './components/ui/Loader';

const PrivateRoute = ({ children, role }) => {
    const { user } = useAuth();
    
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    
    if (role && user.role !== role) {
        return <Navigate to={user.role === 'admin' ? '/admin' : '/employee'} replace />;
    }
    
    return children;
};

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    {/* Public Route */}
                    <Route path="/login" element={<AuthPage />} />
                    
                    {/* Protected Admin Routes */}
                    <Route 
                        path="/admin" 
                        element={
                            <PrivateRoute role="admin">
                                <AdminDashboard />
                            </PrivateRoute>
                        } 
                    />
                    
                    {/* Protected Employee Routes */}
                    <Route 
                        path="/employee" 
                        element={
                            <PrivateRoute role="employee">
                                <EmployeeDashboard />
                            </PrivateRoute>
                        } 
                    />
                    
                    {/* Default Redirects */}
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
