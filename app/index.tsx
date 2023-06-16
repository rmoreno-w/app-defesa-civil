import { Pridi_700Bold } from '@expo-google-fonts/pridi';
import { WorkSans_400Regular, useFonts } from '@expo-google-fonts/work-sans';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Input from '../src/components/Input';
import colors from '../src/styles/colors';
import fonts from '../src/styles/fonts';

export default function loginPageLayout() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [fontsLoaded] = useFonts({
        WorkSans_400Regular,
        Pridi_700Bold,
    });

    if (!fontsLoaded) {
        return null;
    }

    function onButtonPress() {
        router.replace('/mainMenu');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>SisVil</Text>

            {/* Card */}
            <View style={styles.card}>
                <Text style={styles.subtitle}>Faça login para conferir as atualizações na sua área!</Text>
                <View style={styles.form}>
                    <Input
                        label='Email'
                        placeholder='maria@exemplo.com'
                        inputData={email}
                        setInputFunction={setEmail}
                    />
                    <Input
                        label='Senha'
                        placeholder='***********************'
                        inputData={senha}
                        setInputFunction={setSenha}
                        type='password'
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={onButtonPress}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
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
    title: {
        fontFamily: fonts.heading,
        fontSize: 56,
        textAlign: 'center',
        color: colors.blue_800,
    },
    card: {
        marginTop: 64,
        padding: 24,
        backgroundColor: colors.blue_800,
        borderRadius: 12,
        gap: 32,
    },
    subtitle: {
        fontFamily: fonts.text,
        fontSize: 16,
        color: colors.blue_50,
        textAlign: 'center',
        // backgroundColor: 'red',
    },
    button: {
        alignContent: 'center',
        justifyContent: 'center',
        height: 56,
        backgroundColor: colors.blue_300,
        borderRadius: 8,
    },
    buttonText: {
        textAlign: 'center',
        color: colors.blue_900,
    },
    form: {
        gap: 12,
    },
});
