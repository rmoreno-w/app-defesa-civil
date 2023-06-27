import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../contexts/login-and-notifications-context';
import { apiClient } from '../services/axios';
import { formatPhoneNumber } from '../services/formatPhone';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import InputDark from './InputDark';

interface ModalProps {
    isModalVisible: boolean;
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function UserInfoCard({ isModalVisible, setIsModalVisible }: ModalProps) {
    const { user, signOut } = useAuth();

    // console.log(user.)

    const [completeName, setCompleteName] = useState('Adelindo Silva');
    const [isCompleteNameFilled, setIsCompleteNameFilled] = useState(false);
    const [email, setEmail] = useState('adelindo@email.com');
    const [isEmailFilled, setIsEmailFilled] = useState(false);
    const [phone, setPhone] = useState('');
    const [isPhoneFilled, setIsPhoneFilled] = useState(false);
    const [district, setDistrict] = useState('');
    const [isDistrictFilled, setIsDistrictFilled] = useState(false);

    useEffect(() => {
        async function loadUserData() {
            apiClient
                .get('/users/me', {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                })
                .then((userData) => {
                    setCompleteName(userData.data.name);
                    setEmail(userData.data.email);
                    setDistrict(user.district);
                    setPhone(formatPhoneNumber(userData.data.telephone));
                })
                .catch((e) => console.log(e));
        }
        loadUserData();
    }, []);

    function modalDismiss() {
        setIsModalVisible(false);
    }

    function signOut1() {
        signOut();
    }

    return (
        <Modal transparent animationType='fade' visible={isModalVisible} onRequestClose={modalDismiss}>
            <View style={styles.modalBackground}>
                <View style={styles.modalWrapper}>
                    <View style={styles.modalHeader}>
                        <View style={styles.userPortrait}>
                            <Ionicons name='person-circle-outline' color={colors.blue_600} size={40} />
                            <Text style={styles.userName}>{completeName}</Text>
                        </View>

                        <TouchableOpacity activeOpacity={0.5} onPress={signOut1} style={styles.logoutButton}>
                            <Text style={styles.logoutButtonText}>Logout</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputsContainer}>
                        <InputDark
                            inputData={email}
                            label='E-mail'
                            placeholder=''
                            setInputFunction={setEmail}
                            setIsInputFilled={setIsEmailFilled}
                            isInputEditable={false}
                        />

                        <InputDark
                            inputData={phone}
                            label='Telefone'
                            placeholder=''
                            setInputFunction={setPhone}
                            setIsInputFilled={setIsPhoneFilled}
                            isInputEditable={false}
                        />

                        <InputDark
                            inputData={district}
                            label='Bairro'
                            placeholder=''
                            setInputFunction={setDistrict}
                            setIsInputFilled={setIsDistrictFilled}
                            isInputEditable={false}
                        />
                    </View>

                    <TouchableOpacity activeOpacity={0.5} style={styles.editButton}>
                        <Text style={styles.editButtonText}>Editar meus dados</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.75)',
    },
    modalWrapper: {
        borderRadius: 12,
        marginVertical: 32,
        marginHorizontal: 16,
        padding: 16,
        backgroundColor: colors.blue_50,
        minWidth: '80%',
        gap: 40,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    userPortrait: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    userName: {
        fontFamily: fonts.textBold,
        fontSize: 18,
        color: colors.blue_600,
    },
    logoutButton: {
        backgroundColor: colors.blue_600,
        padding: 16,
        borderRadius: 8,
    },
    logoutButtonText: {
        color: colors.blue_50,
        textAlign: 'center',
    },
    inputsContainer: {
        gap: 16,
    },
    editButton: {
        backgroundColor: colors.blue_300,
        borderStyle: 'dotted',
        borderRadius: 8,
        padding: 16,
    },
    editButtonText: {
        color: colors.blue_600,
        textAlign: 'center',
    },
});
