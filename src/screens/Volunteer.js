import React, { useRef, useState, useEffect } from 'react'
import { View, Text,ScrollView, Image,TouchableOpacity, StyleSheet } from 'react-native'
import firebase from 'firebase/compat'

import {auth} from "../firebase/config"
// import AddCircleIcon from '@mui/icons-material/AddCircle';


const Volunteer = ({navigation}) => {

  // const [User, setUser] = useState('')
 

const [foods,setFoods] = useState([]);

    useEffect(() => {
        firebase.firestore()
        .collection("posts")
        .onSnapshot(snapshot=>(
          // console.log(snapshot.docs.map((doc) => doc.data()))
          setFoods(snapshot.docs.map((doc)=>(
            {
              data:doc.data()
                // id: doc.id,
                // date:doc.date,
                // food: doc.food,
                // address:doc.address
            }
           
          )))
        ))       
        // console.log(foods);
        // console.log(auth.currentUser.displayName );
    },[])


const ShowData = ({name,address, food, date,time}) =>{
  // console.log(date.toDateString());
  // var myDate = new Date(date*1000);
  // console.log(name);

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

          <TouchableOpacity
              style={styles.chatOpacity}
              onPress={()=>{navigation.navigate('Chat')}}
            >
              <Text style={styles.chatBtn}> Chat Now </Text>
          </TouchableOpacity>
      </View>
    </View>
  )
}
    



  return (
    <View style={styles.pageContent}>
    <Text style={styles.topHeading} >
                  Hii
                <Text style={{ color:'#1d9b54' }}> {auth.currentUser.displayName}! </Text>
            
            </Text>
            <Text style={styles.foodAval}>Foods Avaliable </Text>

        <ScrollView>

        {/* console.log(new Date()) */}
            {foods.map(({data}) =>{

              if(data.date.toDate().getTime() > new Date().getTime()){
                            
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
              {/* var time = hours + " "+min */}
              {/* console.log(cmpDate) */}
              return (
                  <View>
                    <ShowData name={data.name} address={data.address} food={data.food} date={cmpDate} time={time}/>
                  </View>
              )

              }
            }
            )}
        </ScrollView>

    </View>

    
  )
}

export default Volunteer


const styles = StyleSheet.create({
  image:{
    borderRadius:20,
    height:350,
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
    marginLeft:15,
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
  chatBtn:{
    marginLeft:7,
    marginTop:2,
    color:'white',
  },
  chatOpacity:{
    borderColor:'green',
    borderWidth: 2,
    borderRadius:10,
    width:90,
    height:30,
    marginLeft:'38%',
    marginTop:20,
    marginBottom:50
  },
  pageContent:{
    flex: 1,
    marginTop:20,
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    backgroundColor: '#350A0A'
  },

  topHeading:{
    color: "#F8F8FF",
    fontSize: 40,
    marginTop: '5%',
    marginBottom: '2%',
    marginRight: '3%',
    marginLeft: '3%'},
  foodAval:{
    color: "#F8F8FF",
    fontSize: 40,
    marginTop: '1%',
    marginBottom: '2%',
    marginRight: '3%',
    marginLeft: '3%',
  }


});