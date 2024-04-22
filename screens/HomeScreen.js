import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import { Dialog, Portal, Button } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { debounce } from 'lodash';
import {
  CloudRain,
  Thermometer,
  Wind,
  Drop,
  Sun
} from 'phosphor-react-native';
import { CalendarDaysIcon } from 'react-native-heroicons/outline';
import { fetchLocations, fetchWeatherForecast } from '../api/weather';
import { weatherImages } from '../constants';
import { getData, storeData } from '../utils/asyncStroage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';


function HomeScreen({ route, navigation }) {
  const [fullName, setFullName] = useState(route.params?.fullName);
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [city, setCity] = useState('');

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      const savedCity = await getData('city') || 'DefaultCity';
      setCity(savedCity);
      const weatherData = await fetchWeatherForecast({ cityName: savedCity, days: '7' });
      setWeather(weatherData);
      setLoading(false);
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    // AsyncStorage'den kullanıcı adını çek
    getData('fullName').then(storedName => {
      if (storedName) {
        setFullName(storedName);
      }
    });
  }, []);

  useEffect(() => {
    async function loadCityData() {
      const storedCity = await getData('city');
      if (storedCity) {
        setCity(storedCity);
        setDialogVisible(true); // Dialogu göster
      }
    }
  
    loadCityData();
  }, []);

  const handleCityChangeConfirm = () => {
    setDialogVisible(false);
    navigation.navigate('Search', { fullName: fullName ?? "Default Name" });
  };

  const handleCityChangeCancel = () => {
    setDialogVisible(false);
  };
  const fetchMyWeatherData = useCallback(async () => {
    const myCity = await getData('city') || 'Konya';
    setLoading(true);
    fetchWeatherForecast({ cityName: myCity, days: '6' }).then(data => {
      setWeather(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (route.params?.weatherData) {
      setWeather(route.params.weatherData);
    } else {
      fetchMyWeatherData();
    }
  }, [route.params?.weatherData, fetchMyWeatherData]);

  useEffect(() => {
    async function fetchAndSetWeather() {
      setLoading(true);
      const savedCity = await getData('city');
      if (savedCity) {
        setCity(savedCity); // Kaydedilen şehri duruma ekleyin
        fetchWeatherForecast({ cityName: savedCity, days: '7' }).then(data => {
          setWeather(data);
          setLoading(false);
        });
      } else {
        // Kaydedilmiş şehir yoksa varsayılan bir şehir kullanabilir veya kullanıcıyı Search ekranına yönlendirebilirsiniz
        setLoading(false);
      }
    }
  
    fetchAndSetWeather();
  }, []);

  const handleLocation = useCallback(loc => {
    setLoading(true);
    fetchWeatherForecast({
      cityName: loc.name,
      days: '7'
    }).then(data => {
      setWeather(data);
      setLoading(false);
      storeData('city', loc.name);
      navigation.navigate('Home', { weatherData: data });
      setDialogVisible(true);  // Şehir seçildikten sonra diyalogu göster
    });
  }, [navigation]);

  const handleSearch = useCallback(debounce(value => {
    if (value.length > 2) {
      fetchLocations({ cityName: value }).then(setWeather);
    }
  }, 1200), []);

  useEffect(() => {
    fetchMyWeatherData();
  }, []);

  const getCurrentDate = () => {
    const currentDate = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    return currentDate.toLocaleDateString('en-US', options);
  };

  const formattedDate = getCurrentDate();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.mainScrollView}>
      <Portal>
          <Dialog  visible={dialogVisible} onDismiss={handleCityChangeCancel}>
            <Dialog.Title>Change City</Dialog.Title>
            <Dialog.Content>
              <Text style={{color:'black'}}>Your current city is {city}. Would you like to change it?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button style={{Color:'black'}}  onPress={handleCityChangeConfirm}>Yes</Button>
              <Button onPress={handleCityChangeCancel}>No</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <Image
          source={require('../assets/bg.png')}
          className="absolute inset-0 w-full h-full"
        />
        <View style={styles.cardWeather}>
          <View style={styles.imageContainer}>
            <Image source={require('../assets/ımage.png')} style={styles.backgroundImage} />
          </View>
                  <View style={styles.locationContainer}>
          <View style={styles.locationLine}>
            <Text style={styles.locationText}>
              {weather.location?.name},
            </Text>
            <Text style={styles.locationText}> {/* Sağa doğru 10 birim boşluk ekler */}
              {weather.location?.country}
            </Text>
          </View>
          <Text style={[styles.locationText, styles.fullNameStyle]}>Hi, {fullName}</Text>
          <Text style={styles.dateText}>{formattedDate}</Text>
        </View>
          <View style={styles.temperatureContainer}>
            <Text style={styles.currentTemp}>{weather.current?.temp_c}º</Text>
            <Text style={styles.condition}>{weather.current?.condition?.text}</Text>
          </View>
          <View style={styles.weatherIconContainer}>
            <Image
              source={weatherImages[weather.current?.condition?.text]}
              style={styles.weatherIcon}
            />
          </View>
        </View>

        <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.title}>
          <Thermometer size={16} color="white" /> Thermal sensation
        </Text>
        <Text style={styles.value}>{weather.current?.temp_c}°</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.title}>
          <CloudRain size={16} color="white" /> Probability of rain
        </Text>
        <Text style={styles.value}>{weather.current?.precip_mm}%</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.title}>
          <Wind size={16} color="white" /> Wind speed
        </Text>
        <Text style={styles.value}>{weather.current?.wind_kph} km/h</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.title}>
          <Drop size={16} color="white" /> Air humidity
        </Text>
        <Text style={styles.value}>{weather.current?.humidity}%</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.title}>
          <Sun size={16} color="white" /> UV Index
        </Text>
        <Text style={styles.value}>{weather.current?.uv}</Text>
      </View>
    </View>
        
      <View style={styles.headerContainer}>
        <CalendarDaysIcon size={20} color="white" />
        <Text style={styles.headerText}>Daily Forecast</Text>
      </View> 
    <View style={styles.forecastContainer}>
    <ScrollView
            horizontal
            contentContainerStyle={styles.scrollViewContent}
            showsHorizontalScrollIndicator={false}
          >
            {weather?.forecast?.forecastday?.map((item, index) => {
              let date = new Date(item.date);
              let options = { weekday: 'long' };
              let dayName = date.toLocaleDateString('en-US', options);
              dayName = dayName.split(',')[0];
              return (
                <View key={index} style={styles.dayContainer}>
                  <Image source={weatherImages[item?.day?.condition?.text]} style={styles.weatherIconn} />
                  <Text style={styles.dayName}>{dayName}</Text>
                  <Text style={styles.temperature}>{item?.day?.avgtemp_c}°</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>
      <StatusBar hidden={true} />
    </SafeAreaView>
  );
}
  const styles = StyleSheet.create({
    container: {
      width: wp('95%'),
      maxHeight: hp('40%'),
      overflow: 'hidden',
      padding: 2,
      paddingLeft: 1,
      marginLeft: wp('3%'),
      borderRadius: 10,
      backgroundColor: '#16161F',
    },
    item: {
      height: hp('8%'), 
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
      backgroundColor: '#16161F',
      
      borderRadius: 5,
    },
    title: {
      fontWeight: 'bold',
      fontSize: wp('3%'), 
      color: '#cccccc',
      flexDirection: 'row',
      alignItems: 'center',
    },
    value: {
      fontWeight: 'bold',
      fontSize: wp('4%'), 
      color: 'white',
      marginRight: 3,
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: wp(5),
      marginTop: hp(2),
      marginBottom: hp(2),
    },
    headerText: {
      color: 'white',
      fontSize: wp(4),
    },
    forecastContainer: {
      backgroundColor: '#16161F',
    },
    scrollViewContent: {
      paddingHorizontal: wp(4),
    },
    dayContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: wp(32),
      height: hp(16),
      borderRadius: hp(3),
      marginRight: wp(4),
      paddingVertical: hp(1),
     
    },
    weatherIconn: {
      height: hp(5.5),
      width: wp(20),
    },
    dayName: {
      color: 'white',
      fontSize: wp(4.5),
      fontWeight: 'bold',
      
    },
    temperature: {
      color: 'white',
      fontSize: wp(4.5),
      fontWeight: 'bold',
    },
    cardWeather: {
      backgroundColor: '#16161F',
      width: '100%',
      height: hp('45%'), 
      paddingTop: wp('6%'),
      paddingLeft: wp('3%'),
      paddingRight: wp('3%'),
      paddingBottom: wp('3%'),
      borderRadius: 20,
    },
    imageContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    backgroundImage: {
      width: '95%', 
      height: '90%', 
      borderRadius: 15,
    },
    locationContainer: {
      top: wp('6%'),
      left: wp('6%'),
    },
    fullNameStyle: {
      marginTop: wp('2%'),  // Yükseklik cinsinden yüzdelik olarak üstten boşluk
    },
    locationLine: {
      flexDirection: 'row',  // İçeriklerin yatay düzlemde sıralanmasını sağlar
      alignItems: 'center'  // İçeriklerin dikey hizalanmasını sağlar
    },
    locationText: {
      color: '#FAFAFA',
      fontSize: wp('4%'),
      fontWeight: 'bold',
    },
    dateText: {
      color: '#FAFAFA',
      fontSize: wp('3%'),
      marginTop: wp('1%'),
    },
    temperatureContainer: {
      position: 'absolute',
      bottom: hp('10%'),
      left: wp('10%'),
    },
    currentTemp: {
      fontSize: wp('10%'),
      
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    condition: {
      fontSize: wp('3.5%'),
      paddingLeft: wp('1%'),
      paddingTop: wp('2%'),
      fontWeight: 'bold',
      color: '#FFFFFF',
      
    },
    weatherIconContainer: {
      position:'absolute',
      width: wp('42.67%'), // 160px ekrana göre ölçeklendi
      height: hp('21.33%'), // 160px ekrana göre ölçeklendi
      top: hp('19.2%'), // 144px ekrana göre ölçeklendi
      left: wp('55.67%'), // 175px ekrana göre ölçeklendi
     
    },
    weatherIcon: {
      width: '100%',
      height: '100%',
    },
    safeArea: {
      flex:1,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight:0
    },
    mainScrollView : {
      flex:1,
    }
    
  });
  export default HomeScreen;