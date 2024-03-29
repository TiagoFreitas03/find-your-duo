import { useState, useEffect } from 'react'
import axios from 'axios'
import * as Dialog from '@radix-ui/react-dialog'

import './styles/main.tailwind.css'
import logoImg from './assets/logo-nlw-esports.svg'

import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'
import { CreateAdModal } from './components/CreateAdModal'

interface Game {
	id: string
	title: string
	bannerUrl: string
	_count: {
		ads: number
	}
}

export function App() {
	const [games, setGames] = useState<Game[]>([])

	useEffect(() => {
		axios(`${import.meta.env.VITE_SERVER_URL}/games`).then(res => setGames(res.data))
	}, [])

	return (
		<div className='max-w-[1024px] mx-auto flex flex-col items-center my-20 p-1'>
			<img src={logoImg} alt="Logo" className='max-w-xs' />

			<h1 className='text-6xl text-white font-black mt-20'>
				Seu <span className='bg-nlw-gradient text-transparent bg-clip-text'>duo</span> está aqui
			</h1>

			<div className='grid grid-cols-6 gap-6 mt-16'>
				{games.map(game => {
					return (
						<GameBanner
							key={game.id}
							bannerUrl={game.bannerUrl}
							title={game.title}
							adsCount={game._count.ads}
						/>
					)
				})}
			</div>

			<Dialog.Root>
				<CreateAdBanner />

				<CreateAdModal />
			</Dialog.Root>
		</div>
	)
}
