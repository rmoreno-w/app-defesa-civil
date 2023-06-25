import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Header from '../src/components/Header';
import NewsCard from '../src/components/NewsCard';
import { useAuth } from '../src/contexts/login-and-notifications-context';
import { apiClient } from '../src/services/axios';
import colors from '../src/styles/colors';
import fonts from '../src/styles/fonts';

interface News {
    agent_id: string;
    category: string;
    created_at: string;
    description: string;
    id: string;
    title: string;
    updated_at: string;
}

export default function NewsFeed() {
    const { user } = useAuth();

    const [news, setNews] = useState<News[]>([]);
    const [errorLoading, setErrorLoading] = useState('');

    useEffect(() => {
        async function loadNews() {
            apiClient
                .get('/notices', { headers: { Authorization: `Bearer ${user.token}` } })
                .then((receivedNews) => {
                    console.log(receivedNews.data);
                    setNews(receivedNews.data);
                })
                .catch((error) => console.log(error));
        }

        loadNews();
    }, []);

    return (
        <View style={styles.container}>
            <Header showCloseIcon />

            <View style={styles.feedContainer}>
                <Text style={styles.subtitle}>Feed de Notícias:</Text>

                <View>
                    {news.length == 0 && (
                        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                            <Feather name='meh' size={24} color={colors.blue_600} />
                            <Text style={{ flexShrink: 1 }}>Ops! Ainda não há nenhuma notícia cadastrada.</Text>
                        </View>
                    )}
                    {errorLoading && (
                        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                            <Feather name='meh' size={24} color={colors.blue_600} />
                            <Text style={{ flexShrink: 1 }}>
                                Ops! Houve um erro ao carregar as notícias, por favor tente acessar novamente em alguns
                                instantes
                            </Text>
                        </View>
                    )}
                    {!errorLoading && (
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
                            contentContainerStyle={{ gap: 12, paddingBottom: 180 }}
                            showsVerticalScrollIndicator={false}
                        ></FlatList>
                    )}
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
