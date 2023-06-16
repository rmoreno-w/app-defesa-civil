import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface MainMenuOptionProps {
    option: string;
    icon: 'cloud-rain' | 'cloud-arrow' | 'list';
}
export default function MainMenuOption({ icon, option }: MainMenuOptionProps) {
    return (
        <View style={styles.wrapper}>
            {icon == 'list' && <MaterialCommunityIcons size={32} color={colors.blue_600} name='list-status' />}
            {icon == 'cloud-rain' && <Feather size={32} color={colors.blue_600} name='cloud-drizzle' />}
            {icon == 'cloud-arrow' && (
                <MaterialCommunityIcons size={32} color={colors.blue_600} name='weather-cloudy-arrow-right' />
            )}
            <Text style={styles.text}>{option}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 8,
        borderStyle: 'solid',
        borderWidth: 3,
        borderRadius: 8,
        borderColor: colors.blue_600,
        gap: 4,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '31%',
    },
    text: {
        textAlign: 'center',
        color: colors.blue_600,
        fontFamily: fonts.textBold,
        fontSize: 12,
    },
});
