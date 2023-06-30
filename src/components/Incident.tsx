import { Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface IncidentProps {
    // category: 'SEVERE_STORM' | 'FLOOD' | 'LANDSLIDE' | 'FIRE' | 'INTENSE_WIND' | 'HIGH_TEMPERATURES' | 'OTHERS';
    category: string;
    description: string;
    createdAt: string;
    onPressFunction: () => void;
}

const formattedCategory = {
    SEVERE_STORM: 'Chuva Intensa',
    FLOOD: 'Inundação',
    LANDSLIDE: 'Deslizamento de Terra',
    FIRE: 'Fogo / Incêndio',
    INTENSE_WIND: 'Vento Intenso',
    HIGH_TEMPERATURES: 'Temperaturas Altas',
    OTHERS: 'Outros',
};

export default function Incident({ category, createdAt, description, onPressFunction }: IncidentProps) {
    const router = useRouter();

    function calculateTime() {
        const timeOfCreation = new Date(createdAt);
        const currentTime = new Date();

        // console.log(`${timeOfCreation.getDate()}, ${timeOfCreation.getHours()} ${timeOfCreation.getMinutes()}`)
        // console.log(`${currentTime.getDay()}, ${currentTime.getHours()} ${currentTime.getMinutes()}`)
        const timeDifference = currentTime.getTime() - timeOfCreation.getTime();
        // console.log(currentTime);

        // Se for maior que 1 dia, mostrar dias
        if (timeDifference > 86_400_000) return `${Math.floor(timeDifference / 86_400_000)} dia(s) atrás`;
        else if (timeDifference > 3_600_000) return `${Math.floor(timeDifference / 3_600_000)} hora(s) atrás`;
        else if (timeDifference > 60_000) return `${Math.floor(timeDifference / 60_000)} minuto(s) atrás`;
        else return `${Math.floor(timeDifference / 1_000)} segundo(s) atrás`;
    }

    return (
        <TouchableOpacity style={styles.incident} activeOpacity={0.45} onPress={onPressFunction}>
            <View style={styles.iconWrapper}>
                {category == 'SEVERE_STORM' && <Feather name='cloud-rain' size={18} color={colors.blue_50} />}
                {category == 'FLOOD' && <MaterialCommunityIcons name='home-flood' size={18} color={colors.blue_50} />}
                {category == 'LANDSLIDE' && <MaterialIcons name='terrain' size={18} color={colors.blue_50} />}
                {category == 'INTENSE_WIND' && <Feather name='wind' size={18} color={colors.blue_50} />}
                {category == 'FIRE' && <MaterialIcons name='local-fire-department' size={18} color={colors.blue_50} />}
                {category == 'HIGH_TEMPERATURES' && (
                    <MaterialCommunityIcons name='sun-thermometer-outline' size={18} color={colors.blue_50} />
                )}
                {category == 'OTHERS' && <Feather name='tool' size={18} color={colors.blue_50} />}
            </View>
            <View style={styles.incidentText}>
                <Text ellipsizeMode='tail' numberOfLines={1} style={styles.incidentHeader}>
                    {formattedCategory[category]}
                </Text>
                <Text ellipsizeMode='tail' numberOfLines={1} style={styles.incidentDescription}>
                    {description}
                </Text>
                <Text style={styles.incidentTime}>{calculateTime()}</Text>
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
