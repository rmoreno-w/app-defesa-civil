import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface MainMenuOptionProps {
    option: string;
    icon: 'cloud' | 'list';
}
export default function MainMenuOption({ icon, option }: MainMenuOptionProps) {
    return (
        <View style={styles.wrapper}>
            {icon == 'list' && <MaterialCommunityIcons size={32} color={colors.blue_600} name='list-status' />}
            {icon == 'cloud' && <Feather size={32} color={colors.blue_600} name='cloud-drizzle' />}
            <Text style={styles.text}>{option}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 16,
        borderStyle: 'solid',
        borderWidth: 3,
        borderRadius: 8,
        borderColor: colors.blue_600,
        gap: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '45%',
    },
    text: {
        textAlign: 'center',
        color: colors.blue_600,
        fontFamily: fonts.textBold,
    },
});
