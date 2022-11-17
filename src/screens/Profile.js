import React from "react";
// import { signOut } from "firebase/auth";
import { auth, database } from "../firebase/config";
import { TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Profile = () =>{

  const navigation = useNavigation()

  const onSignOut = ()=>{
      auth.signOut()
      .then(() =>{
        navigation.navigate("Login")
      }).catch((error) =>{
        console.log(error.message)
      })
  }

  return(
      <TouchableOpacity
      style={{
        marginTop:500,
        borderColor:'green',
        borderWidth: 2,
        borderRadius:10,
        width:90,
        height:30,
        marginLeft:'38%'
      }}

      onPress={onSignOut}
    >
      <Text style={{
        marginLeft:9,
        marginTop:2,
        color:'Red',
        // borderColor:'green'
      }}> Sign Out </Text>
  </TouchableOpacity>
  )
}

export default Profile