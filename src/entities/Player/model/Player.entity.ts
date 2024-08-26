/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Bounds, Entity, FPS, Player } from '../../../shared/'
import { testForAABB } from '../../../shared/lib/testForAABB'
import {
	Form,
	Hero,
	IntensityShooting,
	Position,
	Radius,
	Side,
} from '../../../shared/lib/types/types'
import { BulletEntity } from '../../Bullet'

export class PlayerEntity implements Entity<Player> {
	context: CanvasRenderingContext2D
	#SPEED = 2
	intensity: IntensityShooting
	position = {
		x: 0,
		y: 0,
	}
	prevPosition = {
		x: 0,
		y: 0,
	}
	bounds = {
		width: 100,
		height: 100,
		x: 0,
		y: 0,
	}
	#movement = {
		y: 1,
	}
	color: string
	#bullets: BulletEntity[] = []
	#VELOCITY = 1.2
	#HOVERED = false
	isDamaged = false
	total = 0
	#side: Side
	bulletColor: string = '#ff0000'

	constructor(context: CanvasRenderingContext2D, hero: Hero) {
		this.context = context
		this.position.x = hero.x
		this.position.y = hero.y
		this.prevPosition.x = this.position.x
		this.prevPosition.y = this.position.y
		this.color = hero.color
		this.#side = hero.side
		this.bulletColor = hero.bulletColor
		this.intensity = hero.intensityShooting
	}

	toObject(): Player {
		return { ...this }
	}

	get x(): number {
		return this.position.x
	}

	get y(): number {
		return this.position.y
	}

	get hovered() {
		return this.#HOVERED
	}

	get intensityShooting() {
		return this.intensity
	}

	set y(value: number) {
		this.position.y = value
	}

	set speed(value: number) {
		this.#SPEED = value
	}

	set intensityShooting(value: IntensityShooting) {
		this.intensity = value
	}

	#time = 60

	set time(value: number) {
		this.#time = this.#time < 0 ? FPS / this.intensity : value
	}

	update(enemy: PlayerEntity) {
		this.isDamaged = false
		this.y += this.#movement.y * this.#SPEED * this.#VELOCITY

		this.drawCircle(this.x, this.y, Radius.Player, 0)
		this.#shoot()
		for (let i = 0; i < this.#bullets.length; i++) {
			this.#bullets[i].update()

			if (testForAABB(enemy, this.#bullets[i])) {
				this.#bullets.splice(i, 1)
				this.isDamaged = true
			}

			if (!this.isDamaged) {
				this.#removeBulletEntityFromScene(this.#bullets[i].x, i)
			}
		}
	}

	up() {
		if (this.#movement.y === -1) {
			return
		}

		this.#movement.y = -1 * this.#VELOCITY
		this.#SPEED * -1
	}

	down() {
		if (this.#movement.y === 1) {
			return
		}

		this.#movement.y = 1 * this.#VELOCITY
		this.#SPEED = Math.abs(this.#SPEED)
	}

	addHovered() {
		if (this.#HOVERED) {
			return
		}

		this.#HOVERED = true
	}

	removeHovered() {
		this.#HOVERED = false
	}

	drawCircle(
		x: number,
		y: number,
		raduis: number,
		startAngle: number,
		endAngle: number = Math.PI * 2
	) {
		this.context.arc(x, y, raduis, startAngle, endAngle)
		const gradient = this.context.createRadialGradient(
			this.x,
			this.y,
			8,
			this.x,
			this.y,
			this.bounds.width
		)

		gradient.addColorStop(0, this.color)
		gradient.addColorStop(1, '#ff0000')

		this.context.fillStyle = gradient
		this.context.fill()
		this.context.strokeStyle = '#ccc'
		if (this.hovered) {
			this.context.strokeStyle = '#9be9a8'
		}
		this.context.stroke()
		this.context.beginPath()
	}

	get shootTime() {
		return 60 / this.intensityShooting
	}

	getBounds(): Bounds {
		return {
			...this.bounds,
			x: this.x,
			y: this.y,
		}
	}

	changeOptions(form: Form) {
		this.#SPEED = form.speed
		this.intensityShooting = form.intensityShooting
		this.bulletColor = form.bulletColor
	}

	checkPosition(position: Position): Form | void {
		if (
			position.x >= this.x - this.bounds.width / 2 &&
			position.x <= this.x + this.bounds.width / 2 &&
			Math.abs(position.y - this.y) <= this.bounds.height / 2
		) {
			const form = {
				side: this.#side,
				intensityShooting: this.intensityShooting,
				speed: this.#SPEED,
				bulletColor: this.bulletColor,
			}

			return form
		}
	}

	#removeBulletEntityFromScene(x: number, index: number) {
		if (x <= 0 || x >= this.context.canvas.width) {
			this.#bullets.splice(index, 1)
		}
	}

	#createBullet() {
		const bullet = new BulletEntity(
			this.context,
			this.x,
			this.y,
			this.bulletColor,
			this.#side
		)
		this.#bullets.push(bullet)
	}

	#shoot() {
		this.time = this.#time - 1
		if (this.#time === FPS / this.intensity) {
			this.#createBullet()
		}
	}
}
