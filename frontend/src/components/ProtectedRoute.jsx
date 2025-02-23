import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children, isAuthenticated, userRole, requiredRole }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute 