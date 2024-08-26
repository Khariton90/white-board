import { useEffect, useRef } from 'react'
import { game } from '../../../app/Game'

type useCanvasProps = (context: CanvasRenderingContext2D) => void

export function useCanvas(update: useCanvasProps) {
	const ref = useRef<HTMLCanvasElement | null>(null)

	useEffect(() => {
		const current = ref.current
		const context = current!.getContext('2d')
		if (context) {
			game.init(context)
			let animationId: number
			const renderer = () => {
				update(context)
				animationId = window.requestAnimationFrame(renderer)
			}
			renderer()
			return () => window.cancelAnimationFrame(animationId)
		}
	}, [update])

	return ref
}
