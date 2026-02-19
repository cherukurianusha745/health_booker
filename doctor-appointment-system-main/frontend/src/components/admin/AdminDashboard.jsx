import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = ({ user }) => {
  const [stats, setStats] = useState({
    usersCount: 0,
    doctorsCount: 0,
    appointmentsCount: 0,
    pendingAppointments: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('/api/admin/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="container py-5 fade-in">
      <h1 className="mb-4">Admin Dashboard</h1>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <h2>{stats.usersCount}</h2>
          <p>Total Users</p>
          <Link to="/admin/users" className="btn btn-sm btn-primary mt-2">
            View Users
          </Link>
        </div>
        
        <div className="stat-card">
          <h2>{stats.doctorsCount}</h2>
          <p>Approved Doctors</p>
          <Link to="/admin/users" className="btn btn-sm btn-success mt-2">
            View Doctors
          </Link>
        </div>
        
        <div className="stat-card">
          <h2>{stats.appointmentsCount}</h2>
          <p>Total Appointments</p>
          <Link to="/admin/appointments" className="btn btn-sm btn-info mt-2">
            View Appointments
          </Link>
        </div>
        
        <div className="stat-card">
          <h2>{stats.pendingAppointments}</h2>
          <p>Pending Appointments</p>
          <Link to="/admin/appointments" className="btn btn-sm btn-warning mt-2">
            Review
          </Link>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <Link to="/admin/users" className="btn btn-outline-primary">
                  <i className="fas fa-users me-2"></i> Manage Users
                </Link>
                <Link to="/admin/appointments" className="btn btn-outline-success">
                  <i className="fas fa-calendar-check me-2"></i> Manage Appointments
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">System Info</h5>
            </div>
            <div className="card-body">
              <p><strong>Version:</strong> 1.0.0</p>
              <p><strong>Platform:</strong> DocSpot</p>
              <p><strong>Status:</strong> <span className="text-success">Running</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
