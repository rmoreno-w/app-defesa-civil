import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../src/components/Header';
import { useAuth } from '../src/contexts/login-and-notifications-context';
import { apiClient } from '../src/services/axios';
import { formatTime } from '../src/services/formatTime';
import colors from '../src/styles/colors';
import fonts from '../src/styles/fonts';

interface NewsProps {
    agent_id: string;
    category: string;
    created_at: string;
    description: string;
    id: string;
    title: string;
    updated_at: string;
}

const categoryMap = {
    EDUCATIONAL: 'Educacional',
    WARNING: 'Aviso',
    METEOROLOGY: 'Meteorologia',
    OTHERS: 'Outro',
};
export default function News() {
    const { id } = useLocalSearchParams();
    const { user } = useAuth();
    const [newsDetails, setNewsDetails] = useState<NewsProps>({
        agent_id: '',
        category: 'Categoria',
        created_at: '____-__-__T__:__',
        description: 'Descrição da Notícia',
        id: '',
        title: 'Título da notícia',
        updated_at: '',
    });

    useEffect(() => {
        async function loadNews() {
            apiClient
                .get(`/notices/${id}`, { headers: { Authorization: `Bearer ${user.token}` } })
                .then((retrievedData) => setNewsDetails(retrievedData.data))
                .catch((error) => console.log(`Erro ao carregar detalhes de noticia`));
        }

        loadNews();
    }, []);

    return (
        <View style={styles.container}>
            <Header showCloseIcon />

            <View style={styles.newsBody}>
                <Text style={styles.newsTitle}>{newsDetails.title}</Text>

                <View style={styles.categoryWrapper}>
                    <Text style={styles.categoryLabel}>Categoria:</Text>
                    <Text style={styles.category}>{categoryMap[newsDetails.category]}</Text>
                </View>

                <View style={styles.dateWrapper}>
                    <Text style={styles.publishedAt}>Publicada em:</Text>
                    <Text style={styles.dateAndTime}>{formatTime(newsDetails.created_at)}</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 70 }}>
                    <Text style={styles.newsContent}>{newsDetails.description}</Text>
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
    categoryWrapper: {
        flexDirection: 'row',
        paddingBottom: 4,
    },
    categoryLabel: {
        fontFamily: fonts.textBold,
        marginRight: 4,
        fontSize: 14,
        color: colors.blue_600,
    },
    category: {
        color: colors.blue_900,
        fontFamily: fonts.text,
        fontSize: 14,
    },
    newsContent: {
        fontSize: 16,
    },
});
