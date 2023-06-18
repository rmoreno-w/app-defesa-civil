import { StyleSheet, Text, View } from 'react-native';
import Header from '../src/components/Header';
import Incident from '../src/components/Incident';
import colors from '../src/styles/colors';
import fonts from '../src/styles/fonts';

export default function VerifyIncidents() {
    return (
        <View style={styles.container}>
            <Header showCloseIcon />
            <View style={styles.incidentsContainer}>
                <View style={{ gap: 4 }}>
                    <Text style={styles.subtitle}>Últimos Incidentes noticiados</Text>
                    <Text style={styles.subtitle}>pela Defesa Civil:</Text>
                    <Text style={styles.clickTip}>(clique no incidente para mais detalhes)</Text>
                </View>

                <Incident icon='water-damage' />
                <Incident icon='wind' />
                <Incident icon='terrain' />
                <Incident icon='cloud-rain' />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 48,
        paddingHorizontal: 16,
        backgroundColor: colors.blue_50,
    },
    incidentsContainer: {
        gap: 24,
    },
    subtitle: {
        fontFamily: fonts.textBold,
        fontSize: 20,
        color: colors.blue_900,
        // textAlign: 'center',
        // backgroundColor: 'red',
    },
    clickTip: {
        fontFamily: fonts.text,
        fontSize: 12,
    },
});
