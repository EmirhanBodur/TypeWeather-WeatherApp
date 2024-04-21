import React, { useCallback, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, StatusBar } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

function Name({ navigation }) {
  const [fullName, setFullName] = useState('');

  const handleContinue = useCallback (() => {
    navigation.navigate('Search', { fullName: fullName });
  }, [fullName, navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/bg.png')} style={styles.backgroundImage} />
      
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
          placeholder="Adınızı ve Soyadınızı Giriniz"
          value={fullName}
          onChangeText={setFullName}
          placeholderTextColor='#fff'
        />

        {fullName !== '' ? (
          <TouchableOpacity onPress={handleContinue} style={styles.button}>
            <Text style={styles.buttonText}>Devam et</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity disabled={true} style={[styles.button, styles.buttonDisabled]}>
            <Text style={styles.buttonText}>Devam et</Text>
          </TouchableOpacity>
        )}
      </View>

      <StatusBar style='auto' />
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
    color: '#8FB2F5', // Adjust color as needed
    fontSize: wp('5%')
  },
  instructionsText: {
    color: '#BFBFD4', // Adjust color as needed
    lineHeight: hp('2.5%'),
    textAlign: 'center',
    fontSize: wp('4%')
  },
  input: {
    height: hp('7%'),
    width: wp('80%'),
    backgroundColor: '#1E1E29', // Adjust background color
    borderRadius: wp('2%'),
    color: 'white',
    paddingLeft: wp('2%')
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('1.5%'),
    height: hp('7%'),
    width: wp('80%'),
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
