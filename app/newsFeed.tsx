import { FlatList, StyleSheet, Text, View } from 'react-native';
import Header from '../src/components/Header';
import NewsCard from '../src/components/NewsCard';
import colors from '../src/styles/colors';
import fonts from '../src/styles/fonts';

export default function NewsFeed() {
    return (
        <View style={styles.container}>
            <Header showCloseIcon />

            <View style={styles.feedContainer}>
                <Text style={styles.subtitle}>Feed de Notícias:</Text>

                <View>
                    <FlatList
                        data={[1, 2, 3, 4, 5]}
                        keyExtractor={(newsItem) => String(newsItem)}
                        renderItem={(newsItem) => <NewsCard />}
                        contentContainerStyle={{ gap: 12, paddingBottom: 180 }}
                        showsVerticalScrollIndicator={false}
                    ></FlatList>
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
    },
    feedContainer: {
        gap: 24,
    },
});
