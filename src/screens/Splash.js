import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { View, Text } from 'react-native'

const Splash = () => {
  
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      // navigation.navigate('BottomNavigator');
      navigation.navigate('Login');
      
      // navigation.navigate('UserState');
    }, 3000)
  });


  return (

    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: '700' }}>
        Splash Screen
      </Text>
    </View>
  )
}

export default Splash

