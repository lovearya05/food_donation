import React, { useEffect, useState, useContext } from 'react'
import { View, Text,TextInput, TouchableOpacity, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import {auth, firebase} from '../firebase/config'

const Signup = ({ navigation }) => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [name, setname] = useState('')

        const saveData = async (name, email, password)=>{

            await firebase.auth().createUserWithEmailAndPassword(email,password)
            .then(async(auth)=>{
                    auth.user
                    .updateProfile({
                      displayName:name,
                    })
            })
            .catch((err) => Alert.alert("Login error",err.message));
        }
        // useEffect(() =>{})

    return (

        <ScrollView style={{
            backgroundColor: 'black',
            marginTop:20,
        }}>

        

        <View style={{ flex: 1, backgroundColor: "black" }}>
            <Text style={{ 
                 marginTop: 30,
                 paddingLeft:30,
                  fontSize: 65, 
                  fontWeight: '600',
                   color: 'red'
                    }}>
                Create Account!
            </Text>


            <TextInput
                placeholder='Enter Name'
                value={name}
                onChangeText={txt => {
                    setname(txt)
                }}
                style={{
                    paddingLeft: 15,
                    width: '84%',
                    height: 50,
                    color: 'red',
                    borderRadius: 10,
                    borderWidth: 0.5,
                    alignSelf: 'center',
                    marginTop: 20,
                    backgroundColor: "white",
                }}
            />

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
                    marginTop: 25,
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
                    marginTop: 25,
                    backgroundColor: "white",
                }}
            />
            <TouchableOpacity
                style={{
                    width: '84%',
                    height: 50,
                    backgroundColor: 'red',
                    borderRadius: 10,
                    marginTop: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                }}
                
                // onPress={() => register(email, password,name)}
                onPress={() => { 
                    if(name==='' || email===''){
                        alert("Please Enter Name and Email")
                    }else if(password.length<6){
                        alert("Password Should atleast 6 Character Long")
                    }else{
                        saveData(name, email,password) 
                    }
                    }}
            >

                <Text
                    style={{
                        fontSize: 20,
                        color: 'white'
                    }}
                >Signup</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={()=>{
                    navigation.navigate('Login')
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
                >I'm already member</Text>
                
            </TouchableOpacity>

        </View>

        </ScrollView>
    )
}

export default Signup

