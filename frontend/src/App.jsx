import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import Login from './pages/Login.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import SponsorDashboard from './pages/sponsor/SponsorDashboard.jsx'
import UsersPage from './pages/users/UsersPage.jsx'
import StudentsPage from './pages/students/StudentsPage.jsx'
import GuardiansPage from './pages/guardians/GuardiansPage.jsx'
import SponsorsPage from './pages/sponsors/SponsorsPage.jsx'
import ReportsPage from './pages/reports/ReportsPage.jsx'
import Layout from './components/Layout.jsx'

function Protected({ children, roles }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />
  return children
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Protected><AdminDashboard /></Protected>} />
          <Route path="admin" element={<Protected roles={["ADMIN"]}><AdminDashboard /></Protected>} />
          <Route path="sponsor" element={<Protected roles={["SPONSOR"]}><SponsorDashboard /></Protected>} />
          <Route path="users" element={<Protected roles={["ADMIN"]}><UsersPage /></Protected>} />
          <Route path="students" element={<Protected><StudentsPage /></Protected>} />
          <Route path="guardians" element={<Protected roles={["ADMIN"]}><GuardiansPage /></Protected>} />
          <Route path="sponsors" element={<Protected><SponsorsPage /></Protected>} />
          <Route path="reports" element={<Protected><ReportsPage /></Protected>} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}
