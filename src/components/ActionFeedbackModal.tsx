import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../styles/colors';

interface ActionFeedbackModalProps {
    isActionSuccessful: boolean;
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    feedbackMessage: string;
}
export default function ActionFeedbackModal({
    isActionSuccessful,
    isModalOpen,
    setIsModalOpen,
    feedbackMessage,
}: ActionFeedbackModalProps) {
    return (
        <Modal transparent animationType='fade' visible={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
            <View style={styles.modalBackground}>
                <View style={styles.modalWrapper}>
                    {isActionSuccessful && (
                        <View style={styles.cardSpacing}>
                            <View style={[styles.iconBackground, { backgroundColor: colors.green }]}>
                                <MaterialCommunityIcons name='check-bold' size={32} color={colors.blue_50} />
                            </View>
                            <Text>{feedbackMessage}!</Text>
                        </View>
                    )}

                    {!isActionSuccessful && (
                        <View style={styles.cardSpacing}>
                            <View style={[styles.iconBackground, { backgroundColor: colors.red }]}>
                                <MaterialCommunityIcons name='close' size={32} color={colors.blue_50} />
                            </View>
                            <Text>{feedbackMessage}</Text>
                        </View>
                    )}

                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => setIsModalOpen(false)}
                        activeOpacity={0.75}
                    >
                        <Text style={{ textAlign: 'center' }}>Ok</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalWrapper: {
        marginVertical: 32,
        paddingVertical: 32,
        paddingHorizontal: 16,
        backgroundColor: colors.blue_50,
        minWidth: '60%',
        gap: 16,
        flexGrow: 0,
        borderRadius: 12,
    },
    cardSpacing: {
        alignItems: 'center',
        gap: 16,
    },
    iconBackground: {
        height: 36,
        width: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionButton: { backgroundColor: colors.blue_100, padding: 16, borderRadius: 8 },
});
