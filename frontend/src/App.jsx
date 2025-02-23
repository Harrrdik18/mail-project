import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Login from './components/Login'
import Register from './components/Register'
import EmployeeDashboard from './components/EmployeeDashboard'
import HRDashboard from './components/HRDashboard'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState(null)

  const handleLogin = (token, role) => {
    localStorage.setItem('token', token)
    setIsAuthenticated(true)
    setUserRole(role)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    setUserRole(null)
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          <Login onLogin={handleLogin} />
        } />
        <Route path="/register" element={
          <Register />
        } />
        
        <Route path="/employee/*" element={
          <ProtectedRoute isAuthenticated={isAuthenticated} userRole="employee">
            <EmployeeDashboard onLogout={handleLogout} />
          </ProtectedRoute>
        } />

        <Route path="/hr/*" element={
          <ProtectedRoute isAuthenticated={isAuthenticated} userRole="hr">
            <HRDashboard onLogout={handleLogout} />
          </ProtectedRoute>
        } />

        <Route path="/" element={
          <Navigate to="/login" replace />
        } />
      </Routes>
    </Router>
  )
}

export default App
