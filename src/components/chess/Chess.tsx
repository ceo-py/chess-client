import useSocket from '../../hooks/useSocket';
import Board from './Board';
import styles from './chess.module.scss';

const Chess = () => {
	const { isConnected, lastPong, sendPing } = useSocket();

	return (
		<main className={styles['chess__wrapper']}>
			<Board />
			<div>
				<p>Connected: {'' + isConnected}</p>
				<p>Last pong: {lastPong || '-'}</p>
				<button onClick={sendPing}>Send ping</button>
			</div>
		</main>
	);
};

export default Chess;
