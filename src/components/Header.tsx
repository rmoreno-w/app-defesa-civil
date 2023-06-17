import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface HeaderProps {
    showCloseIcon?: boolean;
    showProfileIcon?: boolean;
}
export default function Header({ showCloseIcon, showProfileIcon }: HeaderProps) {
    const router = useRouter();

    function closeCurrentPage() {
        router.back();
    }

    return (
        <View style={styles.header}>
            <Text style={styles.title}>SisVil</Text>

            {showProfileIcon && (
                <TouchableOpacity style={styles.profileContainer} activeOpacity={0.5}>
                    <Ionicons name='person-circle-outline' size={48} color={colors.blue_600} />
                    <Text style={styles.profileText}>Perfil</Text>
                </TouchableOpacity>
            )}

            {showCloseIcon && (
                <TouchableOpacity style={styles.profileContainer} activeOpacity={0.5} onPress={closeCurrentPage}>
                    <Ionicons name='close-outline' size={48} color={colors.blue_600} />
                    <Text style={styles.profileText}>Fechar</Text>
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
