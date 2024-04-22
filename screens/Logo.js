// LogoComponent.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Cloud } from 'phosphor-react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const LogoComponent = () => {
  return (
    <View style={styles.logo}>
      <Cloud size={32} color="#8fb2f5" style={styles.vector} />
      <Text style={styles.logoText}>iWeather</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('50%'), // Ekran genişliğinin %50'si
    height: hp('4%'), // Ekran yüksekliğinin %4'ü
    top: hp('6%'), // Ekran yüksekliğinin %6'sı kadar üstten boşluk
    opacity: 0.6,
    flexDirection: 'row',
  },
  logoText: {
    color: '#FAFAFA',
    fontSize: 20,
    fontWeight: 'bold',
  },
  vector: {
    marginRight: 10,
  },
});

export default LogoComponent;
