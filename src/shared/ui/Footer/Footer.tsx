import { memo } from 'react'

function FooterUi(): JSX.Element {
	return (
		<footer className='footer'>
			<a href='http://khariton90.ru' target='_blank'>
				Разработал Харитонов Евгений
			</a>
		</footer>
	)
}

export const Footer = memo(FooterUi)
