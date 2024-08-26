import { PlayerEntity } from '../../entities'
import { Bullet } from './types/bullet.interface'
import { Radius } from './types/types'

const inner = 10

export const testForAABB = (object1: PlayerEntity, object2: Bullet) => {
	const bounds1 = object1.getBounds()
	const bounds2 = object2.getBounds()

	return (
		bounds1.x < bounds2.x + bounds2.width &&
		bounds1.x + bounds1.width > bounds2.x + Radius.Player &&
		bounds1.y < bounds2.y + bounds2.height + Radius.Player - inner &&
		bounds1.y + bounds1.height - Radius.Player - inner > bounds2.y
	)
}
