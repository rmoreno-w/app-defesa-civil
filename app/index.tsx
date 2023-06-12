import { Pridi_700Bold } from '@expo-google-fonts/pridi';
import { WorkSans_400Regular, useFonts } from '@expo-google-fonts/work-sans';
import { StyleSheet, Text, View } from 'react-native';
import fonts from '../src/styles/fonts';

export default function Page() {
    let [fontsLoaded] = useFonts({
        WorkSans_400Regular,
        Pridi_700Bold,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <Text style={styles.title}>Hello World</Text>
                <Text style={styles.subtitle}>This is the first page of your app.</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 24,
    },
    main: {
        flex: 1,
        justifyContent: 'center',
        maxWidth: 960,
        marginHorizontal: 'auto',
    },
    title: {
        fontFamily: fonts.heading,
        fontSize: 64,
        color: '#2B2C3C',
    },
    subtitle: {
        fontFamily: fonts.text,
        fontSize: 36,
        color: '#38434D',
    },
});
