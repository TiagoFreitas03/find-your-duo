import { ImageBackground, StyleSheet } from 'react-native'

import { THEME } from '../theme'
import backgroundImg from '../assets/background-galaxy.png'

interface Props {
	children: React.ReactNode
}

export function Background({ children }: Props) {
	return (
		<ImageBackground
			source={backgroundImg}
			defaultSource={backgroundImg}
			style={styles.container}
		>
			{children}
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: THEME.COLORS.BACKGROUND_800,
	}
})
