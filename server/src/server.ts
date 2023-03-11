import 'dotenv/config'
import express from "express"
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

import { convertHourStringToMinutes, convertMinutesToHourString } from './utils/convertions'

const server = express()
const port = process.env.PORT ? Number(process.env.PORT) : 3333

server.use(express.json())
server.use(cors())

const prisma = new PrismaClient()

server.get('/games', async (_, res) => {
	const games = await prisma.game.findMany({
		include: {
			_count: {
				select: {
					ads: true
				}
			}
		}
	})

	return res.json(games)
})

server.post('/games/:id/ads', async (req, res) => {
	const gameId = req.params.id
	const { body } = req

	const ad = await prisma.ad.create({
		data: {
			gameId,
			name: body.name,
			yearsPlaying: body.yearsPlaying,
			discord: body.discord,
			weekDays: body.weekDays.join(','),
			hourStart: convertHourStringToMinutes(body.hourStart),
			hourEnd: convertHourStringToMinutes(body.hourEnd),
			useVoiceChannel: body.useVoiceChannel
		}
	})

	return res.status(201).json(ad)
})

server.get('/games/:id/ads', async (req, res) => {
	const gameId = req.params.id

	const ads = await prisma.ad.findMany({
		select: {
			id: true,
			name: true,
			weekDays: true,
			useVoiceChannel: true,
			yearsPlaying: true,
			hourStart: true,
			hourEnd: true
		},
		where: {
			gameId
		},
		orderBy: {
			createdAt: 'desc'
		}
	})

	return res.json(ads.map(ad => {
		return {
			...ad,
			weekDays: ad.weekDays.split(','),
			hourStart: convertMinutesToHourString(ad.hourStart),
			hourEnd: convertMinutesToHourString(ad.hourEnd),
		}
	}))
})

server.get('/ads/:id/discord', async (req, res) => {
	const adId = req.params.id

	const ad = await prisma.ad.findUniqueOrThrow({
		select: {
			discord: true
		},
		where: {
			id: adId
		}
	})

	return res.json({
		discord: ad.discord
	})
})

server.listen(port, () => {
	console.log(`server running on port ${port}`)
})
