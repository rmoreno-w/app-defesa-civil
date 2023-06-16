import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../styles/colors';

export default function NewsCard() {
    return (
        <View style={styles.newsContainer}>
            <View style={styles.subtitleContainer}>
                <Text style={styles.subtitle} ellipsizeMode='tail' numberOfLines={7}>
                    Texto da Notícia meio grandinho bó encher Texto da Notícia meio grandinho bó encher Texto da Notícia
                    meio grandinho bó encher Texto da Notícia meio grandinho bó encher Texto da Notícia meio grandinho
                    text text bó encher
                </Text>
            </View>
            <View style={styles.iconContainer}>
                <Feather name='cloud-lightning' size={64} color={colors.blue_600} />
            </View>
        </View>
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
    subtitleContainer: {
        padding: 8,
        width: '60%',
        justifyContent: 'center',
    },
    subtitle: {
        textAlign: 'justify',
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
        // backgroundColor: 'red',
    },
});
