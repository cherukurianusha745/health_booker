import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminUsers = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('users');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const [usersRes, doctorsRes] = await Promise.all([
        axios.get('/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('/api/admin/doctors', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);
      setUsers(usersRes.data);
      setDoctors(doctorsRes.data);
    } catch (err) {
      console.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveDoctor = async (doctorId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/admin/doctors/${doctorId}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Doctor approved successfully');
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to approve doctor');
    }
  };

  const handleRejectDoctor = async (doctorId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/admin/doctors/${doctorId}/reject`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Doctor rejected');
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to reject doctor');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('User deleted successfully');
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete user');
    }
  };

  const handleDeleteDoctor = async (doctorId) => {
    if (!window.confirm('Are you sure you want to delete this doctor?')) {
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/admin/doctors/${doctorId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Doctor deleted successfully');
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete doctor');
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'approved': return 'status-approved';
      case 'rejected': return 'status-rejected';
      default: return '';
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container py-5 fade-in">
      <h2 className="mb-4">Manage Users & Doctors</h2>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Users ({users.length})
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'doctors' ? 'active' : ''}`}
            onClick={() => setActiveTab('doctors')}
          >
            Doctors ({doctors.length})
          </button>
        </li>
      </ul>

      {activeTab === 'users' && (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.phone}</td>
                  <td>
                    {u.isAdmin ? (
                      <span className="badge bg-danger">Admin</span>
                    ) : u.isDoctor ? (
                      <span className="badge bg-success">Doctor</span>
                    ) : (
                      <span className="badge bg-primary">User</span>
                    )}
                  </td>
                  <td>
                    {!u.isAdmin && (
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteUser(u._id)}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'doctors' && (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Specialty</th>
                <th>Experience</th>
                <th>Fees</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor._id}>
                  <td>Dr. {doctor.firstName} {doctor.lastName}</td>
                  <td>{doctor.specialty}</td>
                  <td>{doctor.experience}</td>
                  <td>${doctor.fees}</td>
                  <td>
                    <span className={`status-badge ${getStatusBadgeClass(doctor.status)}`}>
                      {doctor.status.charAt(0).toUpperCase() + doctor.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    {doctor.status === 'pending' && (
                      <>
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() => handleApproveDoctor(doctor._id)}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleRejectDoctor(doctor._id)}
                        >
                          Reject
                        </button>
                      </>
                    )}
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteDoctor(doctor._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
