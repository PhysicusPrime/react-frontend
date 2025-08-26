import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ display: 'flex', padding: '10px', backgroundColor: '#222', color: '#fff' }}>
      <Link to="/" style={{ marginRight: '20px', color: '#0f0' }}>Dashboard</Link>
      <Link to="/logs" style={{ marginRight: '20px', color: '#0f0' }}>Logs</Link>
      <Link to="/rcon" style={{ marginRight: '20px', color: '#0f0' }}>RCON</Link>
    </nav>
  );
}
