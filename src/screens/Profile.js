import React, {useState, useEffect} from "react";
import { View, Text,ScrollView, Image,TouchableOpacity, StyleSheet } from 'react-native'
import { auth, database } from "../firebase/config";
import { useNavigation } from "@react-navigation/native";
import firebase from 'firebase/compat'


const Profile = () =>{


const [foods,setFoods] = useState([]);

useEffect(() => {
  firebase.firestore()
  .collection("posts")
  .onSnapshot(snapshot=>(
    setFoods(snapshot.docs.map((doc)=>(
      {
        // data:doc.data(),
        name:doc.data().name,
        date:doc.data().date,
        address: doc.data().address,
        food:doc.data().food,
        email:doc.data().email,
        id:doc.id
      }
     
    )))
  ))       
},[])

  
const ShowData = ({name,address, food, date,time,id,email}) =>{

  return(
    <View>
      <View style={{alignItems:'center'}}>
        <Image style={styles.image}
        source={require('../assets/food.png')} />      
      </View>

      <View style={styles.bottomComp}>
          <Text style={styles.donorName} >{name} 😍</Text>
          <Text style={styles.foodName}>{food}</Text>
          <Text style={styles.address}>
            Address : {address}
          </Text>
          
          <Text style={styles.avalTill}>
            Available Till
          </Text>
        {/* <AddCircleIcon/> */}
          <Text style={styles.dateTime}>
            Date : {date}
          </Text>
        
          <Text style={styles.dateTime}>
            Time : {time}
          </Text>

         {firebase.auth().currentUser.email === email ?  <TouchableOpacity
              style={styles.deleteOpacity}
              onPress={()=>{deleteFood(id)}}
            >
              <Text style={styles.deleteBtn}> Delete Food </Text>
          </TouchableOpacity>:null}
      </View>
    </View>
  )
}
    

  // const navigation = useNavigation()

  const deleteFood = (id)=>{
    // console.log(id)
    firebase.firestore()
    .collection("posts").doc(id).delete()
    .then(()=>{
      // alert("Deleted");
      console.log(deleted)
    }).catch((error)=>{
      console.log(error);
    })
    console.log("deleted")
  }

  const onSignOut = ()=>{
      auth.signOut()
      .then(() =>{
      }).catch((error) =>{
        console.log(error.message)
      })
  }

  return(

    <View style={{
      backgroundColor:'#350A0A',
      marginTop:20,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    }}>

      <View style={{
        display:'flex',
        flexDirection:'row'
      }}>
        <Text style={styles.hii}>Hii!</Text>
        <Text style={styles.name}>{auth.currentUser.displayName}</Text>

      </View>
      {/* {firebase.auth().currentUser.email ===   ?  */}
      <TouchableOpacity
      style={styles.signOutOpc}

      onPress={onSignOut}
    >
      <Text style={styles.signOut}> Sign Out </Text>
  </TouchableOpacity>

 

  
  <Text style={styles.uploadedFood}
      >All Uploaded Foods</Text>


  <ScrollView style={{
    backgroundColor:'#350A0A',
    marginBottom:150
  }}>
        {/* console.log(new Date()) */}

        {/* // retriving data from the food object */}
    {foods.map((data) =>{

    {data.date  &&

      
                    
      {/* console.log(data.date.toDate()) */}
      var date = data.date.toDate().getDate();
      var month = data.date.toDate().getMonth() + 1;
      var year = data.date.toDate().getFullYear();
      var day = data.date.toDate().getDay();

      var hours =  data.date.toDate().getHours();
      var min =  data.date.toDate().getMinutes();
      var time = 0;
      {/* console.log(typeof(hours)) */}
      if(hours>12){
        hours-=12
        time = hours<10? '0'+hours:hours
        time +=" : "
        time += min<10? '0'+ min :min
        time += " PM"
      }else{
        time = hours<10? '0'+hours:hours
        time +=" : "
        time += min<10? '0'+ min :min
        time += " AM"
      }

      var cmpDate = date + '-' + month + '-' + year 

      console.log(data)

      return (
          <View>
            <ShowData name={data.name} address={data.address} food={data.food} date={cmpDate} time={time} id={data.id} email={data.email}/>
          </View>
      )
    }
    }
    )}

  </ScrollView>


    </View>
  )
}

export default Profile



const styles = StyleSheet.create({
  hii:{
    color:'white',
    fontSize:70,
    marginLeft:20,
    marginTop:40
    },
  name:{
    color:'green',
    fontSize:70,
    marginLeft:20,
    marginTop:40
    },
  signOutOpc:{
    marginTop:0,
    borderColor:'green',
    borderWidth: 2,
    borderRadius:10,
    width:90,
    height:30,
    marginLeft:'70%'
  },
  signOut:{
    marginLeft:9,
    marginTop:2,
    color:'green',
    // borderColor:'green'
  },
  uploadedFood:{
    color:'white',
    marginBottom:8,
    fontSize:20,
    marginLeft:25
  },
  image:{
    borderRadius:20,
    height:270,
    width:'90%'
  },
  bottomComp:{
    flex:1,
    backgroundColor:'transparent',
    resizeMode:'cover',
  },
  donorName:{
    fontSize:20,
    marginLeft:15,
    marginTop:5,
    color:'green'
  },
  foodName:{
    marginTop:0,
    marginLeft:25,
    fontWeight:"bold",
    color:'white',
    fontSize:25
    },
  address:{
    marginTop:3,
    marginLeft:25,
    color:'white',
    fontSize:17
    },
  avalTill:{
    marginTop:3,
    marginLeft:25,
    color:'green',
    fontSize:12
    },
  dateTime:{
    marginTop:3,
    marginLeft:25,
    color:'white',
    fontSize:14
    },
  deleteBtn:{
    marginLeft:15,
    marginTop:2,
    color:'white',
  },
  deleteOpacity:{
    borderColor:'green',
    borderWidth: 2,
    borderRadius:20,
    width:120,
    height:30,
    marginLeft:'65%',
    marginTop:0,
    marginBottom:50
  },


});