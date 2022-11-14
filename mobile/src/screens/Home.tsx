import { useEffect, useState } from 'react'
import { Image, FlatList, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

import logoImg from '../assets/logo-nlw-esports.png'

import { Heading } from '../components/Heading'
import { Background } from '../components/Background'
import { GameCard, GameCardProps } from '../components/GameCard'

export function Home() {
	const [games, setGames] = useState<GameCardProps[]>([])

	const navigation = useNavigation()

	useEffect(() => {
		fetch('http://192.168.0.14:3333/games')
			.then(res => res.json())
			.then(data => {
				setGames(data)
			})
	}, [])

	function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
		navigation.navigate('Game', { id, title, bannerUrl })
	}

	return (
		<Background>
			<SafeAreaView style={styles.container}>
				<Image source={logoImg} style={styles.logo} />

				<Heading title='Encontre seu duo' subtitle='Selecione o game que deseja jogar...' />

				<FlatList
					data={games}
					keyExtractor={item => item.id}
					renderItem={({ item }) => <GameCard data={item} onPress={() => handleOpenGame(item)} />}
					showsHorizontalScrollIndicator={false}
					horizontal
					contentContainerStyle={styles.contentList}
				>
				</FlatList>
			</SafeAreaView>
		</Background>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center'
	},

	logo: {
		width: 214,
		height: 120,
		marginTop: 74,
		marginBottom: 48
	},

	contentList: {
		paddingLeft: 32,
		paddingRight: 64,
	}
})
