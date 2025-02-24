import { useState } from 'react'
import axiosInstance from '../utils/axios'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

function EmployeeDashboard({ onLogout }) {
  const [lwd, setLwd] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [resignationStatus, setResignationStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!lwd) {
      setError('Please select a last working day')
      return
    }

    try {
      const response = await axiosInstance.post('/api/user/resign', {
        lwd: lwd.toISOString().split('T')[0]
      })

      setSuccess('Resignation submitted successfully')
      setError('')
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                         err.response?.data?.error || 
                         'Failed to submit resignation'
      setError(errorMessage)
      setSuccess('')
    }
  }

  return (
    <div className="container">
      <div className="nav">
        <div className="nav-content">
          <h1 className="nav-brand">Employee Dashboard</h1>
          <button className="btn btn-danger" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="card">
        <h2>Submit Resignation</h2>
        {error && (
          <div className="notification notification-error">{error}</div>
        )}
        {success && (
          <div className="notification notification-success">{success}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Last Working Day</label>
            <DatePicker
              selected={lwd}
              onChange={(date) => setLwd(date)}
              dateFormat="yyyy-MM-dd"
              minDate={new Date()}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit Resignation
          </button>
        </form>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
