import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ActionFeedbackModal from '../src/components/ActionFeedbackModal';
import Header from '../src/components/Header';
import InputDark from '../src/components/InputDark';
import Picker from '../src/components/PickerDark';
import { useAuth } from '../src/contexts/login-and-notifications-context';
import importedDistricts from '../src/districts.json';
import incidentsCategories from '../src/incidentsCategories.json';
import { apiClient } from '../src/services/axios';
import colors from '../src/styles/colors';
import fonts from '../src/styles/fonts';

type Category = {
    label: string;
    value: string;
};

type District = {
    label: string;
    value: string;
};

export default function CreateNewWarning() {
    const { user } = useAuth();
    const router = useRouter();

    const [description, setDescription] = useState('');
    const [isDescriptionFilled, setIsDescriptionFilled] = useState(false);
    const [category, setCategory] = useState<Category>({ label: '', value: '' });
    const [district, setDistrict] = useState<District>({ label: '', value: '' });

    const [isErrorOnCreatingIncidentModalOpen, setIsErrorOnCreatingIncidentModalOpen] = useState(false);
    const [isCreatingIncidentSuccesfulModalOpen, setIsCreatingIncidentSuccesfulModalOpen] = useState(false);

    const neww = Object.values(importedDistricts);
    const { 0: districtsArray } = neww;
    const values = districtsArray.map((item) => ({ label: item, value: item }));
    const formattedDistricts = { values };

    async function postIncident() {
        // console.log({
        //     category: category.value,
        //     description,
        //     status: 'PENDING',
        //     district_names: [district],
        //     risk_scale: 0,
        // });
        category &&
            description &&
            district &&
            category.value &&
            apiClient
                .post(
                    '/incidents',
                    {
                        category: category.value,
                        description,
                        status: 'PENDING',
                        district_names: [district.value],
                        risk_scale: 0,
                    },
                    { headers: { Authorization: `Bearer ${user.token}` } }
                )
                .then((response) => {
                    // console.log(response.data);
                    setCategory({ label: '', value: '' });
                    setDescription('');
                    setDistrict({ label: '', value: '' });
                    setIsCreatingIncidentSuccesfulModalOpen(true);
                })
                .catch((error) => {
                    console.log(error);
                    setIsErrorOnCreatingIncidentModalOpen(true);
                });
    }
    return (
        <View style={styles.container}>
            <Header showCloseIcon />

            <View style={styles.formContainer}>
                <Text style={styles.subtitle}>Novo Aviso para a Defesa Civil:</Text>

                <Picker
                    chosenItem={district}
                    itemsToDisplay={formattedDistricts}
                    label='Bairro'
                    setChosenItem={setDistrict}
                />

                <Picker
                    chosenItem={category}
                    itemsToDisplay={incidentsCategories}
                    label='Categorias'
                    setChosenItem={setCategory}
                />

                <View style={styles.inputWrapper}>
                    <InputDark
                        inputData={description}
                        label='Descrição:'
                        placeholder='Ex: Deslizamento na rua beta esquina com malta'
                        setInputFunction={setDescription}
                        setIsInputFilled={setIsDescriptionFilled}
                        numberOfLines={4}
                    />
                </View>

                <ActionFeedbackModal
                    feedbackMessage='Ops :( Houve um erro ao tentar criar o aviso. Tente novamente em alguns instantes'
                    isActionSuccessful={false}
                    isModalOpen={isErrorOnCreatingIncidentModalOpen}
                    setIsModalOpen={setIsErrorOnCreatingIncidentModalOpen}
                />

                <ActionFeedbackModal
                    feedbackMessage='Aviso criado com sucesso!'
                    isActionSuccessful={true}
                    isModalOpen={isCreatingIncidentSuccesfulModalOpen}
                    setIsModalOpen={setIsCreatingIncidentSuccesfulModalOpen}
                    onDismissFunction={() => router.back()}
                />
                <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={postIncident}>
                    <Text style={styles.buttonText}>Enviar</Text>
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
    label: {
        color: colors.blue_600,
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
