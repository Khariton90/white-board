import { memo } from 'react'
import { game } from '../../../app/Game'
import { useCanvas } from '../../../shared/lib/hooks/useCanvas'
import { Form } from '../../../shared/lib/types/types'

function findPoint(evt: React.MouseEvent<HTMLCanvasElement>, rect: DOMRect) {
	return {
		x: (evt.clientX - rect.left) / (rect.right - rect.left),
		y: (evt.clientY - rect.top) / (rect.bottom - rect.top),
	}
}

type CanvasProps = {
	update: (context: CanvasRenderingContext2D) => void
	width: number
	height: number
	onClickModal: (player: Form) => void
}

function CanvasUi({
	update,
	width,
	height,
	onClickModal,
}: CanvasProps): JSX.Element {
	const ref = useCanvas(update)

	const handleMouseMove = (evt: React.MouseEvent<HTMLCanvasElement>) => {
		const canvas = ref.current
		const rect = canvas!.getBoundingClientRect()
		const point = findPoint(evt, rect)
		game.onMouseMove(point)
	}

	const handleClick = (evt: React.MouseEvent<HTMLCanvasElement>) => {
		const canvas = ref.current
		const rect = canvas!.getBoundingClientRect()
		const point = findPoint(evt, rect)
		const player = game.onClick(point)

		if (player) {
			onClickModal(player)
		}
	}

	return (
		<div>
			<canvas
				onClick={handleClick}
				onMouseMove={handleMouseMove}
				className='canvas'
				width={width}
				height={height}
				ref={ref}
			></canvas>
		</div>
	)
}

export const Canvas = memo(CanvasUi)
