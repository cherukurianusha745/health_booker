import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DoctorDashboard = ({ user }) => {
  const [appointments, setAppointments] = useState([]);
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('appointments');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Fetch doctor profile
      const profileRes = await axios.get('/api/doctors/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDoctorProfile(profileRes.data);

      // Fetch appointments
      const appointmentsRes = await axios.get('/api/doctors/appointments', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(appointmentsRes.data);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (appointmentId, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/doctors/appointments/${appointmentId}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Refresh appointments after update
      fetchData();
    } catch (err) {
      console.error('Failed to update appointment:', err);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  // Filter appointments by status
  const pendingAppointments = appointments.filter(a => a.status === 'pending');
  const approvedAppointments = appointments.filter(a => a.status === 'approved');
  const completedAppointments = appointments.filter(a => a.status === 'completed');

  return (
    <div className="container py-5 fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Doctor Dashboard</h1>
        <Link to="/doctor/profile" className="btn btn-primary">
          <i className="fas fa-user-md me-2"></i> My Profile
        </Link>
      </div>

      {/* Welcome Message */}
      <div className="card mb-4">
        <div className="card-body">
          <h5>Welcome, Dr. {doctorProfile?.firstName} {doctorProfile?.lastName}!</h5>
          <p className="text-muted mb-0">
            Specialty: {doctorProfile?.specialty} | Experience: {doctorProfile?.experience} years
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="dashboard-stats mb-4">
        <div className="stat-card">
          <h2>{pendingAppointments.length}</h2>
          <p>Pending Requests</p>
        </div>
        <div className="stat-card">
          <h2>{approvedAppointments.length}</h2>
          <p>Approved Appointments</p>
        </div>
        <div className="stat-card">
          <h2>{completedAppointments.length}</h2>
          <p>Completed</p>
        </div>
        <div className="stat-card">
          <h2>{appointments.length}</h2>
          <p>Total Appointments</p>
        </div>
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'appointments' ? 'active' : ''}`}
            onClick={() => setActiveTab('appointments')}
          >
            Appointment Requests
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'patients' ? 'active' : ''}`}
            onClick={() => setActiveTab('patients')}
          >
            Patient Requests
          </button>
        </li>
      </ul>

      {/* Appointment Requests Tab */}
      {activeTab === 'appointments' && (
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Appointment Requests</h5>
          </div>
          <div className="card-body">
            {pendingAppointments.length === 0 ? (
              <p className="text-muted">No pending appointment requests.</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Patient Name</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingAppointments.map(appointment => (
                      <tr key={appointment._id}>
                        <td>{appointment.userId?.name || 'Unknown'}</td>
                        <td>{new Date(appointment.date).toLocaleDateString()}</td>
                        <td>{appointment.time}</td>
                        <td>
                          <span className="badge bg-warning">{appointment.status}</span>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-success me-2"
                            onClick={() => handleStatusUpdate(appointment._id, 'approved')}
                          >
                            Approve
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleStatusUpdate(appointment._id, 'rejected')}
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Patient Requests Tab */}
      {activeTab === 'patients' && (
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">All Patient Requests</h5>
          </div>
          <div className="card-body">
            {appointments.length === 0 ? (
              <p className="text-muted">No patient requests yet.</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Patient Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map(appointment => (
                      <tr key={appointment._id}>
                        <td>{appointment.userId?.name || 'Unknown'}</td>
                        <td>{appointment.userId?.email || 'N/A'}</td>
                        <td>{appointment.userId?.phone || 'N/A'}</td>
                        <td>{new Date(appointment.date).toLocaleDateString()}</td>
                        <td>
                          <span className={`badge bg-${
                            appointment.status === 'approved' ? 'success' : 
                            appointment.status === 'pending' ? 'warning' : 
                            appointment.status === 'completed' ? 'info' : 'danger'
                          }`}>
                            {appointment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;
