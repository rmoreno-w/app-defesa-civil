import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../src/components/Header';
import InputDark from '../src/components/InputDark';
import colors from '../src/styles/colors';
import fonts from '../src/styles/fonts';

export default function CreateNews() {
    const [category, setCategory] = useState();
    const [newsTitle, setNewsTitle] = useState('');
    const [isNewsTitleFocused, setIsNewsTitleFocused] = useState(false);
    const [newsDescription, setNewsDescription] = useState('');
    const [isNewsDescriptionFocused, setIsNewsDescriptionFocused] = useState(false);

    return (
        <View style={styles.container}>
            <Header />

            <View style={styles.formContainer}>
                <Text style={styles.subtitle}>Publicar notícia:</Text>

                <View style={styles.inputWrapper}>
                    <Text style={styles.label}>Categoria:</Text>
                    <View style={styles.input}>
                        <Picker
                            selectedValue={category}
                            onValueChange={(categoryValue, categoryIndex) => setCategory(categoryValue)}
                            dropdownIconColor={colors.blue_600}
                            style={{
                                width: '100%',
                            }}
                        >
                            <Picker.Item label='' value='' enabled={false} />
                            <Picker.Item label='Educacional' value='EDUCATIONAL' />
                            <Picker.Item label='Aviso' value='WARNING' />
                            <Picker.Item label='Meteorologia' value='METEOROLOGY' />
                            <Picker.Item label='Outro' value='OTHERS' />
                        </Picker>
                    </View>
                </View>

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

                <TouchableOpacity activeOpacity={0.8} style={styles.button}>
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
