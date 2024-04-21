import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar
} from 'react-native';
import { MapPinIcon } from 'react-native-heroicons/outline';
import { fetchLocations, fetchWeatherForecast } from '../api/weather';
import * as Progress from 'react-native-progress';
import { debounce } from 'lodash';
import { getData, storeData } from '../utils/asyncStroage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Search({ route, navigation }) {
 
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const fullName = route.params?.fullName;

  if (!fullName) {
    // fullName tanımsızsa, kullanıcıyı bir hata mesajı ile bilgilendirin veya başka bir işlem yapın
    console.error('fullName parametresi tanımsız!');
    return;
  }
  useEffect(() => {
    async function fetchMyWeatherData() {
      const myCity = await getData('city') || 'Konya';
      fetchWeatherForecast({
        cityName: myCity,
        days: '7'
      }).then(data => {
        setLoading(false);
      });
    }
    fetchMyWeatherData();
  }, []);

  const handleLocation = useCallback((loc) => {
    setLoading(true);
    fetchWeatherForecast({
      cityName: loc.name,
      days: '7',
    }).then((data) => {
      setLoading(false);
      storeData('city', loc.name);
      navigation.navigate('Home', { fullName: fullName, weatherData: data });
    });
  }, [navigation, fullName]);

  const handleSearch = useCallback(debounce((value) => {
    if (value.length > 2) {
      fetchLocations({ cityName: value }).then((data) => {
        setLocations(data);
      });
    }
  }, 1200), []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image source={require('../assets/bg.png')} style={styles.backgroundImage} />
      <View style={styles.welcomeContainer}>
        <View style={styles.headerContainer}>

        <Text style={styles.welcomeText}>Welcome to </Text>
        <Text style={styles.appName}>{fullName}</Text>
        </View>
        <Text style={styles.instructions}>Choose a location to see the weather forecast</Text>
      </View>
      
      {loading ? (
        <Progress.CircleSnail thickness={10} size={140} color="#0bb3b2" />
      ) : (
        <SafeAreaView style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            onChangeText={handleSearch}
            placeholder="Search Location"
            placeholderTextColor="#7F7F98"
          />
          {locations.length > 0 && (
            <View style={styles.locationsList}>
              {locations.map((loc, index) => (
                <TouchableOpacity key={index} style={styles.locationItem} onPress={() => handleLocation(loc)}>
                  <MapPinIcon size={24} color="white" />
                  <Text style={styles.locationText}>
                    {loc?.name}, {loc?.country}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </SafeAreaView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  welcomeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp('4%')
  },
  headerContainer : {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    marginTop:20,
  },
  welcomeText: {
    fontSize: wp('5%'),
    color: 'white'
  },
  appName: {
    fontSize: wp('5%'),
    color: '#8FB2F5',
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#BFBFD4',
    fontSize: wp('4%'),
    marginVertical: hp('1%')
  },
  searchContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchInput: {
    height: hp('8%'),
    width: wp('90%'),
    backgroundColor: '#1E1E29',
    borderRadius: wp('2%'),
    paddingLeft: wp('4%'),
    fontSize: wp('4%'),
    color: '#fff'
  },
  locationsList: {
    width: wp('90%'),
    backgroundColor: '#1E1E29',
    borderRadius: wp('2%'),
    marginTop: hp('2%'),
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: hp('2%')
  },
  locationText: {
    marginLeft: wp('2%'),
    color: '#fff',
    fontSize: wp('4%')
  }
});
