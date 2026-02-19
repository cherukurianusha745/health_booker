import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminAppointments = ({ user }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('/api/admin/appointments', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(data);
    } catch (err) {
      console.error('Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'approved': return 'status-approved';
      case 'rejected': return 'status-rejected';
      case 'completed': return 'status-completed';
      case 'cancelled': return 'status-cancelled';
      default: return '';
    }
  };

  if (loading) {
    return <div className="loading">Loading appointments...</div>;
  }

  return (
    <div className="container py-5 fade-in">
      <h2 className="mb-4">All Appointments</h2>

      {appointments.length === 0 ? (
        <div className="text-center py-5">
          <i className="fas fa-calendar-times fa-4x text-muted mb-3"></i>
          <h4 className="text-muted">No appointments found</h4>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>
                    {appointment.userId?.name || 'N/A'}
                    <br />
                    <small className="text-muted">{appointment.userId?.email}</small>
                  </td>
                  <td>
                    {appointment.doctorId ? (
                      <>
                        Dr. {appointment.doctorId.firstName} {appointment.doctorId.lastName}
                        <br />
                        <small className="text-muted">{appointment.doctorId.specialty}</small>
                      </>
                    ) : (
                      appointment.doctorInfo
                    )}
                  </td>
                  <td>{new Date(appointment.date).toLocaleDateString()}</td>
                  <td>{appointment.time}</td>
                  <td>
                    <span className={`status-badge ${getStatusBadgeClass(appointment.status)}`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                  </td>
                  <td>{new Date(appointment.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminAppointments;
