import { Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { Incident as IncidentType } from '../../app/incidentsAnalysis';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface IncidentDetailsProps {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    incident: IncidentType;
}

const riskScaleColor = {
    3: colors.red,
    2: colors.orange,
    1: colors.yellow,
    0: colors.blue_400,
};

const formattedCategory = {
    SEVERE_STORM: 'Chuva Intensa',
    FLOOD: 'Inundação',
    LANDSLIDE: 'Deslizamento de Terra',
    FIRE: 'Fogo / Incêndio',
    INTENSE_WIND: 'Vento Intenso',
    HIGH_TEMPERATURES: 'Temperaturas Altas',
    OTHERS: 'Outros',
};

export default function IncidentDetailsModal({ isModalOpen, setIsModalOpen, incident }: IncidentDetailsProps) {
    const incidentRisk = 3;

    function classifyRisk(precipitation: number) {
        if (precipitation == 0) return 'Sem Perigo';
        else if (precipitation == 1) return 'Perigo Potencial';
        else if (precipitation == 2) return 'Perigo';
        else if (precipitation == 3) return 'Grande Perigo';
    }

    return (
        <Modal transparent animationType='fade' visible={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
            <View style={styles.modalBackground}>
                <View style={styles.modalWrapper}>
                    <View style={styles.incidentContainer}>
                        <Text style={styles.subtitle}>Detalhes do Incidente</Text>

                        <View style={styles.incidentCategorization}>
                            <View style={styles.incidentCategory}>
                                <Text style={styles.incidentAttribute}>Categoria</Text>
                                <View style={styles.categoryIconWrapper}>
                                    {incident.category == 'SEVERE_STORM' && (
                                        <Feather name='cloud-rain' size={18} color={colors.blue_50} />
                                    )}
                                    {incident.category == 'FLOOD' && (
                                        <MaterialCommunityIcons name='home-flood' size={18} color={colors.blue_50} />
                                    )}
                                    {incident.category == 'LANDSLIDE' && (
                                        <MaterialIcons name='terrain' size={18} color={colors.blue_50} />
                                    )}
                                    {incident.category == 'INTENSE_WIND' && (
                                        <Feather name='wind' size={18} color={colors.blue_50} />
                                    )}
                                    {incident.category == 'FIRE' && (
                                        <MaterialIcons name='local-fire-department' size={18} color={colors.blue_50} />
                                    )}
                                    {incident.category == 'HIGH_TEMPERATURES' && (
                                        <MaterialCommunityIcons
                                            name='sun-thermometer-outline'
                                            size={18}
                                            color={colors.blue_50}
                                        />
                                    )}
                                    {incident.category == 'OTHERS' && (
                                        <Feather name='tool' size={18} color={colors.blue_50} />
                                    )}
                                </View>
                                <Text>{formattedCategory[incident.category]}</Text>
                            </View>

                            <View style={styles.incidentRiskContainer}>
                                <Text style={styles.incidentAttribute}>Escala de Risco</Text>
                                <Text style={[styles.incidentRisk, { color: riskScaleColor[incident.risk_scale] }]}>
                                    {incident.risk_scale} - {classifyRisk(incident.risk_scale)}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.regionWrapper}>
                            <Text style={styles.incidentAttribute}>Região (Bairros Afetados)</Text>
                            <Text>{incident.districts_name.join(', ')}</Text>
                        </View>

                        <View style={styles.descriptionWrapper}>
                            <Text style={styles.incidentAttribute}>Descrição</Text>
                            <Text>{incident.description}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalWrapper: {
        marginVertical: 32,
        paddingVertical: 32,
        paddingHorizontal: 16,
        backgroundColor: colors.blue_50,
        minWidth: '90%',
        gap: 16,
        flexGrow: 0,
        borderRadius: 12,
    },
    cardSpacing: {
        alignItems: 'center',
        gap: 16,
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
