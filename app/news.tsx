import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../src/components/Header';
import colors from '../src/styles/colors';
import fonts from '../src/styles/fonts';

export default function News() {
    return (
        <View style={styles.container}>
            <Header showCloseIcon />

            <View style={styles.newsBody}>
                <Text style={styles.newsTitle}>Titulo Notícia</Text>

                <View style={styles.dateWrapper}>
                    <Text style={styles.publishedAt}>Publicada em:</Text>
                    <Text style={styles.dateAndTime}>24/07/2023 - 14:53</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 70 }}>
                    <Text style={styles.newsContent}>
                        Notícia atenção notícia
                        {'\n'}
                        Notícia atenção notícia
                        {'\n'}
                        Notícia atenção notícia
                        {'\n'}
                        Notícia atenção notícia
                        {'\n'}
                        Notícia atenção notícia
                        {'\n'}
                        Notícia atenção notícia
                        {'\n'}
                        Notícia atenção notícia
                        {'\n'}
                        Notícia atenção notícia
                        {'\n'}
                        Notícia atenção notícia
                        {'\n'}
                        Notícia atenção notícia
                        {'\n'}
                        Notícia atenção notícia
                        {'\n'}
                        Notícia atenção notícia
                        {'\n'}
                        Notícia atenção notícia
                        {'\n'}
                        Notícia atenção notícia
                        {'\n'}
                        Notícia atenção notícia
                        {'\n'}
                        Notícia atenção notícia
                        {'\n'}
                        Notícia atenção notícia
                        {'\n'}
                        Notícia atenção notícia
                        {'\n'}
                        Notícia atenção notícia
                        {'\n'}
                        Notícia atenção notícia
                        {'\n'}
                        Notícia atenção notícia
                        {'\n'}
                        Notícia atenção notícia
                        {'\n'}
                        Notícia atenção notícia
                        {'\n'}
                        Notícia atenção notícia
                        {'\n'}
                        Notícia atenção notícia
                        {'\n'}
                        Notícia atenção notícia
                        {'\n'}
                        Notícia atenção notícia
                        {'\n'}
                        Notícia atenção notícia
                        {'\n'}
                        Fim
                    </Text>
                </ScrollView>
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
        // backgroundColor: 'red',
    },

    newsBody: {
        gap: 16,
        overflow: 'scroll',
    },
    newsTitle: {
        color: colors.blue_600,
        fontFamily: fonts.textBold,
        fontSize: 32,
        // backgroundColor: 'red',
    },
    dateWrapper: {
        flexDirection: 'row',
        paddingBottom: 4,
        borderBottomWidth: 1,
        borderBottomColor: colors.blue_600,
    },
    publishedAt: {
        fontFamily: fonts.textBold,
        marginRight: 4,
        fontSize: 14,
        color: colors.blue_600,
    },
    dateAndTime: {
        color: colors.blue_900,
        fontFamily: fonts.text,
        fontSize: 14,
    },
    newsContent: {
        fontSize: 16,
    },
});
