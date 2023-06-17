import { StyleSheet, Text, View } from 'react-native';
import Header from '../src/components/Header';
import colors from '../src/styles/colors';
import fonts from '../src/styles/fonts';

export default function News() {
    return (
        <View style={styles.container}>
            <Header />

            <View style={styles.newsBody}>
                <Text style={styles.newsTitle}>Titulo Notícia</Text>

                <Text style={styles.dateAndTime}>24/07/2023 - 14:53</Text>

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
                </Text>
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
    },
    newsTitle: {
        color: colors.blue_600,
        fontFamily: fonts.textBold,
        fontSize: 32,
        // backgroundColor: 'red',
    },
    dateAndTime: {
        color: colors.blue_400,
        fontFamily: fonts.text,
        fontSize: 16,
    },
    newsContent: {
        fontSize: 16,
    },
});
