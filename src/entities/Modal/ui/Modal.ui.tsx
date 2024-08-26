import { ChangeEvent, memo, useEffect, useRef, useState } from 'react'
import { Form } from '../../../shared/lib/types/types'
import { game } from '../../../app/Game'

type ModalProps = {
	isOpen: boolean
	form: Form
}

function ModalUi({ isOpen, form }: ModalProps): JSX.Element {
	const ref = useRef<HTMLDialogElement | null>(null)
	const [modalForm, setModalForm] = useState<Form>({ ...form })

	const handleChangeForm = (evt: ChangeEvent<HTMLInputElement>) => {
		const value =
			evt.target.name === 'bulletColor'
				? evt.target.value
				: parseInt(evt.target.value)

		setModalForm(prevForm => {
			const form = {
				...prevForm,
				[evt.target.name]: value,
			}
			game.changePlayerOptions(form)
			return form
		})
	}

	useEffect(() => {
		setModalForm(() => ({ ...form }))
	}, [form])

	useEffect(() => {
		const current = ref.current

		if (isOpen) {
			current?.showModal()
			return
		}

		current?.close()
	}, [isOpen])

	return (
		<dialog ref={ref} className='modal'>
			<h2>Настройки игрока:</h2>
			<form className='modal-form form'>
				<label className='form-label' htmlFor='speed'>
					<p className='label-title'>Скорость передвижения:</p>
					<input
						className='form-field'
						type='range'
						min='1'
						max='3'
						name='speed'
						id='speed'
						value={modalForm.speed}
						onChange={handleChangeForm}
					/>
					<span className='form-value'>
						<b>{modalForm.speed}</b>
					</span>
				</label>

				<label className='form-label' htmlFor='intensityShooting'>
					<p className='label-title'>Частота стрельбы:</p>
					<input
						className='form-field'
						type='range'
						min='1'
						max='3'
						name='intensityShooting'
						id='intensityShooting'
						value={modalForm.intensityShooting}
						onChange={handleChangeForm}
					/>
					<span className='form-value'>
						<b>{modalForm.intensityShooting}</b>
					</span>
				</label>

				<label className='form-label' htmlFor='bulletColor'>
					<p className='label-title'>Цвет заклинаний:</p>
					<input
						className='form-field'
						type='color'
						name='bulletColor'
						id='bulletColor'
						value={modalForm.bulletColor}
						onChange={handleChangeForm}
					/>
				</label>
			</form>
		</dialog>
	)
}

export const Modal = memo(ModalUi)
