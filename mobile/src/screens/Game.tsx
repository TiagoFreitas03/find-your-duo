import { useEffect, useState } from 'react'
import { View, TouchableOpacity, Image, FlatList, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons'

import { THEME } from '../theme'
import logoImg from '../assets/logo-nlw-esports.png'
import { GameParams } from '../@types/navigation'

import { Background } from '../components/Background'
import { Heading } from '../components/Heading'
import { DuoCard, DuoCardProps } from '../components/DuoCard'
import { DuoMatch } from '../components/DuoMatch'

export function Game() {
	const route = useRoute()
	const game = route.params as GameParams
	const navigation = useNavigation()

	const [duos, setDuos] = useState<DuoCardProps[]>([])
	const [duoSelected, setDuoSelected] = useState('')

	useEffect(() => {
		fetch(`http://192.168.0.14:3333/games/${game.id}/ads`)
			.then(res => res.json())
			.then(data => setDuos(data))
	}, [game.id])

	async function getDiscordUser(adsId: string) {
		fetch(`http://192.168.0.14:3333/ads/${adsId}/discord`)
			.then(res => res.json())
			.then(data => setDuoSelected(data.discord))
	}

	return (
		<Background>
			<SafeAreaView style={styles.container}>
				<View style={styles.header}>
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<Entypo name='chevron-thin-left' color={THEME.COLORS.CAPTION_300} size={20} />
					</TouchableOpacity>

					<Image source={logoImg} style={styles.logo} />

					<View style={styles.right} />
				</View>

				<Image source={{ uri: game.bannerUrl }} style={styles.cover} resizeMode='cover' />

				<Heading title={game.title} subtitle='Conecte-se e comece a jogar' />

				<FlatList
					data={duos}
					keyExtractor={item => item.id}
					renderItem={({ item }) => (
						<DuoCard data={item} onConnect={() => getDiscordUser(item.id)} />)}
					horizontal
					style={styles.containerList}
					contentContainerStyle={duos.length > 0 ? styles.contentList : styles.emptyListContext}
					showsHorizontalScrollIndicator={false}
					ListEmptyComponent={() => (
						<Text style={styles.emptyListText}>Não há anúncios publicados ainda.</Text>
					)}
				/>

				<DuoMatch
					visible={duoSelected.length > 0}
					discord={duoSelected}
					onClose={() => setDuoSelected('')}
				/>
			</SafeAreaView>
		</Background>
	)
}

const styles = StyleSheet.create({
	container: { flex: 1, alignItems: 'center' },

	header: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 32,
		marginTop: 28,
		justifyContent: 'space-between'
	},

	logo: { width: 72, height: 40 },

	right: { width: 20, height: 20 },

	cover: {
		width: 311,
		height: 160,
		borderRadius: 8,
		marginTop: 32,
	},

	containerList: { width: '100%' },

	contentList: {
		paddingLeft: 32,
		paddingRight: 64,
		alignItems: 'flex-start'
	},

	emptyListContext: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},

	emptyListText: {
		color: THEME.COLORS.CAPTION_300,
		fontSize: THEME.FONT_SIZE.SM,
		fontFamily: THEME.FONT_FAMILY.REGULAR
	}
})
