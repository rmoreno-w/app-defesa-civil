import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../src/components/Header';
import InputDark from '../src/components/InputDark';
import districts from '../src/districts.json';
import colors from '../src/styles/colors';
import fonts from '../src/styles/fonts';

export default function CreateNewWarning() {
    const [description, setDescription] = useState('');
    const [isDescriptionFilled, setIsDescriptionFilled] = useState(false);
    const [category, setCategory] = useState();
    const [district, setDistrict] = useState();

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

                <View style={styles.inputWrapper}>
                    <Text style={styles.label}>Bairro:</Text>
                    <View style={styles.input}>
                        <Picker
                            selectedValue={district}
                            onValueChange={(districtValue, districtIndex) => setDistrict(districtValue)}
                            dropdownIconColor={colors.blue_600}
                            style={{
                                width: '100%',
                            }}
                        >
                            <Picker.Item label='' value='' enabled={false} />
                            {districts.bairros.map((currentDistrict, index) => (
                                <Picker.Item
                                    key={index}
                                    label={currentDistrict.name}
                                    value={currentDistrict.name.toUpperCase().replaceAll('Á', 'A').replaceAll(' ', '_')}
                                />
                            ))}
                        </Picker>
                    </View>
                </View>

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
                            <Picker.Item label='Chuva Intensa' value='FLOOD' />
                            <Picker.Item label='Deslizamento de Terra' value='LANDSLIDE' />
                            <Picker.Item label='Fogo / Incêndio' value='FIRE' />
                            <Picker.Item label='Vento Intenso' value='INTENSE_WIND' />
                            <Picker.Item label='Outros' value='OTHERS' />
                        </Picker>
                    </View>
                </View>

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
