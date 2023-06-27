import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ActionFeedbackModal from '../src/components/ActionFeedbackModal';
import Header from '../src/components/Header';
import InputDark from '../src/components/InputDark';
import Picker from '../src/components/PickerDark';
import { useAuth } from '../src/contexts/login-and-notifications-context';
import Categories from '../src/newsCategories.json';
import { apiClient } from '../src/services/axios';
import colors from '../src/styles/colors';
import fonts from '../src/styles/fonts';

export default function CreateNews() {
    const router = useRouter();

    const [category, setCategory] = useState('');
    const [newsTitle, setNewsTitle] = useState('');
    const [isNewsTitleFocused, setIsNewsTitleFocused] = useState(false);
    const [newsDescription, setNewsDescription] = useState('');
    const [isNewsDescriptionFocused, setIsNewsDescriptionFocused] = useState(false);
    const [isErrorOnCreatingNewsModalOpen, setIsErrorOnCreatingNewsModalOpen] = useState(false);
    const [isCreatingNewsSuccesfulModalOpen, setIsCreatingNewsSuccesfulModalOpen] = useState(false);

    const { user } = useAuth();

    async function postNews() {
        apiClient
            .post(
                '/notices',
                {
                    category,
                    title: newsTitle,
                    description: newsDescription,
                },
                { headers: { Authorization: `Bearer ${user.token}` } }
            )
            .then((response) => {
                //console.log(response.data);
                setIsCreatingNewsSuccesfulModalOpen(true);
                setCategory('');
                setNewsDescription('');
                setNewsTitle('');
            })
            .catch((error) => {
                console.log(error);
                setIsErrorOnCreatingNewsModalOpen(true);
            });
    }

    return (
        <View style={styles.container}>
            <Header showCloseIcon />

            <View style={styles.formContainer}>
                <Text style={styles.subtitle}>Publicar notícia:</Text>

                <Picker
                    chosenItem={category}
                    setChosenItem={setCategory}
                    itemsToDisplay={Categories}
                    label='Categoria'
                />

                <View style={styles.inputWrapper}>
                    <InputDark
                        inputData={newsTitle}
                        label='Título da Notícia'
                        placeholder='Ex: Frente fria no fim de semana'
                        setInputFunction={setNewsTitle}
                        setIsInputFilled={setIsNewsTitleFocused}
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <InputDark
                        inputData={newsDescription}
                        label='Descrição da Notícia'
                        placeholder='Ex: Previsão de chuva intensa e gra...'
                        setInputFunction={setNewsDescription}
                        setIsInputFilled={setIsNewsDescriptionFocused}
                        numberOfLines={4}
                    />
                </View>

                <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={postNews}>
                    <Text style={styles.buttonText}>Enviar</Text>
                </TouchableOpacity>

                <ActionFeedbackModal
                    feedbackMessage='Ops :( Houve um erro ao tentar criar a notícia. Tente novamente em alguns instantes'
                    isActionSuccessful={false}
                    isModalOpen={isErrorOnCreatingNewsModalOpen}
                    setIsModalOpen={setIsErrorOnCreatingNewsModalOpen}
                />

                <ActionFeedbackModal
                    feedbackMessage='Notícia criada com sucesso!'
                    isActionSuccessful={true}
                    isModalOpen={isCreatingNewsSuccesfulModalOpen}
                    setIsModalOpen={setIsCreatingNewsSuccesfulModalOpen}
                    onDismissFunction={() => router.back()}
                />
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
