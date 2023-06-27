import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../src/components/Header';
import UserMainMenuOption from '../src/components/MainMenuOptions/UserOption';
import NewsCard from '../src/components/NewsCard';
import UserInfoCard from '../src/components/UserInfoCard';
import { useAuth } from '../src/contexts/login-and-notifications-context';
import { apiClient } from '../src/services/axios';
import colors from '../src/styles/colors';
import fonts from '../src/styles/fonts';
import { News } from './newsFeed';

export default function UserMainMenu() {
    const { user } = useAuth();

    const [news, setNews] = useState<News[]>([]);
    const [errorLoading, setErrorLoading] = useState('');

    useEffect(() => {
        async function loadNews() {
            apiClient
                .get('/notices', { headers: { Authorization: `Bearer ${user.token}` } })
                .then((receivedNews) => {
                    // console.log(receivedNews.data);
                    setNews(receivedNews.data.slice(0, 5));
                })
                .catch((error) => {
                    console.log(error);
                    setErrorLoading('Ops! :( Ocorreu um erro ao carregar as Notícias');
                });
        }

        loadNews();
    }, []);
    const [isUserCardVisible, setIsUserCardVisible] = useState(false);

    return (
        <View style={styles.container}>
            <Header showProfileIcon pressProfileButtonFunction={setIsUserCardVisible} />
            <UserInfoCard isModalVisible={isUserCardVisible} setIsModalVisible={setIsUserCardVisible} />

            <View style={styles.menuContainer}>
                <View style={styles.optionsContainer}>
                    <UserMainMenuOption option='Consultar incidentes' icon='cloud-rain' navigateTo='/verifyIncidents' />
                    <UserMainMenuOption
                        option='Enviar aviso à defesa civil'
                        icon='cloud-arrow'
                        navigateTo='/createNewWarning'
                    />
                    <UserMainMenuOption option='Ver avisos enviados' icon='list' navigateTo='/myIncidents' />
                </View>

                <Text style={styles.subtitle}>Últimas notícias:</Text>

                <FlatList
                    data={news}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <NewsCard
                            category={item.category}
                            created_at={item.created_at}
                            description={item.description}
                            id={item.id}
                            title={item.title}
                        />
                    )}
                    contentContainerStyle={{ gap: 12, paddingBottom: 285 }}
                    // style={{ backgroundColor: 'yellow' }}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={() => <BottomMenuComponent />}
                ></FlatList>
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
    optionsContainer: {
        // backgroundColor: 'green',
        // overflow: 'hidden',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: colors.blue_600,
        paddingBottom: 24,
    },
});
