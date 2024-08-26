import { ScoreBoard, Canvas } from '../../../entities/'
import { BoardSize, Form } from '../../../shared'

type BoardProps = {
	leftScore: number
	rightScore: number
	update: (context: CanvasRenderingContext2D) => void
	onClickModal: (player: Form) => void
	paused: () => void
}

export function Board({
	leftScore,
	rightScore,
	update,
	onClickModal,
	paused,
}: BoardProps): JSX.Element {
	return (
		<div className='board'>
			<ScoreBoard leftScore={leftScore} rightScore={rightScore} />
			<Canvas
				update={update}
				width={BoardSize.width}
				height={BoardSize.height}
				onClickModal={onClickModal}
			/>
			<button className='btn' onClick={paused}>
				Пауза
			</button>
		</div>
	)
}
