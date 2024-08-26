import { Player } from '../../entities/player'
import { Bullet } from './types/bullet.interface'

export const testForAABB = (object1: Player, object2: Bullet) => {
	const bounds1 = object1.getBounds()
	const bounds2 = object2.getBounds()

	return (
		bounds1.x < bounds2.x + bounds2.width &&
		bounds1.x + bounds1.width > bounds2.x + 50 &&
		bounds1.y < bounds2.y + bounds2.height + 40 &&
		bounds1.y + bounds1.height - 40 > bounds2.y
	)
}
