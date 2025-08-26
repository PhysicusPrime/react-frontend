import useWebSocket from 'react-use-websocket';

export const useServerWS = (url) => {
  return useWebSocket(url, {
    shouldReconnect: () => true,
  });
};
