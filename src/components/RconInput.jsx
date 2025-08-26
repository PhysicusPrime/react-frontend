import React, { useState, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';

export default function RconInput() {
  const [command, setCommand] = useState('');
  const [responses, setResponses] = useState('');

  // WebSocket-Verbindung
  const { sendMessage, lastMessage, readyState } = useWebSocket('ws://localhost:3001', {
    shouldReconnect: () => true, // reconnect bei Abbruch
  });

  // Neue Nachrichten vom Backend (RCON Antworten)
  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      if (data.rconResponse) {
        setResponses((prev) => prev + data.rconResponse + '\n');
      }
    }
  }, [lastMessage]);

  const sendCommand = () => {
    if (command && readyState === 1) { // nur senden wenn WS offen
      sendMessage(JSON.stringify({ command }));
      setCommand('');
    }
  };

  return (
    <div style={{ marginTop: '10px' }}>
      <textarea
        value={responses}
        readOnly
        style={{
          width: '100%',
          height: '200px',
          backgroundColor: '#111',
          color: '#0f0',
          padding: '10px',
          fontFamily: 'monospace',
          marginBottom: '10px'
        }}
      />
      <input
        type="text"
        value={command}
        placeholder="Enter RCON Command"
        onChange={(e) => setCommand(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendCommand()}
        style={{ width: '70%', padding: '5px' }}
      />
      <button onClick={sendCommand} style={{ padding: '5px 10px', marginLeft:'10px' }}>
        Send
      </button>
    </div>
  );
}
