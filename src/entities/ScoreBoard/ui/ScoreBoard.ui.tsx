import { BoardSize } from '../../../shared'

type ScoreBoardProps = {
	leftScore: number
	rightScore: number
}
export function ScoreBoard({
	leftScore,
	rightScore,
}: ScoreBoardProps): JSX.Element {
	return (
		<div className='scoreboard' style={{ width: BoardSize.width }}>
			<div className='scoreboard__left player-panel'>
				<div className='scoreboard-avatar avatar'></div>
				<p>{leftScore}</p>
			</div>
			<div className='scoreboard__right player-panel'>
				<div className='scoreboard-avatar avatar'></div>
				<p>{rightScore}</p>
			</div>
		</div>
	)
}
