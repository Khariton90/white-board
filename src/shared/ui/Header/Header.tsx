import { memo } from 'react'

function HeaderUi(): JSX.Element {
	return (
		<header className='header'>
			<h1 className='title'>Белая доска</h1>
		</header>
	)
}

export const Header = memo(HeaderUi)
