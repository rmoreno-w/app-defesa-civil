import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../src/components/Header';
import InputDark from '../src/components/InputDark';
import MultiPicker from '../src/components/MultiPicker';
import importedDistricts from '../src/districts.json';
import colors from '../src/styles/colors';
import fonts from '../src/styles/fonts';

export default function CreateIncident() {
    const [category, setCategory] = useState();
    const [incidentTitle, setIncidentTitle] = useState('');
    const [isIncidentTitleFocused, setIsIncidentTitleFocused] = useState(false);
    const [incidentDescription, setIncidentDescription] = useState('');
    const [isIncidentDescriptionFocused, setIsIncidentDescriptionFocused] = useState(false);
    // const [districts, setDistricts] = useState<Array<string>>([]);
    const [district, setDistrict] = useState('');

    return (
        <View style={styles.container}>
            <Header />

            <View style={styles.formContainer}>
                <Text style={styles.subtitle}>Publicar incidente:</Text>

                <MultiPicker itemsToDisplay={importedDistricts.values} label='Bairros' />
                {/* <View style={styles.inputWrapper}>
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
                            <Picker.Item label='Temperaturas Altas' value='HIGH_TEMPERATURES' />
                            <Picker.Item label='Outros' value='OTHERS' />
                        </Picker>
                    </View>
                </View> */}

                <View style={styles.inputWrapper}>
                    <InputDark
                        inputData={incidentTitle}
                        label='Título do Incidente'
                        placeholder='Ex: Deslizamento e trânsito impedido'
                        setInputFunction={setIncidentTitle}
                        setIsInputFilled={setIsIncidentTitleFocused}
                    />
                </View>

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
