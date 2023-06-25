import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ActionFeedbackModal from '../../src/components/ActionFeedbackModal';
import Input from '../../src/components/Input';
import colors from '../../src/styles/colors';
import fonts from '../../src/styles/fonts';

export default function SignUp() {
    const router = useRouter();

    const [isSignupLoading, setIsSignupLoading] = useState(true);
    const [completeName, setCompleteName] = useState('');
    const [isCompleteNameFilled, setIsCompleteNameFilled] = useState(false);
    const [email, setEmail] = useState('');
    const [isEmailFilled, setIsEmailFilled] = useState(false);
    const [password, setPassword] = useState('');
    const [isPasswordFilled, setIsPasswordFilled] = useState(false);
    const [phone, setPhone] = useState('');
    const [isPhoneFilled, setIsPhoneFilled] = useState(false);
    const [adress, setAdress] = useState('');
    const [isAdressFilled, setIsAdressFilled] = useState(false);
    const [houseNumber, setHouseNumber] = useState('');
    const [isHouseNumberFilled, setIsHouseNumberFilled] = useState(false);
    const [district, setDistrict] = useState('');
    const [isDistrictFilled, setIsDistrictFilled] = useState(false);
    const [cep, setCep] = useState('');
    const [isCepFilled, setIsCepFilled] = useState(false);
    const [isSignupSuccessful, setIsSignupSuccessful] = useState(false);

    function onSignupPress() {
        // if (completeName && email && password && phone && adress && houseNumber && district && cep) {
        setIsSignupLoading(true);
        // }
    }

    function dismissModal() {
        setIsSignupLoading(false);
        router.replace('/signIn');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>SisVil</Text>

            <View style={styles.card}>
                <ScrollView contentContainerStyle={{ gap: 32, padding: 24 }}>
                    <Text style={styles.subtitle}>Informe seus dados para o cadastro</Text>

                    <Input
                        label='Nome completo'
                        inputData={completeName}
                        placeholder=''
                        setInputFunction={setCompleteName}
                        setIsInputFilled={setIsCompleteNameFilled}
                    />

                    <Input
                        label='E-mail'
                        inputData={email}
                        placeholder='exemplo@ex.com'
                        setInputFunction={setEmail}
                        setIsInputFilled={setIsEmailFilled}
                    />

                    <Input
                        label='Senha'
                        inputData={password}
                        type='password'
                        placeholder='*****************'
                        setInputFunction={setPassword}
                        setIsInputFilled={setIsPasswordFilled}
                    />

                    <Input
                        label='Telefone'
                        inputData={phone}
                        placeholder='(35) XXXXX-XXXX'
                        setInputFunction={setPhone}
                        setIsInputFilled={setIsPhoneFilled}
                    />

                    <Input
                        label='CEP'
                        inputData={cep}
                        placeholder='__.___-___'
                        setInputFunction={setCep}
                        setIsInputFilled={setIsCepFilled}
                    />

                    <Input
                        label='Rua'
                        inputData={adress}
                        placeholder=''
                        setInputFunction={setAdress}
                        setIsInputFilled={setIsAdressFilled}
                    />

                    <Input
                        label='Bairro'
                        inputData={district}
                        placeholder=''
                        setInputFunction={setDistrict}
                        setIsInputFilled={setIsDistrictFilled}
                    />

                    <Input
                        label='Número da Casa'
                        inputData={houseNumber}
                        placeholder=''
                        setInputFunction={setHouseNumber}
                        setIsInputFilled={setIsHouseNumberFilled}
                    />

                    <TouchableOpacity style={styles.button} onPress={onSignupPress} activeOpacity={0.75}>
                        {!isSignupLoading && <Text style={styles.buttonText}>Cadastrar</Text>}
                        {isSignupLoading && (
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <Text style={styles.buttonText}>Enviando</Text>
                                <ActivityIndicator size={'small'} color={colors.blue_900} />
                            </View>
                        )}
                    </TouchableOpacity>

                    {isSignupLoading && isSignupSuccessful && (
                        <ActionFeedbackModal
                            feedbackMessage='Cadastro realizado com sucesso'
                            isActionSuccessful={true}
                            isModalOpen={isSignupSuccessful}
                            setIsModalOpen={setIsSignupSuccessful}
                        />
                    )}
                    {isSignupLoading && !isSignupSuccessful && (
                        <ActionFeedbackModal
                            feedbackMessage='Erro ao Cadastrar, tente novamente'
                            isActionSuccessful={false}
                            isModalOpen={isSignupSuccessful}
                            setIsModalOpen={setIsSignupSuccessful}
                        />
                    )}
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
        // justifyContent: 'space-evenly',
    },
    title: {
        fontFamily: fonts.heading,
        fontSize: 56,
        textAlign: 'center',
        color: colors.blue_800,
    },
    card: {
        backgroundColor: colors.blue_800,
        borderRadius: 12,
        flex: 1,
    },
    subtitle: {
        fontFamily: fonts.text,
        fontSize: 16,
        color: colors.blue_50,
        // textAlign: 'center',
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
    modalBg: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.75)',
    },
    modalWrapper: {
        // paddingVertical: 16,
        marginVertical: 32,
        padding: 16,
        backgroundColor: colors.blue_50,
        minWidth: '80%',
        gap: 16,
    },
});
