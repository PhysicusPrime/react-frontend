import React, { useState } from 'react';
import useWebSocket from 'react-use-websocket';

export default function LogViewer() {
  const [logs, setLogs] = useState('');

  // useWebSocket liefert ein Objekt zurück
  const { lastMessage } = useWebSocket('ws://localhost:3001', {
    shouldReconnect: () => true,  // bei Verbindungsabbruch automatisch reconnecten
  });

  // Wenn eine neue Nachricht eintrifft, aktualisiere Logs
  React.useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      if (data.log) setLogs(data.log);
    }
  }, [lastMessage]);

  return (
    <textarea
      value={logs}
      readOnly
      style={{
        width: '100%',
        height: '400px',
        backgroundColor: '#000',
        color: '#0f0',
        padding: '10px',
        fontFamily: 'monospace'
      }}
    />
  );
}
