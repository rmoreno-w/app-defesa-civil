import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../src/components/Header';
import AgentMainMenuOption from '../src/components/MainMenuOptions/AgentOption';
import UserInfoCard from '../src/components/UserInfoCard';
import colors from '../src/styles/colors';
import fonts from '../src/styles/fonts';

export default function AgentMainMenu() {
    function onButtonPress() {}

    const [isProfileCardVisible, setIsProfileCardVisible] = useState(false);

    return (
        <View style={styles.container}>
            <Header showProfileIcon pressProfileButtonFunction={setIsProfileCardVisible} />
            <UserInfoCard isModalVisible={isProfileCardVisible} setIsModalVisible={setIsProfileCardVisible} />

            <View style={styles.menuContainer}>
                <View style={styles.optionsContainer}>
                    <AgentMainMenuOption option='Analisar incidentes' icon='list' navigateTo='/incidentsAnalysis' />
                    <AgentMainMenuOption option='Novo incidente' icon='map' navigateTo='/createIncident' />
                    <AgentMainMenuOption option='Nova notícia' icon='newspaper' navigateTo='/createNews' />
                    <AgentMainMenuOption option='Feed de notícias' icon='list-news' navigateTo='/newsFeed' />
                    <AgentMainMenuOption
                        option={`Dados meteorológicos ${`\n`}do dia`}
                        icon='cloud-rain'
                        navigateTo='/weatherForecast'
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
