import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const useSocket = () => {
	const [isConnected, setIsConnected] = useState<boolean>(false);
	const [socketID, setSocketID] = useState('');

	useEffect(() => {
		const socket = io('http://localhost:3001');
		socket.on('connect', () => {
			socket.on('socket_id', (id: string) => {
				setSocketID(id);
				setIsConnected(true);
			});
		});

		socket.on('disconnect', () => {
			setIsConnected(false);
		});

		return () => {
			socket.off('connect');
			socket.off('socket_id');
			socket.off('disconnect');
		};
	}, []);

	return { isConnected, socketID };
};

export default useSocket;
