import { FlatList, StyleSheet, Text, View } from 'react-native';
import Header from '../src/components/Header';
import MainMenuOption from '../src/components/MainMenuOption';
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
                    <MainMenuOption option='Consultar incidentes' icon='cloud-rain' navigateTo='/verifyIncidents' />
                    <MainMenuOption
                        option='Enviar aviso à defesa civil'
                        icon='cloud-arrow'
                        navigateTo='/createNewWarning'
                    />
                    <MainMenuOption option='Ver avisos enviados' icon='list' navigateTo='/createNewWarning' />
                </View>

                <Text style={styles.subtitle}>Últimas notícias:</Text>

                <FlatList
                    data={[1, 2, 3, 4, 5]}
                    keyExtractor={(newsItem) => String(newsItem)}
                    renderItem={(newsItem) => <NewsCard />}
                    contentContainerStyle={{ gap: 12, paddingBottom: 280 }}
                    // style={{ backgroundColor: 'yellow' }}
                    showsVerticalScrollIndicator={false}
                ></FlatList>
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.blue_600,
        marginBottom: 24,
    },
    title: {
        // backgroundColor: 'green',
        fontFamily: fonts.heading,
        fontSize: 56,
        textAlign: 'center',
        color: colors.blue_800,
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
