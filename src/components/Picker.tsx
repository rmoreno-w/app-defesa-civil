import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../styles/colors';

interface PickerProps {
    label: string;
    itemsToDisplay: Array<string>;
    chosenItem: string;
    setChosenItem: React.Dispatch<React.SetStateAction<string>>;
}
export default function Picker({ label, itemsToDisplay, chosenItem, setChosenItem }: PickerProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [displayItems, setDisplayItems] = useState<Array<string>>([...itemsToDisplay]);

    function chooseItem(itemIndex: number) {
        setChosenItem(displayItems[itemIndex]);
        setIsModalOpen(false);
    }

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
                        <View style={styles.modalWrapper}>
                            {displayItems.map((item, index) => (
                                <TouchableOpacity
                                    key={item}
                                    style={styles.modalLine}
                                    activeOpacity={0.5}
                                    onPress={() => chooseItem(index)}
                                >
                                    <Text>{item}</Text>
                                    {item == chosenItem && <Feather name='check' size={18} color={colors.green} />}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </Modal>
                <Text style={styles.inputText}>{chosenItem}</Text>
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
        paddingVertical: 32,
        paddingHorizontal: 16,
        backgroundColor: colors.blue_50,
        minWidth: '60%',
        gap: 16,
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
