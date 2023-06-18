import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Header from '../src/components/Header';
import colors from '../src/styles/colors';
import fonts from '../src/styles/fonts';

export default function CreateNewWarning() {
    const [description, setDescription] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [isDescriptionFilled, setIsDescriptionFilled] = useState(false);
    const [category, setCategory] = useState();

    function getDate() {
        const dateObject = new Date();
        const local = dateObject.toLocaleDateString();

        const day = dateObject.getDate();
        const month = dateObject.getMonth() + 1;
        const year = dateObject.getFullYear();
        const hours = dateObject.getHours();
        const minutes = dateObject.getMinutes();

        const currentDate = `${day}/${month}/${year} ${hours}:${minutes}`;
        return currentDate;
    }

    function handleInputBlur() {
        setIsFocused(false);
        setIsDescriptionFilled(!!description);
    }

    function handleInputFocus() {
        setIsFocused(true);
    }

    function handleInputChange(value: string) {
        setIsDescriptionFilled(!!value);
        setDescription(value);
    }

    return (
        <View style={styles.container}>
            <Header showCloseIcon />

            <View style={styles.formContainer}>
                <Text style={styles.subtitle}>Novo Aviso para a Defesa Civil:</Text>

                <Text>{getDate()}</Text>

                <View style={styles.inputWrapper}>
                    <Text style={styles.label}>Descrição</Text>
                    <TextInput
                        style={[styles.input, isFocused && { borderColor: colors.blue_400 }]}
                        placeholder='Deslizamento na rua beta esquina com malta'
                        onBlur={handleInputBlur}
                        selectionColor={colors.blue_400}
                        onFocus={handleInputFocus}
                        onChangeText={handleInputChange}
                        numberOfLines={4}
                        multiline
                        textAlignVertical='top'
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <Text style={styles.label}>Categoria</Text>
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
                            <Picker.Item label='Java' value='java' />
                            <Picker.Item label='JavaEscrito' value='java2' />
                        </Picker>
                    </View>
                </View>

                <TouchableOpacity activeOpacity={0.5} style={styles.button}>
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
        padding: 8,
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
