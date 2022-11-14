import { View, Text, ColorValue, StyleSheet } from 'react-native'

import { THEME } from '../theme'

interface Props {
	label: string
	value: string
	colorValue?: ColorValue
}

export function DuoInfo({ label, value, colorValue }: Props) {
	return (
		<View style={styles.container}>
			<Text style={styles.label}>
				{label}
			</Text>

			<Text
				style={[styles.value, { color: colorValue ?? THEME.COLORS.TEXT }]}
				numberOfLines={1}
			>
				{value}
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		marginBottom: 16,
	},

	label: {
		color: THEME.COLORS.CAPTION_300,
		fontSize: THEME.FONT_SIZE.SM,
		fontFamily: THEME.FONT_FAMILY.REGULAR,
		marginBottom: 4
	},

	value: {
		fontSize: THEME.FONT_SIZE.SM,
		fontFamily: THEME.FONT_FAMILY.BOLD,
	},
})
