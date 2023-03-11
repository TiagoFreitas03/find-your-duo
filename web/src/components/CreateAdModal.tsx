import { FormEvent, useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { Check, GameController } from 'phosphor-react'
import axios from 'axios'

import { Input } from './Form/Input'

interface Game {
	id: string
	title: string
}

export function CreateAdModal() {
	const [games, setGames] = useState<Game[]>([])
	const [weekDays, setWeekDays] = useState<string[]>([])
	const [useVoiceChannel, setUseVoiceChannel] = useState(false)

	useEffect(() => {
		axios(`${import.meta.env.VITE_SERVER_URL}/games`).then(res => setGames(res.data))
	}, [])

	async function handleCreateAd(event: FormEvent) {
		event.preventDefault()

		const formData = new FormData(event.target as HTMLFormElement)

		const data = Object.fromEntries(formData)

		if (!data.name)
			return

		try {
			await axios.post(`${import.meta.env.VITE_SERVER_URL}/games/${data.game}/ads`, {
				name: data.name,
				yearsPlaying: Number(data.yearsPlaying),
				discord: data.discord,
				weekDays: weekDays.map(Number),
				hourStart: data.hourStart,
				hourEnd: data.hourEnd,
				useVoiceChannel
			})

			alert('Anúncio criado com sucesso!')
		} catch (err: any) {
			alert('Erro ao criar o anúncio!')
			console.log(err)
		}
	}

	return (
		<Dialog.Portal>
			<Dialog.Overlay className='bg-black/60 inset-0 fixed' />

			<Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[500px] shadow-black/25'>
				<Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>

				<form className='mt-8 flex flex-col gap-4' onSubmit={handleCreateAd}>
					<div className='flex flex-col gap-2'>
						<label className='font-semibold' htmlFor='game'>Qual o game?</label>
						<select
							name='game'
							id='game'
							className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500'
							defaultValue=''
						>
							<option disabled value=''>Selecione o game que deseja jogar</option>

							{ games.map(game => <option value={game.id} key={game.id}>{game.title}</option>) }
						</select>
					</div>

					<div className='flex flex-col gap-2'>
						<label htmlFor='name'>Seu nome (ou nickname)</label>
						<Input id='name' name='name' type='text' placeholder='Como te chamam dentro do game?' />
					</div>

					<div className='grid grid-cols-2 gap-6'>
						<div className='flex flex-col gap-2'>
							<label htmlFor='yearsPlaying'>Joga há quantos anos?</label>
							<Input id='yearsPlaying' name='yearsPlaying' type='number' placeholder='Tudo bem ser ZERO' />
						</div>

						<div className='flex flex-col gap-2'>
							<label htmlFor='discord'>Qual seu discord?</label>
							<Input id='discord' name='discord' type='text' placeholder='Usuário#0000' />
						</div>
					</div>

					<div className='flex gap-6'>
						<div className='flex flex-col gap-2'>
							<label htmlFor='weekDays'>Quando costuma jogar?</label>

							<ToggleGroup.Root
								type='multiple'
								className='grid grid-cols-4 gap-1'
								onValueChange={setWeekDays}
							>
								<ToggleGroup.Item
									className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
									title='Domingo'
									value='0'
								>
									D
								</ToggleGroup.Item>

								<ToggleGroup.Item
									className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
									title='Segunda'
									value='1'
								>
									S
								</ToggleGroup.Item>

								<ToggleGroup.Item
									className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
									title='Terça'
									value='2'
								>
									T
								</ToggleGroup.Item>

								<ToggleGroup.Item
									className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
									title='Quarta'
									value='3'
								>
									Q
								</ToggleGroup.Item>

								<ToggleGroup.Item
									className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
									title='Quinta'
									value='4'
								>
									Q
								</ToggleGroup.Item>

								<ToggleGroup.Item
									className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
									title='Sexta'
									value='5'
								>
									S
								</ToggleGroup.Item>

								<ToggleGroup.Item
									className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
									title='Sábado'
									value='6'
								>
									S
								</ToggleGroup.Item>
							</ToggleGroup.Root>
						</div>

						<div className='flex flex-col gap-2 flex-1'>
							<label htmlFor='hourStart'>Qual horário do dia?</label>

							<div className='grid grid-cols-2 gap-2'>
								<Input id='hourStart' name='hourStart' type='time' placeholder='De' />

								<Input id='hourEnd' name='hourEnd' type='time' placeholder='Até' />
							</div>
						</div>
					</div>

					<label className='mt-2 flex gap-2 text-sm items-center'>
						<Checkbox.Root
							checked={useVoiceChannel}
							className='w-6 h-6 rounded bg-zinc-900 p-1'
							onCheckedChange={checked => {
								if (checked === true)
									setUseVoiceChannel(true)
								else
									setUseVoiceChannel(false)
							}}
						>
							<Checkbox.Indicator>
								<Check className='w-4 h-4 text-emerald-400' />
							</Checkbox.Indicator>
						</Checkbox.Root>
						Costumo me conectar ao chat de voz
					</label>

					<footer className='mt-4 flex justify-end gap-4'>
						<Dialog.Close
							type='button'
							className='bg-zinc-500 px-5 h-12 rounded font-semibold hover:bg-zinc-600'>
							Cancelar
						</Dialog.Close>

						<button
							className='bg-violet-500 px-5 h-12 rounded font-semibold flex items-center gap-3 hover:bg-violet-600'
							type='submit'
						>
							<GameController size={24} />
							Encontrar Duo
						</button>
					</footer>
				</form>
			</Dialog.Content>
		</Dialog.Portal>
	)
}
