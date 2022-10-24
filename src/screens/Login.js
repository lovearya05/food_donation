import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
// import firestore from '@react-native-firebase/firestore'

const Login = ({ navigation }) => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')


    // const saveData = ()=>{
    //     firestore()
    //     .collection()
    //     .add({
    //         email: email,
    //         password: password,
    //     })
    //     .then(()=>{
    //         console.log("user Added")
    //     })
    // }

    return (

        <View style={{ flex: 1, backgroundColor: "black" }}>
            <Text style={{ alignSelf: 'center', marginTop: 100, fontSize: 80, fontWeight: '700', color: 'red' }}>
                Welcome Back!
            </Text>
            <TextInput
                placeholder='Enter Email Id'
                value={email}
                onChangeText={txt => {
                    setemail(txt)
                }}
                style={{
                    paddingLeft: 15,
                    width: '84%',
                    height: 50,
                    color: 'red',
                    borderRadius: 10,
                    borderWidth: 0.5,
                    alignSelf: 'center',
                    marginTop: 40,
                    backgroundColor: "white",
                }}
            />

            <TextInput
                value={password}
                onChangeText={txt => {
                    setpassword(txt)
                }}
                placeholder='Enter Password'
                style={{
                    paddingLeft: 15,
                    width: '84%',
                    height: 50,
                    color: 'red',
                    borderRadius: 10,
                    borderWidth: 0.5,
                    alignSelf: 'center',
                    marginTop: 30,
                    backgroundColor: "white",
                }}
            />
            <TouchableOpacity
                style={{
                    width: '84%',
                    height: 50,
                    backgroundColor: 'red',
                    borderRadius: 10,
                    marginTop: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                }}
                onPress={() => {
                    // saveData()
                }}
            >

                <Text
                    style={{
                        fontSize: 20,
                        color: 'white'
                    }}
                >Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={()=>{
                    // navigation.navigate('Signup')
                }}
                
                style={{
                    alignSelf: 'center',
                    marginTop: 10,
                    fontSize: 20,
                    fontWeight: '700',
                    color: 'red'
                }}>
                <Text
                   style={{
                        fontSize: 20,
                        color: 'red'
                    }}
                >I'm new Here</Text>
                
            </TouchableOpacity>

        </View>
    )
}

export default Login

