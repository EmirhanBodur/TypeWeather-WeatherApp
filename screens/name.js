import React, { useCallback, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, StatusBar } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LogoComponent from './Logo';
import { storeData } from '../utils/asyncStroage';


function Name({ navigation }) {
  const [fullName, setFullName] = useState('');


  const handleContinue = useCallback(() => {
    storeData('fullName', fullName).then(() => {
      console.log('Name saved:', fullName);  // Kaydedilen adı konsolda göster
      navigation.navigate('Search', { fullName: fullName });
    }).catch(error => console.error('Failed to save name:', error));
  }, [fullName, navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/bg.png')} style={styles.backgroundImage} />
      <LogoComponent />
      <View style={styles.contentContainer}>
        <View style={styles.messageContainer}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Welcome to </Text>
            <Text style={styles.appNameText}>TypeWeather</Text>
          </View>
          <Text style={styles.instructionsText}>Enter your first and last name</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Enter Your Name and Surname"
          value={fullName}
          onChangeText={setFullName}
          placeholderTextColor='#7F7F98'
        />

        {fullName !== '' ? (
          <TouchableOpacity onPress={handleContinue} style={styles.button}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity disabled={true} style={[styles.button, styles.buttonDisabled]}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        )}
      </View>

      <StatusBar hidden={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  backgroundImage: {
    position: 'absolute',
    height: '100%',
    width: '100%'
  },
  logo: {
    position:'absolute',
    alignItems:'center',
    justifyContent: 'center',
    width: wp('50%'), // Ekran genişliğinin %50'si
    height: hp('4%'), // Ekran yüksekliğinin %4'ü
    top: hp('6%'), // Ekran yüksekliğinin %6'sı kadar üstten boşluk
    opacity: 0.6, // Şeffaflık değeri
    flexDirection:'row'
  },
  logoText : {
    color: '#FAFAFA',
    fontSize: 20,
    fontWeight: 'bold',
  },
  vector : {
    marginRight:4,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: hp('4%')
  },
  messageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    marginBottom: hp('0.5%')
  },
  welcomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('0.5%')
  },
  welcomeText: {
    color: 'white',
    fontSize: wp('5%')
  },
  appNameText: {
    color: '#8FB2F5',
    fontSize: wp('5%')
  },
  instructionsText: {
    color: '#BFBFD4', // Adjust color as needed
    lineHeight: hp('2.5%'),
    textAlign: 'center',
    fontSize: wp('4%'),
  },
  input: {
    height: hp('8%'),
    width: wp('90%'),
    backgroundColor: '#1E1E29',
    borderRadius: wp('2%'),
    paddingLeft: wp('4%'),
    fontSize: wp('4%'),
    color: '#fff'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('7%'),
    width: wp('90%'),
    borderRadius: wp('2%'),
    backgroundColor: '#1E1E29',
  },
  buttonText: {
    fontWeight: '600',
    color: 'white'
  },
  buttonDisabled: {
    opacity: 0.5
  }
});

export default Name;
