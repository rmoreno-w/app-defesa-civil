import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../src/components/Header';
import { useAuth } from '../src/contexts/login-and-notifications-context';
import { apiClient } from '../src/services/axios';
import { getDate } from '../src/services/getDate';
import { getTime } from '../src/services/getTime';
import colors from '../src/styles/colors';
import fonts from '../src/styles/fonts';

export interface Incident {
    category: string;
    created_at: string;
    description: string;
    districts_name: Array<string>;
    id: string;
    risk_scale: number;
    status: string;
    updated_at: string;
    user_id: string;
}

export default function IncidentsAnalysis() {
    const { user } = useAuth();

    // const [news, setNews] = useState<News[]>([]);
    const [errorLoading, setErrorLoading] = useState('');

    const [incidents, setIncidents] = useState<Array<Incident>>([]);
    // const [incidents, setIncidents] = useState<Array<string>>([
    //     'Sim Sim Sim Sim Sim Sim Sim Sim Sim Sim Sim ',
    //     'Não',
    //     'Não',
    //     'Não',
    //     'Aham',
    //     'Claro',
    //     'Claro',
    //     'Claro',
    //     'Claro',
    //     'Claro',
    // ]);

    useEffect(() => {
        async function loadIncidents() {
            apiClient
                .get('/incidents', { headers: { Authorization: `Bearer ${user.token}` } })
                .then((receivedData) => {
                    // console.log(receivedData.data);
                    setIncidents(receivedData.data.reverse());
                    // setNews(receivedNews.data);
                })
                .catch((error) => console.log(error));
        }

        loadIncidents();
    }, []);

    const router = useRouter();

    function navigateToIncident() {
        router.push('/createIncident');
    }

    return (
        <View style={styles.container}>
            <Header showCloseIcon />

            <View style={styles.incidentsContainer}>
                <Text style={styles.subtitle}>Analisar Incidentes</Text>

                <View style={styles.iconDescriptionContainer}>
                    <Text style={styles.iconDescription}>Significado dos ícones de Status:</Text>

                    <View style={styles.iconDescriptionLine}>
                        <Feather name='clock' size={16} color={colors.yellow} />
                        <Text>- Análise Pendente</Text>
                    </View>
                    <View style={styles.iconDescriptionLine}>
                        <Feather name='check' size={16} color={colors.green} />
                        <Text>- Incidente Registrado</Text>
                    </View>
                    <View style={styles.iconDescriptionLine}>
                        <Feather name='x' size={16} color={colors.red} />
                        <Text>- Incidente Rejeitado</Text>
                    </View>
                    <View style={styles.iconDescriptionLine}>
                        <Feather name='check-square' size={16} color={colors.green} />
                        <Text>- Incidente Resolvido</Text>
                    </View>
                </View>

                <Text style={styles.iconDescription}>Clique em um dos Incidentes para ver mais detalhes</Text>

                {incidents.length == 0 && (
                    <View style={styles.noIncidentsContainer}>
                        <Feather name='meh' size={24} color={colors.blue_600} />
                        <View style={{ flexShrink: 1 }}>
                            <Text>Ops! Ainda não há nenhum incidente cadastrado.</Text>
                        </View>
                    </View>
                )}
                {incidents.length != 0 && (
                    <View style={{ flex: 1, overflow: 'hidden' }}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.headerDescription}>Descrição</Text>
                            <Text style={styles.headerDate}>Data</Text>
                            <Text style={styles.headerStatus}>Status</Text>
                        </View>

                        <View>
                            <FlatList
                                contentContainerStyle={{ flexGrow: 1, paddingBottom: 41 }}
                                data={incidents}
                                renderItem={({ item, index }) => (
                                    <TableRow index={index} incidentsLength={incidents.length} incident={item} />
                                )}
                            ></FlatList>
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
}

interface TableRowProps {
    index: number;
    incidentsLength: number;
    incident: Incident;
}

function TableRow({ index, incidentsLength, incident }: TableRowProps) {
    const router = useRouter();

    function navigateToIncident() {
        router.push(`/createIncident?id=${incident.id}`);
    }

    return (
        <TouchableOpacity
            onPress={navigateToIncident}
            activeOpacity={0.5}
            key={index}
            style={
                index == incidentsLength - 1
                    ? [styles.incidentLineContainer, { borderBottomColor: colors.blue_600 }]
                    : styles.incidentLineContainer
            }
        >
            <Text style={styles.incidentDescription} ellipsizeMode='tail' numberOfLines={2}>
                {incident.description}
            </Text>
            <View style={styles.incidentDate}>
                <Text>{getTime(incident.created_at)}</Text>
                <Text style={{ fontSize: 10 }}>{getDate(incident.created_at)}</Text>
            </View>
            <View style={styles.incidentStatus}>
                {incident.status == 'PENDING' && <Feather name='clock' size={16} color={colors.yellow} />}
                {incident.status == 'REGISTERED' && <Feather name='check' size={16} color={colors.green} />}
                {incident.status == 'REJECTED' && <Feather name='x' size={16} color={colors.red} />}
                {incident.status == 'SOLVED' && <Feather name='check-square' size={16} color={colors.green} />}
            </View>
        </TouchableOpacity>
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
        flex: 1,
    },
    subtitle: {
        fontFamily: fonts.textBold,
        fontSize: 20,
        color: colors.blue_900,
        // textAlign: 'center',
        // backgroundColor: 'red',
    },
    incidentLineContainer: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: colors.blue_300,
        padding: 8,
        gap: 8,
        alignItems: 'center',
    },
    noIncidentsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // borderBottomWidth: 1,
        // borderBottomColor: colors.blue_600,
        // paddingBottom: 24,
        gap: 8,
    },
    incidentDescription: {
        // backgroundColor: 'green',
        width: '55%',
        paddingLeft: 4,
        flexShrink: 1,
    },
    incidentDate: {
        // backgroundColor: 'green',
        width: '25%',
        paddingLeft: 4,
        gap: 4,
    },
    incidentStatus: {
        // backgroundColor: 'green',
        paddingLeft: 4,
        width: '20%',
        alignItems: 'center',
    },
    iconDescription: {
        fontFamily: fonts.textBold,
        fontSize: 14,
        color: colors.blue_600,
    },
    iconDescriptionContainer: {
        gap: 12,
    },
    iconDescriptionLine: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
    },
    headerContainer: {
        flexDirection: 'row',
        borderTopWidth: 2,
        borderTopColor: colors.blue_600,
        borderBottomWidth: 2,
        borderBottomColor: colors.blue_600,
        padding: 8,
        gap: 8,
        alignItems: 'center',
    },
    headerDescription: {
        // backgroundColor: 'green',
        fontFamily: fonts.textBold,
        color: colors.blue_600,
        width: '55%',
        paddingLeft: 4,
        flexShrink: 1,
    },
    headerDate: {
        // backgroundColor: 'green',
        fontFamily: fonts.textBold,
        color: colors.blue_600,
        width: '25%',
        paddingLeft: 4,
    },
    headerStatus: {
        // backgroundColor: 'green',
        fontFamily: fonts.textBold,
        color: colors.blue_600,
        paddingLeft: 4,
        width: '20%',
    },
});
