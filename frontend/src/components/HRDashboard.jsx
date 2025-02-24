import { useState, useEffect } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

function HRDashboard({ onLogout }) {
  const [resignations, setResignations] = useState([])
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    // Set default axios configuration
    axios.defaults.baseURL = 'https://mail-project.onrender.com'
    fetchResignations()
  }, [])

  const fetchResignations = async () => {
    try {
      const response = await axios.get('/api/admin/resignations', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setResignations(response.data.data)
    } catch (err) {
      setError('Failed to fetch resignations')
    }
  }

  const handleResignation = async (resignationId, approved, lwd) => {
    try {
      await axios.put('/api/admin/conclude_resignation', {
        resignationId,
        approved,
        lwd: lwd?.toISOString().split('T')[0]
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setSuccess('Resignation request updated successfully')
      setError('')
      fetchResignations()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update resignation')
      setSuccess('')
    }
  }

  return (
    <div className="container">
      <div className="nav">
        <div className="nav-content">
          <h1 className="nav-brand">HR Dashboard</h1>
          <button className="btn btn-danger" onClick={onLogout}>Logout</button>
        </div>
      </div>

      <div className="card">
        <h2>Resignation Requests</h2>
        {error && <div className="notification notification-error">{error}</div>}
        {success && <div className="notification notification-success">{success}</div>}
        
        <table className="hr-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Last Working Day</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {resignations.map(resignation => (
              <tr key={resignation._id}>
                <td>{resignation.employeeName}</td>
                <td>{new Date(resignation.lwd).toLocaleDateString()}</td>
                <td>
                  <span className={`status-badge status-${resignation.status}`}>
                    {resignation.status}
                  </span>
                </td>
                <td>
                  {resignation.status === 'pending' && (
                    <div>
                      <button
                        className="btn btn-success"
                        onClick={() => handleResignation(resignation._id, true, new Date(resignation.lwd))}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleResignation(resignation._id, false)}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default HRDashboard 