import * as Notifications from 'expo-notifications';
import { useRouter, useSegments } from 'expo-router';
import { createContext, useContext, useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { apiClient, baseNotificationsURL } from '../services/axios';

const AuthContext = createContext(null);

interface userLogin {
    email: string;
    password: string;
}

interface userData {
    token: string;
    district: string;
    name: string;
    role: string;
    id: string;
}

// This hook can be used to access the user info.
export function useAuth() {
    return useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user: userData) {
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        const inAuthGroup = segments[0] === '(auth)';

        if (
            // If the user is not signed in and the initial segment is not anything in the auth group.
            !user.token &&
            !inAuthGroup
        ) {
            // Redirect to the sign-in page.
            router.replace('/signIn');
        } else if (user.role == 'AGENT' && inAuthGroup) {
            // Redirect away from the sign-in page.
            router.replace('/agentMainMenu');
        } else if (user.role == 'USER' && inAuthGroup) {
            // Redirect away from the sign-in page.
            router.replace('/userMainMenu');
        } else if (user.role == 'EMERGENCY' && inAuthGroup) {
            // Redirect away from the sign-in page.
            router.replace('/emergencyServiceMainMenu');
        }
    }, [user, segments]);
}

async function listenForNotifications(user: userData) {
    useEffect(() => {
        if (!user.token || user.role == 'AGENT') return;

        let webSocket: any;

        if (user.role == 'USER') {
            let formattedDistrictName = user.district.replace(' ', '');
            webSocket = new WebSocket(`${baseNotificationsURL}/${formattedDistrictName}/ws`);
        } else if (user.role == 'EMERGENCY') {
            let formattedServiceName = user.name.replace(' ', '');
            webSocket = new WebSocket(`${baseNotificationsURL}/${formattedServiceName}/ws`);
        }
        // console.log(`ws:${baseNotificationsURL}/${formattedDistrictName}/ws`);

        webSocket.onmessage = async (content) => {
            // console.log(content);
            // console.log(typeof content);
            const receivedJSON = JSON.parse(content.data);
            let receivedIncidentObject: any;

            // NTFY sempre envia uma notificacao vazia ao abrir canal. Se receber ela, descartar
            if (receivedJSON.message) receivedIncidentObject = JSON.parse(receivedJSON.message);
            else return;

            console.log(receivedIncidentObject);
            console.log(typeof receivedIncidentObject);
            // console.log(JSON.parse(content.data));
            // console.log(typeof JSON.parse(content.data));

            // jsonRecebido.data != '' &&
            //     jsonRecebido.data != undefined &&
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: '🚨 Novo incidente na sua área! 🚨',
                    body: receivedIncidentObject.description,
                    priority: Notifications.AndroidNotificationPriority.HIGH,
                },
                trigger: {
                    seconds: 3,
                },
            });
        };

        const subscription = Notifications.addNotificationReceivedListener((notification) => {
            // console.log(notification.request.content.body);
            notification.request.content.body &&
                Toast.show({
                    type: 'error',
                    text1: `🚨 Novo incidente 🚨`,
                    text2: `Acesse a seção de Incidentes para verificar!`,
                    visibilityTime: 7500,
                    topOffset: 50,
                });
        });

        return () => {
            webSocket.close();
            subscription.remove();
        };
    }, [user]);
}

export function Provider(props) {
    const [user, setAuth] = useState<userData>({
        token: '',
        name: '',
        district: '',
        role: '',
        id: '',
    });

    async function signIn({ email, password }: userLogin) {
        try {
            await apiClient
                .post('/login', {
                    //Agente
                    // login: 'agent@email.com',
                    // password: 'Agent!123456789',
                    //User
                    // login: 'user7@email.com',
                    // password: 'User!123456789',
                    //Servico
                    // login: 'cemig@email.com',
                    // password: 'Agent!123456789',
                    login: email,
                    password: password,
                })
                .then((response) => {
                    console.log(response.data);
                    let token = response.data.token;
                    apiClient
                        .get('/users/me', { headers: { Authorization: `Bearer ${response.data.token}` } })
                        .then((secondResponse) => {
                            console.log(secondResponse.data);
                            setAuth({
                                token,
                                district: secondResponse.data.district_name,
                                name: secondResponse.data.name,
                                role: secondResponse.data.role,
                                id: secondResponse.data.id,
                            });
                        });
                });
            return '';
        } catch (error) {
            console.log(`Erro no login: ${error}`);
            setAuth({
                token: '',
                district: '',
                name: '',
                role: '',
                id: '',
            });
            return 'Ops :( erro no login, por favor confirme seus dados';
        }
    }

    function signOut() {
        setAuth({
            token: '',
            district: '',
            role: '',
            name: '',
            id: '',
        });
    }

    useProtectedRoute(user);
    listenForNotifications(user);

    return (
        <AuthContext.Provider
            value={{
                signIn,
                signOut,
                user,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}
