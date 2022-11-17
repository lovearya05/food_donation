import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Volunteer from '../screens/Volunteer';
import Donor from '../screens/Donor'
import Profile from '../screens/Profile';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Chat from '../screens/Chat';


const Bottom = createBottomTabNavigator();


const BottomNavigator = () => {

    return (
        <Bottom.Navigator 
            tabBarOptions={{
            activeTintColor: 'green',
            inactiveTintColor: 'white',
            activeBackgroundColor: 'black',
            inactiveBackgroundColor: '#350A0A',
            style: {
                    backgroundColor: '#CE4418',
                    paddingBottom: 3
            }
            }}
            // style = {{backgroundColor: 'black'}} 
            screenOptions={{headerTitle: false}} >
            
            <Bottom.Screen 
                name= 'volunter'
                component={Volunteer}
                options={{
                    headerShown:false,
                    tabBarIcon: () => (
                    <MaterialCommunityIcons name="home" color={'green'} size={26} />
                ),
                }}
            />

            <Bottom.Screen 
                name= 'Donor'
                component={Donor}
                options={{
                    headerShown:false,
                    tabBarIcon: () => (
                    <MaterialCommunityIcons name="plus-circle" color={'green'} size={26} />
                ),
                }}
            />
            
            
            <Bottom.Screen 
                name= 'Profile'
                component={Profile}
                options={{
                    headerShown:false,
                    tabBarIcon: () => (
                    <MaterialCommunityIcons name="account" color={'green'} size={26} />
                ),
                }}
            />

        </Bottom.Navigator>

    );
}


const styles = StyleSheet.create({
    container: {
        marginTop: 520,
        padding: 100,
        backgroundColor: 'black'
    },
    bigBlue: {
        color: 'green',
        fontWeight: 'bold',
        fontSize: 30,
    },
    play:{
        color:"red"
    }
});

export default BottomNavigator;
