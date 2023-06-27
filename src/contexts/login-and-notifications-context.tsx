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
        }
    }, [user, segments]);
}

async function listenForNotifications(setIsListening: React.Dispatch<React.SetStateAction<boolean>>, user: userData) {
    useEffect(() => {
        if (!user.token || user.role == 'AGENT') return;

        const webSocket = new WebSocket(`ws:${baseNotificationsURL}/notifsTeste/ws`);

        webSocket.onopen = async () => {
            setIsListening(true);
        };

        webSocket.onmessage = async (content) => {
            let jsonRecebido = JSON.parse(content.data);

            // console.log(typeof jsonRecebido.message);

            // jsonRecebido.data != '' &&
            //     jsonRecebido.data != undefined &&
            await Notifications.scheduleNotificationAsync({
                content: {
                    body: jsonRecebido.message,
                    title: `🚨 ${jsonRecebido.title} 🚨`,
                    priority: Notifications.AndroidNotificationPriority.HIGH,
                },
                trigger: {
                    seconds: 1,
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
        district: '',
        role: '',
        id: '',
    });

    const [isListeningForNotifications, setIsListeningForNotifications] = useState(false);

    async function signIn({ email, password }: userLogin) {
        await apiClient
            .post('/login', {
                //Agente
                // login: 'agent@email.com',
                // password: 'Agent!123456789',
                //User
                login: 'user7@email.com',
                password: 'User!123456789',
                // login: email,
                // password: password,
            })
            .then((response) => {
                // console.log(response.data);
                setAuth({
                    token: response.data.token,
                    district: response.data.district,
                    role: response.data.role,
                    id: '',
                });
            })
            .catch((error) => {
                console.log(`Erro no login: ${error}`);
                setAuth({
                    token: '',
                    district: '',
                    role: '',
                    id: '',
                });
            });

        if (!user.token) {
            return 'Ops :( erro no login, por favor confirme seus dados';
        } else {
            return '';
        }
    }

    function signOut() {
        setAuth({
            token: '',
            district: '',
            role: '',
            id: '',
        });
    }

    useProtectedRoute(user);
    listenForNotifications(setIsListeningForNotifications, user);

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
