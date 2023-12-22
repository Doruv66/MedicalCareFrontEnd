import React, { createContext, useContext, useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import Toasts from '../Toasts/Toasts';

const WebSocketContext = createContext(null);

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children, user }) => {
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    if (!user) return; // Don't connect if the user is not defined

    const client = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = () => {
      console.log('Connected to WebSocket');
      client.subscribe(`/user/${user.accountId}/queue/notifications`, (data) => {
        const notification = JSON.parse(data.body);
        console.log('Notification received:', notification);
        Toasts.info(<a href="/schedule" style={{textDecoration: 'none', color: '#fff'}}>{notification.content}</a>)
      });
    };

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
    };
  }, [user]);

  return (
    <WebSocketContext.Provider value={stompClient}>
      {children}
    </WebSocketContext.Provider>
  );
};