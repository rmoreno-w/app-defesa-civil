import { Pridi_700Bold } from '@expo-google-fonts/pridi';
import { WorkSans_400Regular, WorkSans_700Bold, useFonts } from '@expo-google-fonts/work-sans';
import Checkbox from 'expo-checkbox';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Input from '../src/components/Input';
import colors from '../src/styles/colors';
import fonts from '../src/styles/fonts';

export default function loginPageLayout() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [isEmailFilled, setIsEmailFilled] = useState(false);
    const [senha, setSenha] = useState('');
    const [isSenhaFilled, setIsSenhaFilled] = useState(false);
    const [isCheckboxMarked, setIsCheckboxMarked] = useState(false);
    const [isMainMenuLoading, setIsMainMenuLoading] = useState(false);

    const [fontsLoaded] = useFonts({
        WorkSans_400Regular,
        WorkSans_700Bold,
        Pridi_700Bold,
    });

    if (!fontsLoaded) {
        return null;
    }

    function onButtonPress() {
        setIsMainMenuLoading(true);
        setTimeout(() => {
            if (email.toLowerCase().includes('agent')) {
                setEmail('');
                router.replace('/agentMainMenu');
            } else {
                setEmail('');
                router.replace('/userMainMenu');
            }
        }, 950);
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
                        setIsInputFilled={setIsEmailFilled}
                    />
                    <Input
                        label='Senha'
                        placeholder='***********************'
                        inputData={senha}
                        setInputFunction={setSenha}
                        type='password'
                        setIsInputFilled={setIsSenhaFilled}
                    />
                    <View style={styles.checkboxContainer}>
                        <Checkbox
                            value={isCheckboxMarked}
                            disabled={
                                (!isEmailFilled && !isSenhaFilled) ||
                                (!isEmailFilled && isSenhaFilled) ||
                                (isEmailFilled && !isSenhaFilled)
                            }
                            style={styles.checkbox}
                            onValueChange={setIsCheckboxMarked}
                            color={colors.blue_100}
                        />
                        <Text style={styles.checkboxText}>Lembrar meus dados</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={onButtonPress} activeOpacity={0.75}>
                    {!isMainMenuLoading && <Text style={styles.buttonText}>Login</Text>}
                    {isMainMenuLoading && (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <Text style={styles.buttonText}>Conectando</Text>
                            <ActivityIndicator size={'small'} color={colors.blue_900} />
                        </View>
                    )}
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
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkboxText: {
        color: colors.blue_50,
    },
    checkbox: {
        marginRight: 8,
    },
    form: {
        gap: 16,
    },
});
