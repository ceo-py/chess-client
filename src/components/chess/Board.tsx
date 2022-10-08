import { FC, useState } from 'react';
import { IBoard, ISquare } from '../../interfaces/Chess.types';
import Square from './Square';

import styles from './chess.module.scss';

const Board: FC<IBoard> = ({ data }) => {
	const [move, setMove] = useState(0);
	const [target, setTarget] = useState(-1);

	const changeSelection = (pos: number, col: number, row: number) => {
		setTarget(pos);
	};
	const transmitMove = (pos: number, col: number, row: number) => {
		setMove(pos);
		setTarget(-1);
	};

	const squares = data?.map((x: ISquare) => {
		x.select = changeSelection;
		x.move = transmitMove;
		x.target = target;
		return <Square key={x.position} {...x} />;
	});

	return (
		<div className={styles['board__wrapper']}>
			<div className={styles['board__figures']} draggable>
				{squares}
			</div>
		</div>
	);
};

export default Board;
