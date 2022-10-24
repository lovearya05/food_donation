import React, { useEffect, useState, useContext } from 'react'
import { View, Text,TextInput, TouchableOpacity } from 'react-native'


const Signup = ({ navigation }) => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [name, setname] = useState('')

        const saveData = (name, email, password)=>{
            console.log(name)
            console.log(email)
            console.log(password)
        }


    return (

        <View style={{ flex: 1, backgroundColor: "black" }}>
            <Text style={{ 
                 marginTop: 100,
                 paddingLeft:30,
                  fontSize: 70, 
                  fontWeight: '700',
                   color: 'red'
                    }}>
                Create Account
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
                    marginTop: 30,
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
                // onPress={() => { saveData(name, email,password) }}
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
    )
}

export default Signup

