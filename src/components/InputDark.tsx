import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import colors from '../styles/colors';

interface inputProps {
    label: string;
    placeholder: string;
    inputData: string;
    setInputFunction: React.Dispatch<React.SetStateAction<string>>;
    setIsInputFilled: React.Dispatch<React.SetStateAction<boolean>>;
    type?: 'password' | 'text';
    numberOfLines?: number;
}

export default function InputDark({
    inputData,
    setInputFunction,
    label,
    placeholder,
    type,
    setIsInputFilled,
    numberOfLines = 1,
}: inputProps) {
    const [isFocused, setIsFocused] = useState(false);

    function handleInputBlur() {
        setIsFocused(false);
        setIsInputFilled(!!inputData);
    }

    function handleInputFocus() {
        setIsFocused(true);
    }

    function handleInputChange(value: string) {
        setIsInputFilled(!!value);
        setInputFunction(value);
    }

    return (
        <View style={styles.inputWrapper}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[styles.input, isFocused && { borderColor: colors.blue_400 }]}
                placeholder={placeholder}
                onBlur={handleInputBlur}
                selectionColor={colors.blue_400}
                onFocus={handleInputFocus}
                onChangeText={handleInputChange}
                secureTextEntry={type == 'password'}
                numberOfLines={numberOfLines}
                textAlignVertical={numberOfLines != 1 ? 'top' : 'center'}
                multiline={numberOfLines != 1 && true}
            />
        </View>
    );
}

const styles = StyleSheet.create({
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
        padding: 16,
        borderRadius: 8,
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        // backgroundColor: 'red',
    },
    label: {
        color: colors.blue_600,
    },
});
