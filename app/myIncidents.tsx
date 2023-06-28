import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../src/components/Header';
import { useAuth } from '../src/contexts/login-and-notifications-context';
import { apiClient } from '../src/services/axios';
import { getDate } from '../src/services/getDate';
import colors from '../src/styles/colors';
import fonts from '../src/styles/fonts';
import { Incident } from './incidentsAnalysis';

export default function MyIncidents() {
    const { user } = useAuth();
    const [myIncidentss, setMyIncidentss] = useState<Array<string>>(['Sim', 'Não', 'Aham', 'Claro']);
    const [myIncidents, setMyIncidents] = useState<Array<Incident>>([]);

    useEffect(() => {
        async function loadIncidents() {
            apiClient
                .get('/incidents/my', { headers: { Authorization: `Bearer ${user.token}` } })
                .then((receivedData) => {
                    // console.log(receivedData.data);
                    setMyIncidents(receivedData.data);
                    // setNews(receivedNews.data);
                })
                .catch((error) => console.log(error));
        }

        loadIncidents();
    }, []);

    return (
        <View style={styles.container}>
            <Header showCloseIcon />

            <View style={styles.menuContainer}>
                <Text style={styles.subtitle}>Avisos que enviei para a Defesa Civil:</Text>

                {myIncidents.length == 0 && (
                    <View style={styles.noIncidentsContainer}>
                        <Feather name='meh' size={24} color={colors.blue_600} />
                        <View style={{ flexShrink: 1 }}>
                            <Text>Ops! Você ainda não enviou nenhum aviso.</Text>
                        </View>
                    </View>
                )}
                {myIncidents.length != 0 && (
                    <View>
                        <View style={styles.headerContainer}>
                            <Text style={styles.headerDescription}>Descrição</Text>
                            <Text style={styles.headerDate}>Data</Text>
                            <Text style={styles.headerStatus}>Status</Text>
                        </View>
                        {myIncidents.map((incident, index) => (
                            <View
                                key={index}
                                style={
                                    index == myIncidents.length - 1
                                        ? [styles.incidentLineContainer, { borderBottomColor: colors.blue_600 }]
                                        : styles.incidentLineContainer
                                }
                            >
                                <Text style={styles.incidentDescription} ellipsizeMode='tail' numberOfLines={1}>
                                    {incident.description}
                                </Text>
                                <Text style={styles.incidentDate}>{getDate(incident.created_at)}</Text>
                                <View style={styles.incidentStatus}>
                                    {incident.status == 'PENDING' && (
                                        <Feather name='clock' size={16} color={colors.yellow} />
                                    )}
                                    {incident.status == 'REGISTERED' && (
                                        <Feather name='check' size={16} color={colors.green} />
                                    )}
                                    {incident.status == 'SOLVED' && (
                                        <Feather name='check-square' size={16} color={colors.green} />
                                    )}
                                </View>
                            </View>
                        ))}
                    </View>
                )}

                <View style={styles.iconDescriptionContainer}>
                    <Text style={styles.iconDescription}>Significado dos ícones de Status:</Text>

                    <View style={styles.iconDescriptionLine}>
                        <Feather name='clock' size={16} color={colors.yellow} />
                        <Text>- Enviado para análise pela Defesa Civil</Text>
                    </View>
                    <View style={styles.iconDescriptionLine}>
                        <Feather name='check' size={16} color={colors.green} />
                        <Text>- Aviso verificado por um fiscal</Text>
                    </View>
                    <View style={styles.iconDescriptionLine}>
                        <Feather name='check-square' size={16} color={colors.green} />
                        <Text>- Incidente Resolvido</Text>
                    </View>
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
        // textAlign: 'center',
        // backgroundColor: 'red',
    },
    menuContainer: {
        // backgroundColor: 'lightblue',
        gap: 24,
    },
    noIncidentsContainer: {
        // backgroundColor: 'green',
        // overflow: 'hidden',
        flexDirection: 'row',
        // flexWrap: 'wrap',
        alignItems: 'center',
        // borderBottomWidth: 1,
        // borderBottomColor: colors.blue_600,
        // paddingBottom: 24,
        gap: 8,
    },
    headerContainer: {
        flexDirection: 'row',
        borderTopWidth: 2,
        borderTopColor: colors.blue_600,
        borderBottomWidth: 2,
        borderBottomColor: colors.blue_600,
        padding: 8,
    },
    headerDescription: {
        fontFamily: fonts.textBold,
        color: colors.blue_600,
        width: '45%',
        paddingLeft: 4,
    },
    headerDate: {
        fontFamily: fonts.textBold,
        color: colors.blue_600,
        width: '35%',
        paddingLeft: 4,
    },
    headerStatus: {
        fontFamily: fonts.textBold,
        color: colors.blue_600,
        paddingLeft: 4,
        width: '20%',
    },
    incidentLineContainer: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: colors.blue_300,
        padding: 8,
    },
    incidentDescription: {
        width: '45%',
        paddingLeft: 4,
        flexShrink: 1,
    },
    incidentDate: {
        width: '35%',
        paddingLeft: 4,
    },
    incidentStatus: {
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
});
