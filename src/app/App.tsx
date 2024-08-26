import { useCallback, useEffect, useState } from 'react'
import { game } from './Game'
import { Modal } from '../entities/Modal'
import {
	DEFAULT_COLOR,
	Footer,
	Form,
	GameStatus,
	Header,
	IntensityShooting,
	Side,
} from '../shared'
import { Greeting } from '../entities'
import { Board } from '../features'
import './styles/index.css'

function App(): JSX.Element {
	const [isOpen, setIsOpen] = useState(false)
	const [isPlaying, setIsPlaying] = useState(false)
	const [leftScore, setLeftScore] = useState(0)
	const [rightScore, setRightScore] = useState(0)
	const [form, setForm] = useState<Form>({
		side: Side.Left,
		speed: 1,
		intensityShooting: IntensityShooting.OneSecond,
		bulletColor: DEFAULT_COLOR,
	})

	const handleKeyDown = (evt: KeyboardEvent) => {
		if (evt.key === 'Escape') {
			setIsOpen(false)
			game.setStatus(GameStatus.Playing)
		}
	}

	const update = useCallback(() => {
		if (!isOpen) {
			game.update()
		}

		if (game.player1.isDamaged) {
			setLeftScore(prev => (prev += 1))
		}

		if (game.player2.isDamaged) {
			setRightScore(prev => (prev += 1))
		}
	}, [])

	const onClickModal = (form: Form) => {
		if (form) {
			setForm(() => ({ ...form }))
			setIsOpen(prev => !prev)
		}
	}

	const startGame = () => {
		setIsPlaying(true)
		game.setStatus(GameStatus.Playing)
	}

	const paused = () => {
		setIsPlaying(() => false)
		game.setStatus(GameStatus.Paused)
	}

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [])

	if (!isPlaying) {
		return <Greeting startGame={startGame} />
	}

	return (
		<div className='main'>
			<Header />
			<Board
				leftScore={leftScore}
				rightScore={rightScore}
				update={update}
				onClickModal={onClickModal}
				paused={paused}
			/>
			<Modal isOpen={isOpen} form={form} />
			<Footer />
		</div>
	)
}

export default App
