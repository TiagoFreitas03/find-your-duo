import { PrismaClient } from '@prisma/client'

async function seed() {
	const prisma = new PrismaClient()

	const games = [
		{
			title: 'League of Legends',
			bannerUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/21779-188x250.jpg'
		},
		{
			title: 'Valorant',
			bannerUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/516575-188x250.jpg'
		},
		{
			title: 'Minecraft',
			bannerUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/27471_IGDB-188x250.jpg'
		},
		{
			title: 'GTA V',
			bannerUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/32982_IGDB-188x250.jpg'
		},
		{
			title: 'Fortnite',
			bannerUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/33214-188x250.jpg'
		},
		{
			title: 'Call of Duty: Mobile',
			bannerUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/512818_IGDB-285x380.jpg'
		}
	]

	for (const game of games) {
		await prisma.game.create({
			data: game
		})
	}
}

seed()
