import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../src/components/Header';
import Incident from '../src/components/Incident';
import IncidentDetailsModal from '../src/components/IncidentDetails';
import UserInfoCard from '../src/components/UserInfoCard';
import { useAuth } from '../src/contexts/login-and-notifications-context';
import { apiClient } from '../src/services/axios';
import colors from '../src/styles/colors';
import fonts from '../src/styles/fonts';
import { Incident as IncidentType } from './incidentsAnalysis';

export default function EmergencyServiceMainMenu() {
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

    const [isUserCardVisible, setIsUserCardVisible] = useState(false);

    return (
        <View style={styles.container}>
            <Header showProfileIcon pressProfileButtonFunction={setIsUserCardVisible} />
            <UserInfoCard isModalVisible={isUserCardVisible} setIsModalVisible={setIsUserCardVisible} />

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

function BottomMenuComponent() {
    const router = useRouter();

    function navigate() {
        router.push('/newsFeed');
    }

    return (
        <TouchableOpacity
            onPress={navigate}
            activeOpacity={0.5}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderWidth: 3,
                borderColor: colors.blue_600,
                borderRadius: 8,
                // borderBottomWidth: 3,
                // borderBottomColor: colors.blue_600,
            }}
        >
            <View
                style={{
                    borderRightWidth: 1,
                    borderRightColor: colors.blue_600,
                    width: '70%',
                }}
            >
                <Text style={{ padding: 12 }}>Acessar todas as notícias</Text>
            </View>
            <View style={{ width: '30%', alignItems: 'center' }}>
                <MaterialIcons name='dynamic-feed' size={24} color={colors.blue_600} />
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
    clickTip: {
        fontFamily: fonts.text,
        fontSize: 12,
    },
});
