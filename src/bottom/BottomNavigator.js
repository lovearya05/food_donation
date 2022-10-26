import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Volunteer from '../screens/Volunteer';
import Donor from '../screens/Donor'
import Profile from '../screens/Profile';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Login from '../screens/Login';
import Signup from '../screens/Signup';

const Bottom = createBottomTabNavigator();


const BottomNavigator = () => {

    return (
        <Bottom.Navigator>

            <Bottom.Screen 
                name= 'Login'
                component={Login}
                options={{
                    headerShown:true,

                }}
            />

            <Bottom.Screen 
                name= 'Signup'
                component={Signup}
                options={{
                    headerShown:true,

                }}
            />

            <Bottom.Screen 
                name= 'volunter'
                component={Volunteer}
                options={{
                    headerShown:true,
                    // tabBarIcon:({color,size})=(
                    //     <Image source={require('../../assets/home.png')}
                    //     style={{width:24,height:24,tintColor:color}}/>
                    // ),
                }}
            />

            <Bottom.Screen 
                name= 'Donor'
                component={Donor}
                options={{
                    headerShown:true,

                }}
            />
            
            <Bottom.Screen 
                name= 'Profile'
                component={Profile}
                options={{
                    headerShown:true,

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
