import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { formatTime } from '../services/formatTime';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface NewsProps {
    category: string;
    created_at: string;
    description: string;
    title: string;
    id: string;
}
export default function NewsCard({ category, created_at, description, id, title }: NewsProps) {
    const router = useRouter();

    function navigateOnPress() {
        router.push(`/newsDetails?id=${id}`);
    }

    return (
        <TouchableOpacity style={styles.newsContainer} activeOpacity={0.5} onPress={navigateOnPress}>
            <View style={styles.newsContentContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.dateAndTime}>{formatTime(created_at)}</Text>
                <Text style={styles.content} ellipsizeMode='tail' numberOfLines={4}>
                    {description}
                </Text>
            </View>
            <View style={styles.iconContainer}>
                {category == 'EDUCATIONAL' && <Feather name='book-open' size={64} color={colors.green} />}
                {category == 'WARNING' && <Feather name='alert-triangle' size={64} color={colors.red} />}
                {category == 'METEOROLOGY' && <Feather name='cloud-lightning' size={64} color={colors.blue_400} />}
                {category == 'OTHERS' && <Feather name='tool' size={64} color={colors.blue_600} />}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    newsContainer: {
        height: 160,
        borderRadius: 12,
        // backgroundColor: 'red',
        borderWidth: 3,
        borderColor: colors.blue_600,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    newsContentContainer: {
        padding: 12,
        width: '70%',
        justifyContent: 'space-between',
        borderRightWidth: 1,
        borderRightColor: colors.blue_600,
    },
    title: {
        fontFamily: fonts.textBold,
        fontSize: 16,
        color: colors.blue_600,
        // backgroundColor: 'red',
        textAlignVertical: 'center',
        // backgroundColor: 'red',
    },
    dateAndTime: {
        fontSize: 10,
    },
    content: {
        textAlign: 'justify',
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '30%',
    },
});
