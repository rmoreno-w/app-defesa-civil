import { Feather, FontAwesome, Fontisto } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../src/components/Header';
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

export default function WeatherForecast() {
    const dateObject = new Date();

    const weekDayNumberFormat = dateObject.getDay();
    const weekDay = weekDayWrittenFormat[weekDayNumberFormat];
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const risk = classifyRisk('0');

    function getDate() {
        const currentDate = `${weekDay} (${day}/${month}/${year})`;
        return currentDate;
    }

    function getTime() {
        const currentTime = `${hours}:${minutes}`;
        return currentTime;
    }

    function classifyRisk(precipitation: string) {
        const precipitationNumeric = Number(precipitation);

        if (precipitationNumeric < 20) return 'Sem Perigo';
        else if (precipitationNumeric < 50) return 'Perigo Potencial';
        else if (precipitationNumeric < 100) return 'Perigo';
        else return 'Grande Perigo';
    }

    return (
        <View style={styles.container}>
            <Header showCloseIcon />

            <View style={styles.weatherContainer}>
                <View style={styles.header}>
                    <Text style={styles.subtitleBlack}>Previsão do Tempo para</Text>
                    <View style={styles.subtitleDate}>
                        <Text style={styles.subtitleBlue}>{getDate()}</Text>
                        <Text style={styles.subtitleBlack}>, obtida às </Text>
                        <Text style={styles.subtitleBlue}>{getTime()}</Text>
                    </View>
                </View>

                <View style={styles.weatherForecast}>
                    <View style={styles.weatherForecastItem}>
                        <View style={styles.weatherForecastItemIcon}>
                            <FontAwesome name='thermometer-full' size={32} color={colors.blue_50} />
                        </View>
                        <View style={styles.weatherForecastItemText}>
                            <Text style={styles.weatherForecastItemLabel}>Temperatura máxima:</Text>
                            <Text style={styles.weatherForecastItemValue}>23 °C</Text>
                        </View>
                    </View>
                    <View style={styles.weatherForecastItem}>
                        <View style={styles.weatherForecastItemIcon}>
                            <FontAwesome name='thermometer-empty' size={32} color={colors.blue_50} />
                        </View>
                        <View style={styles.weatherForecastItemText}>
                            <Text style={styles.weatherForecastItemLabel}>Temperatura mínima:</Text>
                            <Text style={styles.weatherForecastItemValue}>10 °C</Text>
                        </View>
                    </View>
                    <View style={styles.weatherForecastItem}>
                        <View style={styles.weatherForecastItemIcon}>
                            <Fontisto name='rain' size={32} color={colors.blue_50} />
                        </View>
                        <View style={styles.weatherForecastItemText}>
                            <Text style={styles.weatherForecastItemLabel}>Precipitação:</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Text style={{ fontFamily: fonts.textBold, fontSize: 18, color: riskColor[risk] }}>
                                    50mm -{' '}
                                </Text>
                                <Text style={{ fontFamily: fonts.textBold, fontSize: 18, color: riskColor[risk] }}>
                                    {risk}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.weatherForecastItem}>
                        <View style={styles.weatherForecastItemIcon}>
                            <Feather name='droplet' size={32} color={colors.blue_50} />
                        </View>
                        <View style={styles.weatherForecastItemText}>
                            <Text style={styles.weatherForecastItemLabel}>Porcentagem de umidade no ar:</Text>
                            <Text style={styles.weatherForecastItemValue}>5%</Text>
                        </View>
                    </View>
                    <View style={styles.weatherForecastItem}>
                        <View style={styles.weatherForecastItemIcon}>
                            <Feather name='wind' size={32} color={colors.blue_50} />
                        </View>
                        <View style={styles.weatherForecastItemText}>
                            <Text style={styles.weatherForecastItemLabel}>Velocidade do Vento:</Text>
                            <Text style={styles.weatherForecastItemValue}>35 km/h</Text>
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
        </View>
    );
}

const styles = StyleSheet.create({
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
