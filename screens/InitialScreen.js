import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { getData } from '../utils/asyncStroage';
import { useNavigation } from '@react-navigation/native';

function InitialScreen() {
    const navigation = useNavigation();

    useEffect(() => {
        const checkInitialCity = async () => {
            const city = await getData('city');
            if (city) {
                navigation.replace('Home');
            } else {
                navigation.replace('Name');
            }
        };

        checkInitialCity();
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
        </View>
    );
}

export default InitialScreen;
