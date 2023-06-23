import { Slot } from 'expo-router';
import Toast from 'react-native-toast-message';
import { Provider } from '../src/contexts/login-and-notifications-context';

export default function Root() {
    return (
        // Setup the auth context and render our layout inside of it.
        <Provider>
            <Slot />
            <Toast />
        </Provider>
    );
}
