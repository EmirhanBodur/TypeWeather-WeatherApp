import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "../screens/HomeScreen";
import Name from '../screens/name'
import Search from '../screens/search'
import InitialScreen from '../screens/InitialScreen'
import { LogBox } from "react-native";


const Stack = createStackNavigator();

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state ',
]);

export default function AppNavigation() {
    return (
        <NavigationContainer> 
            <Stack.Navigator initialRouteName='InitialScreen' screenOptions={{headerShown:false}}>
                <Stack.Screen name="InitialScreen" component={InitialScreen} />
                <Stack.Screen name="Name" component={Name} />
                <Stack.Screen name="Search" component={Search} />
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}