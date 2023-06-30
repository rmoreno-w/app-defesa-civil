import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../styles/colors';

type OptionItem = {
    label: string;
    value: string | number;
};

type SelectItems = {
    values: OptionItem[];
};

interface PickerProps {
    label: string;
    itemsToDisplay: SelectItems;
    chosenItem: OptionItem;
    setChosenItem: React.Dispatch<React.SetStateAction<OptionItem>>;
}

export default function Picker({ label, itemsToDisplay, chosenItem, setChosenItem }: PickerProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    function chooseItem(chosenItem: OptionItem) {
        setChosenItem(chosenItem);
        setIsModalOpen(false);
    }

    useEffect(() => {
        // console.log(chosenItem);
        // console.log(itemsToDisplay);
    }, []);

    return (
        <View style={styles.inputWrapper}>
            <Text style={styles.label}>{label}</Text>

            <TouchableOpacity activeOpacity={0.7} style={styles.input} onPress={() => setIsModalOpen(!isModalOpen)}>
                <Modal
                    animationType='slide'
                    transparent
                    visible={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                >
                    <View style={styles.modalBackground}>
                        <ScrollView style={styles.modalWrapper}>
                            {itemsToDisplay.values.map((item, index) => (
                                <TouchableOpacity
                                    key={`${item.value}_${index}}`}
                                    style={styles.modalLine}
                                    activeOpacity={0.5}
                                    onPress={() => chooseItem(item)}
                                >
                                    <Text>{item.label}</Text>
                                    {item.value == chosenItem.value && (
                                        <Feather name='check' size={18} color={colors.green} />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </Modal>
                <Text style={styles.inputText}>{chosenItem.label ? chosenItem.label : ''}</Text>
                <Feather name='chevron-down' size={18} color={colors.blue_600} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    inputWrapper: {
        gap: 6,
    },
    label: {
        color: colors.blue_600,
    },
    input: {
        padding: 16,
        backgroundColor: colors.blue_50,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: colors.blue_600,
        color: colors.blue_900,
        width: '100%',
        fontSize: 16,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputText: {
        flexShrink: 1,
    },
    inputIcon: {},
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalWrapper: {
        marginVertical: 32,
        paddingVertical: 0,
        paddingHorizontal: 16,
        backgroundColor: colors.blue_50,
        minWidth: '60%',
        gap: 16,
        flexGrow: 0,
    },
    modalLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: colors.blue_300,
        height: 44,
    },
});
