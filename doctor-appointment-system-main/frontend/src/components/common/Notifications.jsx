import React from 'react';

const Notifications = ({ notifications, onClose }) => {
  return (
    <div className="notifications-container">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Notifications</h5>
          <button className="btn-close" onClick={onClose}></button>
        </div>
        <div className="card-body">
          {notifications.length === 0 ? (
            <p className="text-muted text-center">No notifications</p>
          ) : (
            <ul className="list-group">
              {notifications.map((notification, index) => (
                <li key={index} className="list-group-item">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-1">{notification.title}</h6>
                      <p className="mb-0 text-muted">{notification.message}</p>
                    </div>
                    <small className="text-muted">{notification.time}</small>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
