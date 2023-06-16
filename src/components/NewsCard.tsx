import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export default function NewsCard() {
    return (
        <View style={styles.newsContainer}>
            <View style={styles.newsContentContainer}>
                <Text style={styles.title}>Titulo Notícia</Text>
                <Text style={styles.dateAndTime}>24/07/2023 - 14:53</Text>
                <Text style={styles.content} ellipsizeMode='tail' numberOfLines={4}>
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
    newsContentContainer: {
        padding: 12,
        width: '75%',
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
        width: '25%',
    },
});
