export enum GameStatus {
	Unknown = 'Unknown',
	Playing = 'Playing',
	Paused = 'Paused',
}

export enum Side {
	Left = 'Left',
	Right = 'Right',
}

export enum IntensityShooting {
	OneSecond = 1,
	TwoSeconds = 2,
	ThreeSeconds = 3,
}

export type Hero = {
	x: number
	y: number
	color: string
	side: Side
	intensityShooting: IntensityShooting
	bulletColor: string
}

export type Position = {
	x: number
	y: number
}

export type Form = {
	side: Side
	intensityShooting: IntensityShooting
	speed: number
	bulletColor: string
}

export type Bounds = {
	width: number
	height: number
	x: number
	y: number
}

export enum Radius {
	Player = 50,
	Bullet = 10,
}
