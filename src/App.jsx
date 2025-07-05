import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicPage from './pages/PublicPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import Layout from './pages/Layout';
import AuthLayout from './pages/AuthLayout';
import ProtectedRoute from './components/ProtectedRoute';
import AnalyticsPage from './pages/AnalyticsPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import UpdatePasswordPage from './pages/UpdatePasswordPage';
import UserManagementPage from './pages/UserManagementPage';
import MuralPage from './pages/MuralPage';
import PostManagementPage from './pages/PostManagementPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Layout para páginas públicas e de autenticação */}
                <Route element={<AuthLayout />}>
                    <Route path="/" element={<PublicPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/update-password" element={<UpdatePasswordPage />} />
                    <Route path="/mural" element={<MuralPage />} />
                </Route>

                {/* Layout principal para páginas de admin */}
                <Route element={<Layout />}>
                    <Route
                        path="/admin/dashboard"
                        element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}
                    />
                    <Route
                        path="/admin/analytics"
                        element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>}
                    />
                    <Route
                        path="/admin/users"
                        element={
                            <ProtectedRoute requiredRole="admin">
                                <UserManagementPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/posts"
                        element={
                            <ProtectedRoute>
                                <PostManagementPage />
                            </ProtectedRoute>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;