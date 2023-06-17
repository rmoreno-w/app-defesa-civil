import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface HeaderProps {
    showProfileIcon?: boolean;
}
export default function Header({ showProfileIcon }: HeaderProps) {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>SisVil</Text>

            {showProfileIcon && (
                <TouchableOpacity style={styles.profileContainer} activeOpacity={0.5}>
                    <Ionicons name='person-circle-outline' size={48} color={colors.blue_600} />
                    <Text style={styles.profileText}>Perfil</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.blue_600,
        marginBottom: 24,
    },
    title: {
        // backgroundColor: 'green',
        fontFamily: fonts.heading,
        fontSize: 56,
        textAlign: 'center',
        color: colors.blue_800,
    },
    profileContainer: {
        alignItems: 'center',
        padding: 4,
    },
    profileText: {
        color: colors.blue_900,
    },
});
