import { PlayerEntity } from '../entities'
import {
	Form,
	GameStatus,
	Hero,
	IntensityShooting,
	Position,
	Radius,
	Side,
} from '../shared'

class Game {
	#context!: CanvasRenderingContext2D
	#width!: number
	#height!: number
	x!: number
	y!: number
	player1!: PlayerEntity
	player2!: PlayerEntity
	#innerX = 20
	#status = GameStatus.Unknown
	#leftPlayer!: Hero
	#rightPlayer!: Hero
	#heroRadius: number = Radius.Player

	init(context: CanvasRenderingContext2D) {
		this.#context = context
		this.#width = this.#context.canvas.width
		this.#height = this.#context.canvas.height
		this.#leftPlayer = {
			x: this.#heroRadius + this.#innerX,
			y: this.#height / 2,
			color: '#ffd700',
			side: Side.Left,
			intensityShooting: IntensityShooting.OneSecond,
			bulletColor: '#ff0000',
		}

		this.#rightPlayer = {
			x: this.#width - this.#heroRadius - this.#innerX,
			y: this.#height / 2,
			color: '#ffa500',
			side: Side.Right,
			intensityShooting: IntensityShooting.OneSecond,
			bulletColor: '#ff0000',
		}
		this.player1 = new PlayerEntity(this.#context, this.#leftPlayer)
		this.player2 = new PlayerEntity(this.#context, this.#rightPlayer)
	}

	clear() {
		this.#context.clearRect(0, 0, this.#width, this.#height)
	}

	update() {
		switch (this.#status) {
			case GameStatus.Unknown:
				break
			case GameStatus.Playing:
				this.#playing()
				break
		}
	}

	setStatus(status: GameStatus) {
		this.#status = status
	}

	setDirection(player: PlayerEntity) {
		if (player.y <= Radius.Player) {
			player.down()
		}

		if (player.y >= this.#height - Radius.Player) {
			player.up()
		}
	}

	onClick(position: Position): Form | void {
		const pos = {
			x: position.x * this.#width,
			y: position.y * this.#height,
		}

		const player = this.player1.checkPosition(pos)
		const player2 = this.player2.checkPosition(pos)
		if (player) {
			this.setStatus(GameStatus.Paused)
			return player
		}
		if (player2) {
			this.setStatus(GameStatus.Paused)
			return player2
		}
	}

	onMouseMove(position: Position) {
		const pos = {
			x: position.x * this.#width,
			y: position.y * this.#height,
		}

		const distanceEdge = Radius.Player * 2 + this.#innerX

		if (pos.x >= this.#innerX && pos.x <= distanceEdge) {
			if (pos.y >= this.player1.y && pos.y <= this.player1.y + Radius.Player) {
				this.player1.addHovered()
				this.player1.up()
				return
			}

			if (pos.y <= this.player1.y && pos.y >= this.player1.y - Radius.Player) {
				this.player1.addHovered()
				this.player1.down()
				return
			}
		}

		if (
			pos.x >= this.#width - distanceEdge &&
			pos.x <= this.#width - this.#innerX
		) {
			if (pos.y >= this.player2.y && pos.y <= this.player2.y + Radius.Player) {
				this.player2.up()
				this.player2.addHovered()
				return
			}

			if (pos.y <= this.player2.y && pos.y >= this.player2.y - Radius.Player) {
				this.player2.down()
				this.player2.addHovered()
				return
			}
		}
		this.player1.removeHovered()
		this.player2.removeHovered()
	}

	changePlayerOptions(form: Form) {
		if (form.side === Side.Left) {
			this.player1.changeOptions(form)
			return
		}
		this.player2.changeOptions(form)
	}

	#playing() {
		this.setDirection(this.player1)
		this.setDirection(this.player2)
		this.clear()
		this.player1.update(this.player2)
		this.player2.update(this.player1)
	}
}

export const game = new Game()
