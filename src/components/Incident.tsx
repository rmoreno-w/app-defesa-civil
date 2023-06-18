import { Feather, MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface IncidentProps {
    icon: 'wind' | 'water-damage' | 'terrain' | 'cloud-rain';
}

export default function Incident({ icon }: IncidentProps) {
    return (
        <TouchableOpacity style={styles.incident} activeOpacity={0.45}>
            <View style={styles.iconWrapper}>
                {icon == 'wind' && <Feather name='wind' size={18} color={colors.blue_50} />}
                {icon == 'cloud-rain' && <Feather name='cloud-rain' size={18} color={colors.blue_50} />}
                {icon == 'water-damage' && <MaterialIcons name='water-damage' size={18} color={colors.blue_50} />}
                {icon == 'terrain' && <MaterialIcons name='terrain' size={18} color={colors.blue_50} />}
            </View>
            <View style={styles.incidentText}>
                <Text ellipsizeMode='tail' numberOfLines={1} style={styles.incidentHeader}>
                    Deslizamento
                </Text>
                <Text ellipsizeMode='tail' numberOfLines={1} style={styles.incidentDescription}>
                    Após chuva intensa, deslizou na rua xabloncio sssssssss
                </Text>
                <Text style={styles.incidentTime}>3 hrs atrás</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    incident: {
        borderBottomWidth: 1,
        borderColor: colors.blue_300,
        paddingBottom: 8,
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
        paddingRight: 12,
        // backgroundColor: 'blue',
    },
    iconWrapper: {
        height: 24,
        width: 24,
        borderRadius: 12,
        backgroundColor: colors.blue_300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    incidentText: {
        gap: 4,
        flex: 1,
        // paddingRight: 4,
        // backgroundColor: 'red',
        flexShrink: 1,
    },
    incidentHeader: {
        fontFamily: fonts.textBold,
        fontSize: 14,
    },
    incidentDescription: {
        fontSize: 12,
    },
    incidentTime: {
        marginTop: 2,
        fontSize: 11,
        color: colors.blue_300,
    },
});
