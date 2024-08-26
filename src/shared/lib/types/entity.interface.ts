import { Bounds, Position } from './types'

export interface Entity<T> {
	context: CanvasRenderingContext2D
	position: Position
	color: string
	bounds: Bounds
	prevPosition: Position
	update(value?: T): void
	toObject(): T
}
