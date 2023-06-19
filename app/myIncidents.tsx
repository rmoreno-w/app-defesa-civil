import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../src/components/Header';
import colors from '../src/styles/colors';
import fonts from '../src/styles/fonts';

export default function MyIncidents() {
    const [myIncidents, setMyIncidents] = useState<Array<string>>(['Sim', 'Não']);
    return (
        <View style={styles.container}>
            <Header showCloseIcon />

            <View style={styles.menuContainer}>
                <Text style={styles.subtitle}>Avisos que enviei para a Defesa Civil:</Text>

                {myIncidents.length == 0 && (
                    <View style={styles.noIncidentsContainer}>
                        <Feather name='meh' size={24} color={colors.blue_600} />
                        <Text>Ops! Você ainda não enviou nenhum aviso.</Text>
                    </View>
                )}
                {myIncidents.length != 0 && (
                    <View style={styles.incidentsContainer}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.headerDescription}>Descrição</Text>
                            <Text style={styles.headerDate}>Data</Text>
                            <Text style={styles.headerStatus}>Status</Text>
                        </View>
                        {myIncidents.map((incident, index) => (
                            <View style={styles.incidentLineContainer}>
                                <Text style={styles.incidentDescription} ellipsizeMode='tail' numberOfLines={1}>
                                    {incident}
                                </Text>
                                <Text style={styles.incidentDate}>22/04/1993</Text>
                                <View style={styles.incidentStatus}>
                                    {/* <Feather name='check' size={16} color={colors.green} /> */}
                                    <Feather name='clock' size={16} color={colors.yellow} />
                                </View>
                            </View>
                        ))}
                    </View>
                )}

                <View style={styles.iconDescriptionContainer}>
                    <Text style={styles.iconDescription}>Significado dos ícones:</Text>
                    <View style={styles.iconDescriptionLine}>
                        <Feather name='clock' size={16} color={colors.yellow} />
                        <Text>- Enviado para análise pela Defesa Civil</Text>
                    </View>
                    <View style={styles.iconDescriptionLine}>
                        <Feather name='check' size={16} color={colors.green} />
                        <Text>- Aviso verificado por um fiscal</Text>
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
    incidentsContainer: {},
    headerContainer: {
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: colors.blue_600,
        padding: 8,
    },
    headerDescription: {
        width: '45%',
        paddingLeft: 4,
    },
    headerDate: {
        width: '35%',
        paddingLeft: 4,
    },
    headerStatus: {
        paddingLeft: 4,
        width: '20%',
    },
    header: {
        padding: 4,
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
