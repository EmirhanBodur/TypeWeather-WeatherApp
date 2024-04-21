import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "../screens/HomeScreen";
import Name from '../screens/name'
import Search from '../screens/search'
import { LogBox } from "react-native";


const Stack = createStackNavigator();

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state ',
]);

export default function AppNavigation() {
    return (
        <NavigationContainer> 
            <Stack.Navigator initialRouteName='Name' screenOptions={{headerShown:false}}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Name" component={Name} />
                <Stack.Screen name="Search" component={Search} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}