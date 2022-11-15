import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import firebase, { auth } from '../firebase/config'


const Login = ({ navigation }) => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')


    loginUser = async (email, password) =>{

        if(email!=="" && password != ""){
            console.log(email, password);

            await firebase.auth().signInWithEmailAndPassword(auth, email,password)
            .then(()=> console.log("Login Success"))
            .catch((err) => Alert.alert("Login error", err.message));
            console.log("loged in")

        }
    }

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
                    loginUser(email, password)
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
                    navigation.navigate('Signup')
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

