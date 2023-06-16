import { FlatList, StyleSheet, Text, View } from 'react-native';
import MainMenuOption from '../src/components/MainMenuOption';
import NewsCard from '../src/components/NewsCard';
import colors from '../src/styles/colors';
import fonts from '../src/styles/fonts';

export default function Page() {
    function onButtonPress() {}

    return (
        <View style={styles.container}>
            <Text style={styles.title}>SisVil</Text>

            <View style={styles.menuContainer}>
                <Text style={styles.subtitle}>Main Menu</Text>
                <View style={styles.optionsContainer}>
                    <MainMenuOption option='Consultar meus incidentes' icon='list' />
                    <MainMenuOption option='Reportar incidente' icon='cloud' />
                </View>

                <Text>Últimas notícias:</Text>
                <FlatList
                    data={[1, 2, 3, 4, 5]}
                    keyExtractor={(newsItem) => String(newsItem)}
                    renderItem={(newsItem) => <NewsCard />}
                    contentContainerStyle={{ gap: 12, paddingBottom: 280 }}
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
    title: {
        // backgroundColor: 'green',
        fontFamily: fonts.heading,
        fontSize: 56,
        textAlign: 'center',
        color: colors.blue_800,
    },
    subtitle: {
        fontFamily: fonts.text,
        fontSize: 16,
        color: colors.blue_900,
        textAlign: 'center',
        // backgroundColor: 'red',
    },
    menuContainer: {
        gap: 24,
    },
    optionsContainer: {
        // backgroundColor: 'red',
        flexDirection: 'row',
        gap: 24,
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
});
