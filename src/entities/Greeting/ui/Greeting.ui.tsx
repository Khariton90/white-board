import { BoardSize, Footer, Header } from '../../../shared'

type GreetingProps = {
	startGame: () => void
}

export function Greeting({ startGame }: GreetingProps): JSX.Element {
	return (
		<div className='main'>
			<Header />
			<div
				className='greeting'
				style={{ width: BoardSize.width, height: BoardSize.height }}
			>
				<button className='btn' type='button' onClick={startGame}>
					Начать игру
				</button>
			</div>

			<Footer />
		</div>
	)
}
