import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../src/components/Header';
import colors from '../src/styles/colors';
import fonts from '../src/styles/fonts';

const riskScale = {
    'High Danger': colors.red,
    Danger: colors.orange,
    'Potential Danger': colors.yellow,
};

export default function IncidentDetails() {
    const incidentRisk = 'High Danger';

    return (
        <View style={styles.container}>
            <Header showCloseIcon />

            <View style={styles.incidentContainer}>
                <Text style={styles.subtitle}>Detalhes do Incidente</Text>

                <View style={styles.incidentCategorization}>
                    <View style={styles.incidentCategory}>
                        <Text style={styles.incidentAttribute}>Categoria</Text>
                        <View style={styles.categoryIconWrapper}>
                            <Feather name='wind' size={18} color={colors.blue_50} />
                        </View>
                        <Text>Vento Intenso</Text>
                    </View>

                    <View style={styles.incidentRiskContainer}>
                        <Text style={styles.incidentAttribute}>Escala de Risco</Text>
                        <Text style={[styles.incidentRisk, { color: riskScale[incidentRisk] }]}>3 - Alto</Text>
                    </View>
                </View>

                <View style={styles.regionWrapper}>
                    <Text style={styles.incidentAttribute}>Região (Bairros Afetados)</Text>
                    <Text>BPS, Centro, Pinheirinho</Text>
                </View>

                <View style={styles.descriptionWrapper}>
                    <Text style={styles.incidentAttribute}>Descrição</Text>
                    <Text>Descrição do incidente enviada pelo usuário ou feita por fiscal</Text>
                </View>
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
    subtitle: {
        fontFamily: fonts.textBold,
        fontSize: 20,
        color: colors.blue_900,
    },
    incidentContainer: {
        gap: 32,
    },
    incidentCategory: {
        alignItems: 'center',
        gap: 4,
    },
    incidentCategorization: {
        borderTopWidth: 1,
        borderTopColor: colors.blue_300,
        borderBottomWidth: 1,
        borderBottomColor: colors.blue_300,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8,
    },
    incidentAttribute: {
        fontSize: 16,
        fontFamily: fonts.textBold,
        color: colors.blue_600,
    },
    categoryIconWrapper: {
        height: 24,
        width: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.blue_300,
    },
    incidentRiskContainer: {
        alignItems: 'center',
        gap: 12,
        // backgroundColor: 'red',
    },
    incidentRisk: {
        fontFamily: fonts.textBold,
        fontSize: 16,
    },
    regionWrapper: {
        gap: 8,
    },
    descriptionWrapper: {
        gap: 8,
    },
});
