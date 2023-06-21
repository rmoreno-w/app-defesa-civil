import { StyleSheet, View } from 'react-native';
import Header from '../src/components/Header';
import AgentMainMenuOption from '../src/components/MainMenuOptions/AgentOption';
import colors from '../src/styles/colors';
import fonts from '../src/styles/fonts';

export default function Page() {
    function onButtonPress() {}

    return (
        <View style={styles.container}>
            <Header showProfileIcon />

            <View style={styles.menuContainer}>
                <View style={styles.optionsContainer}>
                    <AgentMainMenuOption
                        option='Analisar incidentes enviados por usuários'
                        icon='list'
                        navigateTo='/verifyIncidents'
                    />
                    <AgentMainMenuOption option='Novo incidente' icon='map' navigateTo='/createIncident' />
                    <AgentMainMenuOption option='Nova notícia' icon='newspaper' navigateTo='/createNews' />
                    <AgentMainMenuOption option='Feed de notícias' icon='list-news' navigateTo='/newsFeed' />
                    <AgentMainMenuOption
                        option={`Dados meteorológicos ${`\n`}do dia`}
                        icon='cloud-rain'
                        navigateTo='/myIncidents'
                    />
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
        gap: 24,
        // backgroundColor: 'lightblue',
        flexGrow: 1,
    },
    optionsContainer: {
        // backgroundColor: 'green',
        // overflow: 'hidden',
        flexDirection: 'row',
        flexWrap: 'wrap',
        // justifyContent: 'space-between',
        // borderBottomWidth: 1,
        // borderBottomColor: colors.blue_600,
        // paddingBottom: 24,
        gap: 12,
    },
});
