import React, {createContext, useEffect,useState , useContext  } from 'react';
// import AppNavigator from './src/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {View, ActivityIndicator} from "react-native"
import { onAuthStateChanged } from 'firebase/auth';

import Chat from "./src/screens/Chat"
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Donor from './src/screens/Donor';
import Volunteer from './src/screens/Volunteer'
import { auth } from './src/firebase/config';

const Stack = createStackNavigator();
const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ({children}) =>{
  const [user, setUser] = useState(null)
  return(
      <AuthenticatedUserContext.Provider value={{user, setUser}}>
        {children}
      </AuthenticatedUserContext.Provider>
  )
}
//screenOptions={{headerShown: false}}
function MainStack() {
  return (
    <Stack.Navigator >  
      {/* <Stack.Screen name = "Chat" component = {Chat}/> */}
      {/* <Stack.Screen name = "Volunteer" component = {Volunteer}/> */}
      <Stack.Screen name = "Donor" component = {Donor}/>
      
    </Stack.Navigator>
  )
}

function AuthStack(){
  return (
    <Stack.Navigator defaultScreenOptions={Login} screenOptions={{headerShown: false}}>
        <Stack.Screen name = "Login" component = {Login}/>
        <Stack.Screen name = "Signup" component = {Signup}/>
        
      </Stack.Navigator>
  )
}

function RootNavigator(){
  const {user, setUser } = useContext(AuthenticatedUserContext);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,
      async authenticatedUser =>{
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  },[user]);

  if(loading){
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    )
  }


  return (
    <NavigationContainer>
      {user ? <MainStack/> : <AuthStack/>}
    {/* <AuthStack/> */}
    </NavigationContainer>
  )
}

const App = () => {
   return (
    <AuthenticatedUserProvider>
      <RootNavigator/>
    </AuthenticatedUserProvider>  
  )
}

export default App;
