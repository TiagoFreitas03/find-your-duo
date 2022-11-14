import { useState } from "react"
import { View, Modal, StyleSheet, ModalProps, Text, TouchableOpacity, Alert } from "react-native"
import { THEME } from "../theme"
import { MaterialIcons } from '@expo/vector-icons'
import { CheckCircle } from 'phosphor-react-native'
import * as Clipboard from 'expo-clipboard'

import { Heading } from "./Heading"

interface Props extends ModalProps {
	discord: string
	onClose: () => void
}

export function DuoMatch({ discord, onClose: close, ...rest }: Props) {
	const [isCopying, setIsCopying] = useState(false)

	async function handleCopyDiscordToClipboard() {
		setIsCopying(true)
		await Clipboard.setStringAsync(discord)

		Alert.alert('Discord Copiado!', 'Usuário copiado para você colar no Discord.')
		setIsCopying(false)
	}

	return (
		<Modal
			{...rest}
			transparent
			statusBarTranslucent
			animationType="fade"
		>
			<View style={styles.container}>
				<View style={styles.content}>
					<TouchableOpacity style={styles.closeIcon} onPress={close}>
						<MaterialIcons
							name="close"
							size={20}
							color={THEME.COLORS.CAPTION_500}
						/>
					</TouchableOpacity>

					<CheckCircle
						size={64}
						color={THEME.COLORS.SUCCESS}
						weight='bold'
					/>

					<Heading
						title="Let's play"
						subtitle="Agora é só começar a jogar"
						style={{ alignItems: 'center', marginTop: 24 }}
					/>

					<Text style={styles.label}>
						Adicione no Discord
					</Text>

					<TouchableOpacity
						style={styles.discordButton}
						onPress={handleCopyDiscordToClipboard}
						disabled={isCopying}
					>
						<Text style={styles.discord}>
							{discord}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: THEME.COLORS.OVERLAY
	},

	content: {
		width: 311,
		backgroundColor: THEME.COLORS.SHAPE,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center'
	},

	closeIcon: {
		alignSelf: 'flex-end',
		margin: 16,
	},

	label: {
		color: THEME.COLORS.TEXT,
		fontSize: THEME.FONT_SIZE.MD,
		fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
		marginTop: 24,
		marginBottom: 8
	},

	discordButton: {
		width: 231,
		height: 48,
		backgroundColor: THEME.COLORS.BACKGROUND_900,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 4,
		marginBottom: 32
	},

	discord: {
		color: THEME.COLORS.TEXT,
		fontSize: THEME.FONT_SIZE.MD,
		fontFamily: THEME.FONT_FAMILY.REGULAR
	}
})
