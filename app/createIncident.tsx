import Checkbox from 'expo-checkbox';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../src/components/Header';
import InputDark from '../src/components/InputDark';
import MultiPicker from '../src/components/MultiPicker';
import Picker from '../src/components/Picker';
import importedDistricts from '../src/districts.json';
import incidentsCategories from '../src/incidentsCategories.json';
import colors from '../src/styles/colors';
import fonts from '../src/styles/fonts';

export default function CreateIncident() {
    const [category, setCategory] = useState('');
    const [incidentDescription, setIncidentDescription] = useState('');
    const [isIncidentDescriptionFocused, setIsIncidentDescriptionFocused] = useState(false);
    // const [districts, setDistricts] = useState<Array<string>>([]);
    const [district, setDistrict] = useState('');
    const [shouldSendNotification, setShouldSendNotification] = useState(false);

    return (
        <View style={styles.container}>
            <Header showCloseIcon />

            <View style={styles.formContainer}>
                <Text style={styles.subtitle}>Publicar incidente:</Text>

                <ScrollView contentContainerStyle={{ gap: 24, paddingBottom: 140 }}>
                    <MultiPicker itemsToDisplay={importedDistricts.values} label='Bairros' />

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

                    <View style={styles.checkboxContainer}>
                        <Checkbox
                            value={shouldSendNotification}
                            onValueChange={setShouldSendNotification}
                            color={colors.blue_600}
                        />
                        <Text style={styles.checkboxText}>
                            Enviar notificação deste incidente para os bairros selecionados?
                        </Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.8} style={styles.button}>
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
