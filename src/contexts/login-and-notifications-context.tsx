import * as Notifications from 'expo-notifications';
import { useRouter, useSegments } from 'expo-router';
import { createContext, useContext, useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';

const AuthContext = createContext(null);

interface userLogin {
    email: string;
    senha: string;
    bairro: string;
}

// This hook can be used to access the user info.
export function useAuth() {
    return useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user) {
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        const inAuthGroup = segments[0] === '(auth)';

        if (
            // If the user is not signed in and the initial segment is not anything in the auth group.
            !user.email &&
            !inAuthGroup
        ) {
            // Redirect to the sign-in page.
            router.replace('/signIn');
        } else if (user.email.toLowerCase().includes('agent') && inAuthGroup) {
            // Redirect away from the sign-in page.
            router.replace('/agentMainMenu');
        } else if (user.email && inAuthGroup) {
            // Redirect away from the sign-in page.
            router.replace('/userMainMenu');
        }
    }, [user, segments]);
}

async function listenForNotifications(
    isListening: boolean,
    setIsListening: React.Dispatch<React.SetStateAction<boolean>>,
    user: userLogin
) {
    let baseUrl = '192.168.0.109';

    useEffect(() => {
        if (!user.email && !user.senha) return;

        const webSocket = new WebSocket(`ws:${baseUrl}/notifsTeste/ws`);

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
            console.log(notification.request.content.body);
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
    const [user, setAuth] = useState({
        email: '',
        senha: '',
        bairro: '',
    });

    const [isListeningForNotifications, setIsListeningForNotifications] = useState(false);

    function signIn({ email, senha, bairro }: userLogin) {
        // console.log(email);
        // console.log(senha);
        // console.log(bairro);
        setAuth({
            email,
            senha,
            bairro,
        });
    }

    function signOut() {
        setAuth({
            email: '',
            senha: '',
            bairro: '',
        });
    }

    useProtectedRoute(user);
    listenForNotifications(isListeningForNotifications, setIsListeningForNotifications, user);

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
