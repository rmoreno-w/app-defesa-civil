import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../src/components/Header';
import UserMainMenuOption from '../src/components/MainMenuOptions/UserOption';
import NewsCard from '../src/components/NewsCard';
import colors from '../src/styles/colors';
import fonts from '../src/styles/fonts';

export default function Page() {
    function onButtonPress() {}

    return (
        <View style={styles.container}>
            <Header showProfileIcon />

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
                    data={[1, 2, 3, 4, 5]}
                    keyExtractor={(newsItem) => String(newsItem)}
                    renderItem={(newsItem) => <NewsCard />}
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
