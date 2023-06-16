import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import colors from '../styles/colors';

interface inputProps {
    label: string;
    placeholder: string;
    inputData: string;
    setInputFunction: React.Dispatch<React.SetStateAction<string>>;
    setIsInputFilled: React.Dispatch<React.SetStateAction<boolean>>;
    type?: 'password' | 'text';
}

export default function Input({ inputData, setInputFunction, label, placeholder, type, setIsInputFilled }: inputProps) {
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
        <>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[styles.input, isFocused && { borderColor: colors.blue_400 }]}
                placeholder={placeholder}
                onBlur={handleInputBlur}
                selectionColor={colors.blue_400}
                onFocus={handleInputFocus}
                onChangeText={handleInputChange}
                secureTextEntry={type == 'password'}
            />
        </>
    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: colors.blue_50,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: colors.blue_300,
        color: colors.blue_900,
        width: '100%',
        fontSize: 16,
        padding: 8,
        borderRadius: 8,
    },
    label: {
        color: colors.blue_50,
    },
});
