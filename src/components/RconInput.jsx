import React, { useState } from 'react';
import useWebSocket from 'react-use-websocket';

export default function RconInput() {
  const [command, setCommand] = useState('');
  const ws = useWebSocket('ws://localhost:3001');

  const sendCommand = () => {
    if(command && ws.readyState === 1) {
      ws.send(JSON.stringify({ command }));
      setCommand('');
    }
  };

  return (
    <div style={{ marginTop: '10px' }}>
      <input
        type="text"
        value={command}
        placeholder="Enter RCON Command"
        onChange={(e) => setCommand(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendCommand()}
        style={{ width: '70%', padding: '5px' }}
      />
      <button onClick={sendCommand} style={{ padding: '5px 10px', marginLeft:'10px' }}>Send</button>
    </div>
  );
}
