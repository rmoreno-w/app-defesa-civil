import Checkbox from 'expo-checkbox';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ActionFeedbackModal from '../src/components/ActionFeedbackModal';
import Header from '../src/components/Header';
import InputDark from '../src/components/InputDark';
import MultiPicker from '../src/components/MultiPicker';
import Picker from '../src/components/PickerDark';
import { useAuth } from '../src/contexts/login-and-notifications-context';
import importedDistricts from '../src/districts.json';
import importedEmergencyServices from '../src/emergencyServices.json';
import incidentsCategories from '../src/incidentsCategories.json';
import incidentsRiskScale from '../src/incidentsRiskScale.json';
import { apiClient } from '../src/services/axios';
import colors from '../src/styles/colors';
import fonts from '../src/styles/fonts';

// const serviceId = {
//     Policia: '2e807154-506d-4ff4-a0e8-e35d655627de',
//     SAMU: '11ca490a-92cf-4d32-81c5-60f9d440348c',
//     Bombeiros: 'f7a8ef71-5afa-4493-bf2a-8a636cd61c78',
//     Cemig: '1d4b30f8-cb1b-4a6a-af0b-c6705d6ffcdb',
// };

export default function CreateIncident() {
    const [category, setCategory] = useState('');
    const [incidentDescription, setIncidentDescription] = useState('');
    const [riskScale, setRiskScale] = useState('');
    const [isIncidentDescriptionFocused, setIsIncidentDescriptionFocused] = useState(false);
    const [districts, setDistricts] = useState<number[]>([]);
    const [shouldSendNotification, setShouldSendNotification] = useState(false);
    // const [emergencyServices, setEmergencyServices] = useState<Array<number>>([]);
    const [emergencyService, setEmergencyService] = useState('');
    const [isErrorOnCreatingIncidentModalOpen, setIsErrorOnCreatingIncidentModalOpen] = useState(false);
    const [isCreatingIncidentSuccesfulModalOpen, setIsCreatingIncidentSuccesfulModalOpen] = useState(false);

    const { user } = useAuth();
    const router = useRouter();

    async function postIncident() {
        category && incidentDescription && districts.length != 0 && riskScale != '';
        try {
            apiClient
                .post(
                    '/incidents',
                    {
                        category,
                        description: incidentDescription,
                        status: 'REGISTERED',
                        district_names: districts.map((item) => importedDistricts.values[item]),
                        risk_scale: Number(riskScale),
                    },
                    { headers: { Authorization: `Bearer ${user.token}` } }
                )
                .then(async (response) => {
                    if (shouldSendNotification) {
                        console.log(response.data);
                        await apiClient.post(
                            'incidents-notification',
                            {
                                emergency_service_name: emergencyService,
                                incident_id: response.data.id,
                            },
                            { headers: { Authorization: `Bearer ${user.token}` } }
                        );
                    }
                    setCategory('');
                    setIncidentDescription('');
                    setRiskScale('');
                    setDistricts([]);
                    setIsCreatingIncidentSuccesfulModalOpen(true);
                    setShouldSendNotification(false);
                });
        } catch (error) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.error);
            setIsErrorOnCreatingIncidentModalOpen(true);
        }
    }

    return (
        <View style={styles.container}>
            <Header showCloseIcon />

            <View style={styles.formContainer}>
                <Text style={styles.subtitle}>Publicar incidente:</Text>

                <ScrollView contentContainerStyle={{ gap: 24, paddingBottom: 140 }}>
                    <MultiPicker
                        itemsToDisplay={importedDistricts.values}
                        label='Bairros'
                        chosenItems={districts}
                        setChosenItems={setDistricts}
                    />

                    <Picker
                        chosenItem={category}
                        itemsToDisplay={incidentsCategories}
                        label='Categoria'
                        setChosenItem={setCategory}
                    />

                    <View style={styles.inputWrapper}>
                        <InputDark
                            inputData={incidentDescription}
                            label='Descrição do incidente'
                            placeholder='Ex: Após chuva intensa, ocorreu deslizamento e as xx ruas do bairro yy estão impedidas, prejudicando o trânsito na região dos bairros zz, ww e vv'
                            setInputFunction={setIncidentDescription}
                            setIsInputFilled={setIsIncidentDescriptionFocused}
                            numberOfLines={4}
                        />
                    </View>

                    <Picker
                        chosenItem={riskScale}
                        itemsToDisplay={incidentsRiskScale}
                        label='Escala de Risco'
                        setChosenItem={setRiskScale}
                    />

                    <TouchableOpacity
                        style={styles.checkboxContainer}
                        onPress={() => setShouldSendNotification(!shouldSendNotification)}
                        activeOpacity={0.9}
                    >
                        <Checkbox value={shouldSendNotification} color={colors.blue_600} />
                        <Text style={styles.checkboxText}>
                            Enviar notificação deste incidente para os bairros selecionados?
                        </Text>
                    </TouchableOpacity>

                    {shouldSendNotification && (
                        <Picker
                            chosenItem={emergencyService}
                            itemsToDisplay={importedEmergencyServices}
                            label='Serviços de Emergência a Notificar'
                            setChosenItem={setEmergencyService}
                        />
                        // <MultiPicker
                        //     chosenItems={emergencyServices}
                        //     itemsToDisplay={importedEmergencyServices.values}
                        //     label='Serviços de Emergência a Notificar'
                        //     setChosenItems={setEmergencyServices}
                        //     //emergencyServices.map((service) => serviceId[importedEmergencyServices.values[service]]).join(', ')
                        // />
                    )}
                    <ActionFeedbackModal
                        feedbackMessage='Ops :( Houve um erro ao tentar criar o incidente. Tente novamente em alguns instantes'
                        isActionSuccessful={false}
                        isModalOpen={isErrorOnCreatingIncidentModalOpen}
                        setIsModalOpen={setIsErrorOnCreatingIncidentModalOpen}
                    />

                    <ActionFeedbackModal
                        feedbackMessage='Incidente criado com sucesso!'
                        isActionSuccessful={true}
                        isModalOpen={isCreatingIncidentSuccesfulModalOpen}
                        setIsModalOpen={setIsCreatingIncidentSuccesfulModalOpen}
                        onDismissFunction={() => router.back()}
                    />
                    <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={postIncident}>
                        <Text style={styles.buttonText}>Criar Incidente</Text>
                    </TouchableOpacity>
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
    },
    subtitle: {
        fontFamily: fonts.textBold,
        fontSize: 20,
        color: colors.blue_900,
        // textAlign: 'center',
        // backgroundColor: 'red',
    },
    formContainer: {
        // backgroundColor: 'lightblue',
        gap: 24,
    },
    inputWrapper: {
        gap: 6,
    },
    label: {
        color: colors.blue_600,
    },
    input: {
        backgroundColor: colors.blue_50,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: colors.blue_600,
        color: colors.blue_900,
        width: '100%',
        fontSize: 16,
        borderRadius: 8,
        alignItems: 'flex-start',
        // backgroundColor: 'red',
    },
    checkboxContainer: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
    },
    checkboxText: {
        flexShrink: 1,
        // width: '90%',
    },
    button: {
        alignContent: 'center',
        justifyContent: 'center',
        height: 56,
        backgroundColor: colors.blue_600,
        borderRadius: 8,
    },
    buttonText: {
        color: colors.blue_50,
        textAlign: 'center',
    },
});
