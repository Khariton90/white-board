import { Bounds, Side } from './types'

export interface Bullet {
	speed: number
	side: Side
	bulletRaduis: number
	getBounds(): Bounds
}
