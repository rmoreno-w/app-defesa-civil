import { Feather, FontAwesome, Fontisto } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../src/components/Header';
import { useAuth } from '../src/contexts/login-and-notifications-context';
import { apiClient } from '../src/services/axios';
import colors from '../src/styles/colors';
import fonts from '../src/styles/fonts';

interface weekDayWrittenFormatType {
    [key: number]: string;
}

const weekDayWrittenFormat: weekDayWrittenFormatType = {
    0: 'Segunda',
    1: 'Terça',
    2: 'Quarta',
    3: 'Quinta',
    4: 'Sexta',
    5: 'Sábado',
    6: 'Domingo',
};

const riskColor = {
    'Sem Perigo': colors.blue_400,
    'Perigo Potencial': colors.yellow,
    Perigo: colors.orange,
    'Grande Perigo': colors.red,
};

interface WeatherData {
    created_at: string;
    date: string;
    humidity_max: number;
    humidity_min: number;
    id: string;
    rain_precipitation: number;
    rain_probability: number;
    temperature_max: number;
    temperature_min: number;
    text: string;
    updated_at: string;
    wind_direction: string;
    wind_velocity: number;
}

export default function WeatherForecast() {
    const { user } = useAuth();
    const [todayWeatherForecast, setTodayWeatherForecast] = useState<WeatherData>();
    const [tomorrowWeatherForecast, setTomorrowWeatherForecast] = useState<WeatherData>();
    const [chosenDate, setChosenDate] = useState('Today');
    const [chosenDayData, setChosenDayData] = useState<WeatherData>({
        created_at: '2023-06-27T01:36:17.979Z',
        date: '__/__/____',
        humidity_max: 0,
        humidity_min: 100,
        id: '',
        rain_precipitation: 0,
        rain_probability: 0,
        temperature_max: 0,
        temperature_min: 0,
        text: '',
        updated_at: '',
        wind_direction: '',
        wind_velocity: 0,
    });
    const [risk, setRisk] = useState('');
    let minutes = chosenDayData && new Date(chosenDayData.created_at).getMinutes().toString();

    useEffect(() => {
        async function loadWeatherData() {
            apiClient
                .get('/climate/forecastByDate/', { headers: { Authorization: `Bearer ${user.token}` } })
                .then((receivedData) => {
                    setTodayWeatherForecast(receivedData.data[0]);
                    setTomorrowWeatherForecast(receivedData.data[1]);
                    setChosenDayData(receivedData.data[0]);
                    // console.log(receivedData.data);
                })
                .catch((error) => console.log(error));
        }

        loadWeatherData();
    }, []);

    useEffect(() => {
        chosenDate == 'Today' ? setChosenDayData(todayWeatherForecast) : setChosenDayData(tomorrowWeatherForecast);
    }, [chosenDate, todayWeatherForecast]);

    function classifyRisk(precipitation: number) {
        if (precipitation < 20) return 'Sem Perigo';
        else if (precipitation < 50) return 'Perigo Potencial';
        else if (precipitation < 100) return 'Perigo';
        else return 'Grande Perigo';
    }

    return (
        <View style={styles.container}>
            <Header showCloseIcon />

            {!chosenDayData && (
                <View style={styles.noIncidentsContainer}>
                    <Feather name='download-cloud' size={24} color={colors.blue_600} />
                    <View style={{ flexShrink: 1 }}>
                        <Text>Buscando dados de previsão do tempo...</Text>
                    </View>
                </View>
            )}
            {chosenDayData && (
                <View style={styles.weatherContainer}>
                    <View style={styles.header}>
                        <Text style={styles.subtitleBlack}>Previsão do Tempo para</Text>
                        <View style={styles.subtitleDate}>
                            <Text style={styles.subtitleBlue}>12/02/2222</Text>
                            <Text style={styles.subtitleBlack}>, obtida às </Text>
                            <Text style={styles.subtitleBlue}>
                                {new Date(chosenDayData.created_at).getHours()}:
                                {minutes.length == 2 ? minutes : `0${minutes}`}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.weatherForecast}>
                        <View style={styles.daySelectorWrapper}>
                            <Text style={styles.daySelectorLabel}>Exibir previsão de:</Text>
                            <View style={styles.daySelectorButtons}>
                                <TouchableOpacity
                                    activeOpacity={0.3}
                                    style={[
                                        styles.daySelectorButton,
                                        chosenDate === 'Today' && { backgroundColor: colors.blue_100 },
                                    ]}
                                    onPress={() => setChosenDate('Today')}
                                >
                                    <Text>Hoje</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    activeOpacity={0.3}
                                    style={[
                                        styles.daySelectorButton,
                                        {
                                            borderLeftWidth: 2,
                                            borderLeftColor: colors.blue_400,
                                        },
                                        chosenDate !== 'Today' && { backgroundColor: colors.blue_100 },
                                    ]}
                                    onPress={() => setChosenDate('Tomorrow')}
                                >
                                    <Text>Amanhã</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.weatherForecastItem}>
                            <View style={styles.weatherForecastItemIcon}>
                                <FontAwesome name='thermometer-full' size={32} color={colors.blue_50} />
                            </View>
                            <View style={styles.weatherForecastItemText}>
                                <Text style={styles.weatherForecastItemLabel}>Temperatura máxima:</Text>
                                <Text style={styles.weatherForecastItemValue}>{chosenDayData.temperature_max} °C</Text>
                            </View>
                        </View>

                        <View style={styles.weatherForecastItem}>
                            <View style={styles.weatherForecastItemIcon}>
                                <FontAwesome name='thermometer-empty' size={32} color={colors.blue_50} />
                            </View>
                            <View style={styles.weatherForecastItemText}>
                                <Text style={styles.weatherForecastItemLabel}>Temperatura mínima:</Text>
                                <Text style={styles.weatherForecastItemValue}>{chosenDayData.temperature_min} °C</Text>
                            </View>
                        </View>

                        <View style={styles.weatherForecastItem}>
                            <View style={styles.weatherForecastItemIcon}>
                                <Fontisto name='rain' size={32} color={colors.blue_50} />
                            </View>
                            <View style={styles.weatherForecastItemText}>
                                <Text style={styles.weatherForecastItemLabel}>Precipitação:</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <Text
                                        style={{
                                            fontFamily: fonts.textBold,
                                            fontSize: 18,
                                            color: riskColor[classifyRisk(chosenDayData.rain_probability)],
                                        }}
                                    >
                                        {chosenDayData.rain_precipitation}mm ({chosenDayData.rain_probability} %) -{' '}
                                    </Text>
                                    <Text
                                        style={{
                                            fontFamily: fonts.textBold,
                                            fontSize: 18,
                                            color: riskColor[classifyRisk(chosenDayData.rain_probability)],
                                        }}
                                    >
                                        {classifyRisk(chosenDayData.rain_precipitation)}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.weatherForecastItem}>
                            <View style={styles.weatherForecastItemIcon}>
                                <Feather name='droplet' size={32} color={colors.blue_50} />
                            </View>
                            <View style={styles.weatherForecastItemText}>
                                <Text style={styles.weatherForecastItemLabel}>Porcentagem média de umidade no ar:</Text>
                                <Text style={styles.weatherForecastItemValue}>
                                    {(chosenDayData.humidity_max + chosenDayData.humidity_min) / 2}%
                                </Text>
                            </View>
                        </View>

                        <View style={styles.weatherForecastItem}>
                            <View style={styles.weatherForecastItemIcon}>
                                <Feather name='wind' size={32} color={colors.blue_50} />
                            </View>
                            <View style={styles.weatherForecastItemText}>
                                <Text style={styles.weatherForecastItemLabel}>Velocidade do Vento:</Text>
                                <Text style={styles.weatherForecastItemValue}>
                                    {chosenDayData.wind_velocity} km/h - Direção: {chosenDayData.wind_direction}
                                </Text>
                            </View>
                        </View>
                        {risk.includes('Sem') ? (
                            ''
                        ) : (
                            <View
                                style={{
                                    padding: 4,
                                    backgroundColor: riskColor[risk],
                                    width: '40%',
                                    alignSelf: 'center',
                                    borderRadius: 8,
                                }}
                            >
                                <Text style={{ color: colors.blue_50, textAlign: 'center' }}>Criar</Text>
                                <Text style={{ color: colors.blue_50, textAlign: 'center' }}>Incidente</Text>
                            </View>
                        )}
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    noIncidentsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    daySelectorWrapper: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red',
        gap: 8,
    },
    daySelectorLabel: {
        textAlignVertical: 'center',
    },
    daySelectorButtons: {
        // backgroundColor: 'lightblue',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 8,
        borderWidth: 2,
        borderColor: colors.blue_400,
        overflow: 'hidden',
    },
    daySelectorButton: {
        padding: 16,
    },
    container: {
        flex: 1,
        paddingVertical: 48,
        paddingHorizontal: 16,
        backgroundColor: colors.blue_50,
    },
    weatherContainer: {
        gap: 24,
        flexGrow: 1,
    },
    header: {
        borderBottomWidth: 1,
        borderBottomColor: colors.blue_600,
        paddingBottom: 24,
    },
    subtitleDate: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    subtitleBlack: {
        fontFamily: fonts.textBold,
        fontSize: 20,
        color: colors.blue_900,
        textAlign: 'center',
    },
    subtitleBlue: {
        fontFamily: fonts.textBold,
        fontSize: 18,
        color: colors.blue_400,
        textAlign: 'center',
    },
    weatherForecast: {
        gap: 8,
        flex: 1,
        justifyContent: 'space-around',
    },
    weatherForecastItem: {
        gap: 8,
        flexDirection: 'row',
        borderLeftWidth: 1,
        borderLeftColor: colors.blue_100,
        paddingVertical: 8,
        paddingLeft: 8,
        alignItems: 'center',
    },
    weatherForecastItemIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 44,
        width: 44,
        backgroundColor: colors.blue_400,
        borderRadius: 22,
    },
    weatherForecastItemText: {
        gap: 4,
    },
    weatherForecastItemLabel: {
        // backgroundColor: 'cyan',
        fontSize: 14,
        flexShrink: 1,
        color: colors.blue_600,
    },
    weatherForecastItemValue: {
        fontFamily: fonts.textBold,
        color: colors.blue_400,
        fontSize: 18,
    },
});
