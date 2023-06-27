import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import colors from '../styles/colors';

interface MultiPickerProps {
    label: string;
    itemsToDisplay: Array<string>;
    chosenItems: Array<number>;
    setChosenItems: React.Dispatch<React.SetStateAction<number[]>>;
}
export default function MultiPicker({ label, itemsToDisplay, chosenItems, setChosenItems }: MultiPickerProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [displayItems, setDisplayItems] = useState<Array<string>>([...itemsToDisplay]);
    const [searchTerm, setSearchTerm] = useState('');

    function toggleItemSelection(chosenItemIndex: number) {
        const indexOnSelectedArray = chosenItems.findIndex((currentItemIndex) => currentItemIndex == chosenItemIndex);

        let arrayToUpdate;
        if (indexOnSelectedArray == -1) {
            arrayToUpdate = [...chosenItems, chosenItemIndex];
        } else {
            // Splice retorna os items REMOVIDOS. Pra ter um array sem os removidos, precisa duma copia dele e dar splice nela
            arrayToUpdate = [...chosenItems];
            arrayToUpdate.splice(indexOnSelectedArray, 1);
        }
        setChosenItems(arrayToUpdate);
    }

    useEffect(() => {
        let searchTermLowerCase = searchTerm.toLowerCase();
        let arrayThatIncludesTerm;

        if (searchTerm == '') {
            arrayThatIncludesTerm = [...itemsToDisplay];
        } else {
            arrayThatIncludesTerm = itemsToDisplay.filter((item) => item.toLowerCase().includes(searchTermLowerCase));
        }
        setDisplayItems(arrayThatIncludesTerm);
    }, [searchTerm]);

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
                        <ScrollView
                            style={styles.modalWrapper}
                            contentContainerStyle={{ paddingTop: 16, paddingBottom: 24, gap: 16 }}
                        >
                            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setIsModalOpen(false)}>
                                <Text>Concluir</Text>
                            </TouchableOpacity>

                            <View style={styles.modalHeader}>
                                <Text>Selecione um ou mais {label.toLowerCase()}:</Text>
                                <TextInput
                                    style={styles.modalSearch}
                                    placeholder={`Buscar por um ${label.slice(0, -1)}`}
                                    onChangeText={(text) => setSearchTerm(text)}
                                ></TextInput>
                            </View>

                            <View>
                                {displayItems.map((item, index) => (
                                    <TouchableOpacity
                                        style={[
                                            styles.modalLine,
                                            chosenItems.includes(index) && {
                                                borderBottomColor: colors.blue_600,
                                                borderBottomWidth: 2,
                                            },
                                        ]}
                                        activeOpacity={0.5}
                                        onPress={() => toggleItemSelection(index)}
                                        key={item}
                                    >
                                        <Text>{item}</Text>
                                        {chosenItems.includes(index) && (
                                            <Feather name='check' size={18} color={colors.green} />
                                        )}
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                </Modal>
                <Text style={styles.inputText}>
                    {chosenItems.length > 0
                        ? chosenItems.map((currentItem) => itemsToDisplay[currentItem]).join(', ')
                        : ''}
                </Text>
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
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalWrapper: {
        // paddingVertical: 16,
        marginVertical: 32,
        paddingHorizontal: 16,
        backgroundColor: colors.blue_50,
        minWidth: '80%',
        gap: 16,
    },
    modalHeader: {
        // backgroundColor: 'lightblue',
        gap: 4,
    },
    modalCloseButton: {
        gap: 4,
        borderRadius: 12,
        padding: 8,
        maxWidth: '35%',
        alignItems: 'center',
        alignSelf: 'flex-end',
        borderWidth: 1,
        borderColor: colors.blue_600,
    },
    modalSearch: {
        // backgroundColor: 'red',
        padding: 8,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: colors.blue_300,
    },
    modalLine: {
        // backgroundColor: colors.blue_600,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: colors.blue_300,
        height: 44,
    },
});
