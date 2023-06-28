import axios from 'axios';

export const baseNotificationsURL = 'ws://192.168.0.109:3334';
export const baseServerURL = 'http://192.168.0.109:3333';

export const apiClient = axios.create({
    baseURL: baseServerURL,
});
