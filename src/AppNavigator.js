import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Login from './screens/Login'
import BottomNavigator from './bottom/BottomNavigator'
import Profile from './screens/Profile'
import Singup from './screens/Signup'
// import UserState from './UserState'

const Stack = createStackNavigator()

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>

                <Stack.Screen
                    name='BottomNavigator'
                    component={BottomNavigator}
                    options={{ HeaderShown: false , headerTitle: false }}
                />
                
                <Stack.Screen
                    name='Login'
                    component={Login}
                    options={{ HeaderShown: false , headerTitle: false }}
                />

                <Stack.Screen
                    name='Profile'
                    component={Profile}
                    options={{ HeaderShown: false , headerTitle: false }}
                />

                <Stack.Screen
                    name='Signup'
                    component={Singup}
                    options={{ HeaderShown: false , headerTitle: false }}
                />

                {/* <Stack.Screen
                    name='UserState'
                    component={UserState}
                    options={{ HeaderShown: false , headerTitle: false }}
                />  */}

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator
