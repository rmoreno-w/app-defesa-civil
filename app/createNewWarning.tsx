import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../src/components/Header';
import InputDark from '../src/components/InputDark';
import Picker from '../src/components/PickerDark';
import importedDistricts from '../src/districts.json';
import incidentsCategories from '../src/incidentsCategories.json';
import colors from '../src/styles/colors';
import fonts from '../src/styles/fonts';

export default function CreateNewWarning() {
    const [description, setDescription] = useState('');
    const [isDescriptionFilled, setIsDescriptionFilled] = useState(false);
    const [category, setCategory] = useState('');
    const [district, setDistrict] = useState('');

    const neww = Object.values(importedDistricts);
    const { 0: districtsArray } = neww;
    const values = districtsArray.map((item) => ({ label: item, value: item }));
    const formattedDistricts = { values };

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

    return (
        <View style={styles.container}>
            <Header showCloseIcon />

            <View style={styles.formContainer}>
                <Text style={styles.subtitle}>Novo Aviso para a Defesa Civil:</Text>

                <Text>{getDate()}</Text>

                <Picker
                    chosenItem={district}
                    itemsToDisplay={formattedDistricts}
                    label='Bairros'
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
