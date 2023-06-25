import { Pridi_700Bold } from '@expo-google-fonts/pridi';
import { WorkSans_400Regular, WorkSans_700Bold, useFonts } from '@expo-google-fonts/work-sans';
import Checkbox from 'expo-checkbox';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Input from '../../src/components/Input';
import { useAuth } from '../../src/contexts/login-and-notifications-context';
import colors from '../../src/styles/colors';
import fonts from '../../src/styles/fonts';

export default function loginPageLayout() {
    const router = useRouter();
    const { signIn, user } = useAuth();

    const [email, setEmail] = useState('');
    const [isEmailFilled, setIsEmailFilled] = useState(false);
    const [password, setPassword] = useState('');
    const [isPasswordFilled, setIsPasswordFilled] = useState(false);
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

    function onSignupPress() {
        router.push('/signUp');
    }

    function onLoginPress() {
        if (email && password) {
            setIsMainMenuLoading(true);
            signIn({ email, password, bairro: 'BPS' });
            setIsMainMenuLoading(false);
        }
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
                        inputData={password}
                        setInputFunction={setPassword}
                        type='password'
                        setIsInputFilled={setIsPasswordFilled}
                    />

                    <View style={styles.checkboxContainer}>
                        <Checkbox
                            value={isCheckboxMarked}
                            disabled={
                                (!isEmailFilled && !isPasswordFilled) ||
                                (!isEmailFilled && isPasswordFilled) ||
                                (isEmailFilled && !isPasswordFilled)
                            }
                            style={styles.checkbox}
                            onValueChange={setIsCheckboxMarked}
                            color={colors.blue_100}
                        />

                        <Text style={styles.checkboxText}>Lembrar meus dados</Text>
                    </View>

                    {user.error && (
                        <Text
                            style={{ backgroundColor: colors.blue_50, padding: 8, color: colors.red, borderRadius: 8 }}
                        >
                            {user.error}
                        </Text>
                    )}

                    <TouchableOpacity style={styles.button} onPress={onLoginPress} activeOpacity={0.75}>
                        {!isMainMenuLoading && <Text style={styles.buttonText}>Login</Text>}
                        {isMainMenuLoading && (
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <ActivityIndicator size={'small'} color={colors.blue_900} />
                                <Text style={styles.buttonText}>Conectando</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                <View style={{ gap: 8 }}>
                    <Text style={styles.subtitle}>Ainda não possui cadastro?</Text>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            { backgroundColor: 'transparent', borderColor: colors.blue_300, borderWidth: 2 },
                        ]}
                        onPress={onSignupPress}
                        activeOpacity={0.75}
                    >
                        <Text style={[styles.buttonText, { color: colors.blue_300 }]}>Cadastrar</Text>
                    </TouchableOpacity>
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
        justifyContent: 'space-evenly',
    },
    title: {
        fontFamily: fonts.heading,
        fontSize: 56,
        textAlign: 'center',
        color: colors.blue_800,
    },
    card: {
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
