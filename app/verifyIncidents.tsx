import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Header from '../src/components/Header';
import Incident from '../src/components/Incident';
import IncidentDetailsModal from '../src/components/IncidentDetails';
import { useAuth } from '../src/contexts/login-and-notifications-context';
import { apiClient } from '../src/services/axios';
import colors from '../src/styles/colors';
import fonts from '../src/styles/fonts';
import { Incident as IncidentType } from './incidentsAnalysis';

export default function VerifyIncidents() {
    const { user } = useAuth();
    const [incidents, setIncidents] = useState<Array<IncidentType>>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentIncident, setCurrentIncident] = useState<IncidentType>();

    useEffect(() => {
        async function loadIncidents() {
            apiClient
                // .get(`/incidents/by-district?district-name=${user.district}`, {
                .get(`/incidents`, {
                    headers: { Authorization: `Bearer ${user.token}` },
                })
                .then((receivedData) => {
                    // console.log(receivedData.data);
                    setIncidents(receivedData.data.reverse());
                    // setNews(receivedNews.data);
                })
                .catch((error) => console.log(error));
        }

        loadIncidents();
    }, []);

    function setModalOpen(currentItem: IncidentType) {
        setIsModalOpen(true);
        setCurrentIncident(currentItem);
    }

    return (
        <View style={styles.container}>
            <Header showCloseIcon />
            <View style={styles.incidentsContainer}>
                <View style={{ gap: 4 }}>
                    <Text style={styles.subtitle}>Últimos Incidentes noticiados</Text>
                    <Text style={styles.subtitle}>pela Defesa Civil:</Text>
                    <Text style={styles.clickTip}>(clique no incidente para mais detalhes)</Text>
                </View>

                <View
                    style={{
                        flex: 1,
                    }}
                >
                    <FlatList
                        data={incidents}
                        renderItem={({ item }) => (
                            <Incident
                                category={item.category}
                                description={item.description}
                                createdAt={item.created_at}
                                onPressFunction={() => setModalOpen(item)}
                            />
                        )}
                        contentContainerStyle={{ flexGrow: 1 }}
                    ></FlatList>
                </View>

                {currentIncident && (
                    <IncidentDetailsModal
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                        incident={currentIncident}
                    />
                )}
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
        flex: 1,
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
