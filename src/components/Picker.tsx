import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import colors from '../styles/colors';

type DisplayItem = {
    label: string;
    value: string;
};

type DisplayItemsType = {
    values: DisplayItem[];
};

interface PickerProps {
    label: string;
    itemsToDisplay: DisplayItemsType;
    chosenItem: string;
    setChosenItem: React.Dispatch<React.SetStateAction<string>>;
}

export default function Picker({ label, itemsToDisplay, chosenItem, setChosenItem }: PickerProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [localChosenItem, setLocalChosenItem] = useState<DisplayItem>();

    function chooseItem(chosenItem: DisplayItem) {
        setLocalChosenItem(chosenItem);
        setChosenItem(chosenItem.value);
        setIsModalOpen(false);
    }

    console.log(itemsToDisplay);
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
                                    key={`${item.value + index}`}
                                    style={styles.modalLine}
                                    activeOpacity={0.5}
                                    onPress={() => chooseItem(item)}
                                >
                                    <Text>{item.label}</Text>
                                    {item.value == chosenItem && (
                                        <Feather name='check' size={18} color={colors.green} />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </Modal>
                <Text style={styles.inputText}>{localChosenItem ? localChosenItem.label : ''}</Text>
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
