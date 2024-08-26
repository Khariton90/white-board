import { Bounds, Bullet, DEFAULT_COLOR, Entity } from '../../../shared'
import { Radius, Side } from '../../../shared/lib/types/types'

export class BulletEntity implements Entity<Bullet> {
	context: CanvasRenderingContext2D
	#SPEED = 5

	position = {
		x: 0,
		y: 0,
	}

	bounds = {
		width: 20,
		height: 20,
		x: 0,
		y: 0,
	}

	prevPosition = {
		x: 0,
		y: 0,
	}
	color = '#000'
	side: Side
	bulletRaduis: number = Radius.Bullet

	constructor(
		context: CanvasRenderingContext2D,
		x: number,
		y: number,
		color: string = DEFAULT_COLOR,
		side: Side
	) {
		this.context = context
		this.side = side
		this.position.x =
			side === Side.Right ? x - Radius.Player : x + Radius.Player
		this.position.y = y
		this.prevPosition.x = this.position.x
		this.prevPosition.y = this.position.y
		this.color = color
	}

	get x(): number {
		return this.position.x
	}
	get y(): number {
		return this.position.y
	}

	set x(value: number) {
		this.position.x = value
	}

	set y(value: number) {
		this.position.y = value
	}

	set speed(value: number) {
		this.#SPEED = value
	}

	drawCircle() {
		this.context.arc(this.x, this.y, this.bulletRaduis, 0, Math.PI * 2)
		this.context.fillStyle = this.color
		this.context.fill()
		this.context.strokeStyle = 'orange'
		this.context.stroke()
		this.context.beginPath()
	}

	update() {
		this.drawCircle()
		this.#shoot()
	}

	toObject(): Bullet {
		return { ...this }
	}

	getBounds(): Bounds {
		return {
			...this.bounds,
			x: this.x,
			y: this.y,
		}
	}

	#shoot() {
		switch (this.side) {
			case Side.Right:
				this.x -= this.#SPEED
				break
			case Side.Left:
				this.x += this.#SPEED
				break
		}
	}
}
