import React from 'react';
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const { logOut, user } = useAuth();

  // تنسيق الصفحة
  const homeStyle = {
    display: 'flex',
    flexDirection: 'column',  // لجعل البيانات تظهر بشكل عمودي
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    fontSize: '1.5rem',
    color: '#333',
    padding: '20px',
    textAlign: 'center',
  };

  const buttonStyle = {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#9414FF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
  };

  return (
    <div style={homeStyle}>
      <h1>Welcome, {user?.name}</h1>
      <p>Email: {user?.email}</p>
      <p>Roles: {user?.roles.join(', ')}</p>
      <p>Organization ID: {user?.organizationId}</p>
      <p>Shop ID: {user?.shopId}</p>
      <p>Is Employee: {user?.isEmployee ? 'Yes' : 'No'}</p>

      {/* زر تسجيل الخروج */}
      <button style={buttonStyle} onClick={logOut}>
        Log Out
      </button>
    </div>
  );
}
