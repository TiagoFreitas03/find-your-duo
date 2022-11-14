import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { GameController } from 'phosphor-react-native'

import { THEME } from '../theme'
import { DuoInfo } from './DuoInfo'

export interface DuoCardProps {
	id: string
	hourStart: string
	hourEnd: string
	name: string
	useVoiceChannel: boolean
	weekDays: string[]
	yearsPlaying: number
}

interface Props {
	data: DuoCardProps
	onConnect: () => void
}

export function DuoCard({ data, onConnect }: Props) {
	return (
		<View style={styles.container}>
			<DuoInfo label='Nome' value={data.name} />

			<DuoInfo label='Tempo de jogo' value={`${data.yearsPlaying} ano(s)`} />

			<DuoInfo
				label='Disponibilidade'
				value={`${data.weekDays.length} dia(s) \u2022 ${data.hourStart} - ${data.hourEnd} `}
			/>

			<DuoInfo
				label='Chamada de audio?'
				value={data.useVoiceChannel ? 'Sim' : 'Não'}
				colorValue={data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
			/>

			<TouchableOpacity
				style={styles.button}
				onPress={onConnect}
			>
				<GameController
					color={THEME.COLORS.TEXT}
					size={20}
				/>

				<Text style={styles.buttonTitle}>
					Conectar
				</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: 210,
		backgroundColor: THEME.COLORS.SHAPE,
		borderRadius: 8,
		padding: 20,
		marginRight: 16,
		alignItems: 'center'
	},

	button: {
		width: '100%',
		height: 36,
		borderRadius: 6,
		backgroundColor: THEME.COLORS.PRIMARY,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},

	buttonTitle: {
		color: THEME.COLORS.TEXT,
		fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
		fontSize: THEME.FONT_SIZE.SM,
		marginLeft: 8
	}
})
