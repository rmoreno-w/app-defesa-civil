import { Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

interface MainMenuOptionProps {
    option: string;
    icon: 'cloud-rain' | 'map' | 'list' | 'newspaper' | 'list-news';
    navigateTo: string;
}
export default function AgentMainMenuOption({ icon, navigateTo, option }: MainMenuOptionProps) {
    const router = useRouter();

    function navigate() {
        router.push(navigateTo);
    }

    return (
        <TouchableOpacity style={styles.wrapper} activeOpacity={0.5} onPress={navigate}>
            {icon == 'list' && <MaterialCommunityIcons size={48} color={colors.blue_50} name='list-status' />}
            {icon == 'cloud-rain' && <Feather size={48} color={colors.blue_50} name='cloud-drizzle' />}
            {icon == 'newspaper' && <FontAwesome5 size={48} color={colors.blue_50} name='newspaper' />}
            {icon == 'map' && <FontAwesome5 size={48} color={colors.blue_50} name='map-marked-alt' />}
            {icon == 'list-news' && <FontAwesome5 size={48} color={colors.blue_50} name='list-alt' />}
            <Text style={styles.text}>{option}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 8,
        // borderWidth: 1,
        // borderColor: colors.blue_300,
        borderRadius: 8,
        backgroundColor: colors.blue_600,
        gap: 4,
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '48%',
        height: 150,
        // shadowColor: colors.blue_400,
        // shadowOffset: { width: 2, height: -4 },
        // shadowRadius: 15,
        // shadowOpacity: 0.8,
        // elevation: 15,
    },
    text: {
        textAlign: 'center',
        color: colors.blue_50,
        fontFamily: fonts.textBold,
        fontSize: 14,
    },
});
