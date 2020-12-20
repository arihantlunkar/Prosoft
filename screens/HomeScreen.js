import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';

class HomeScreen extends Component {
	render() {
		const { theme } = this.props;
		return (
			<View style={styles.container}>
				<StatusBar backgroundColor="#02b389" barStyle={'light-content'} />
				<Text style={{ color: theme.colors.text }}>Home Screen</Text>
			</View>
		);
	}
}

export default function(props) {
	const theme = useTheme();
	return <HomeScreen {...props} theme={theme} />;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
