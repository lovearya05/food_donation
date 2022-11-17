import React, { useEffect, useState } from 'react'
import { View, Text,TextInput ,  Button, Platform, StyleSheet, TouchableOpacity, SafeAreaView, Alert, Image, ScrollView } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import theme from '../assets/GlobalStyles';
// import { launchImageLibrary } from 'react-native-image-picker';

import {getStorage, ref,uploadBytes,getDownloadURL } from "firebase/storage"

import * as ImagePicker from 'expo-image-picker';
import {firebase} from '../firebase/config'

const Donor = ({navigation}) => {
  
  const [date,setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  // const [text, setText] = useState('Empty');
  // const [Disabled, setDisabled] = useState(true);

  const [image, setImage] = useState(null);

  
  const [address, setAddress] = useState('')
  const [food, setFood] = useState('')



  // upload data to firebase
  const uploadData = () =>{
    const user = firebase.auth().currentUser;
    // console.log(user.email)
    firebase.firestore().collection('posts').add({
      
      name: user.displayName,
      address: address,
      food: food,
      date: date
  }).then(()=>{
    setFood("")
    alert("ThankYou! Your Food is Added")    
  })
  }
 

// Image Pick and Upload

const uploadImage = async ()=>{
  // setUploading(true);
  // const response = await fetch(image.uri)
  // const blob = await response.blob();
  // const filename = image.uri.subsubstring(image.uri.lastIndexOf('/'+1))
  // var ref = firebase.storage().ref().child(filename).put(blob)

  // try{
  //   await ref;
  // }catch(e){
  //   console.log(e);
  // }
  // setUploading(false);
  // Alert.alert(
  //   'Photo Uploaded..!!'
  // )
  // setImage(null)
}


  // useEffect(()=>{
  //   getPermissionAsync()
  // },[])


  // const getPermissionAsync = async () => {
  //   if (Platform.OS !== 'web') {
  //     const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  //     if (status !== 'granted') {
  //       alert('Sorry, we need camera roll permissions to make this work!');
  //     }
  //   }
  // };
  
  const ImgPicker = () => {



    const pickImage = async () => {
    }
    return(
        <View>
            <Text style={{color:'white'}}>hii!
              Love Arya
            </Text>
            <TouchableOpacity onPress={pickImage}>
              
              <Text style={styles.buttonText}> Pick an Image</Text>
            
            </TouchableOpacity>
              <View style={styles.imageContainer}>

                {/* {image && <Image source={{uri:image}} style={{width:300, height:300}}/> } */}
                
                {image && <Image
                  source={{ uri: image }}
                  style={{ width: '100%', height: 200, marginTop: '6%', marginTop: 30 }} />}

                {/* <Image
                  source={{ uri: image }}
                  style={{ width: '100%', height: 200, marginTop: '6%', marginTop: 30 }} /> */}

                <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
              
                <Text style={styles.buttonText} >
                  upload Image
                </Text>
              
                </TouchableOpacity>
              </View>
        </View>
    )

  }




  // DATE AND TIME PICKER
  const TimePicker = () => {


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
        // console.log("Change Date Pressed!")
    };

    const showTimepicker = () => {
        showMode('time');
        // console.log("Change Time Pressed!")
    };

      
  return (
    <View>
      <View style={styles.timePicker}>
          <View>
              <Button onPress={showDatepicker} title="Change Date" />
          </View>

          <View>
              <Button onPress={showTimepicker} title="Change Time" />
          </View>

      </View>

      {show && (
          <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={false}
              display="default"
              minimumDate={new Date()}
              onChange={onChange}
          />
      )}

      <Text style={styles.dateOfPic}>Date of Pickup</Text>

      <TextInput
          placeholder={date.toDateString()}
          editable={false}
          label=" Date of Pickup"
          style={styles.date}              
          labelStyle={{ fontFamily: 'ProductSans', }}
          placeholderTextColor= '#efefef'
          // onChangeText={(val) => { handlePickupWhere(val) }}
      />
      <Text style={styles.pickup}>Time of Pickup</Text>
      
      <TextInput
          placeholder={date.toLocaleTimeString().replace(/:\d+ /, ' ')}
          editable={false}
          label=" Time of Pickup"
          style={styles.date}              
          labelStyle={{ fontFamily: 'ProductSans', }}
          placeholderTextColor= '#efefef'
          // onChangeText={(val) => { handlePickupWhere(val) }}
      />

    </View>
  );};


  return ( 

    <ScrollView style={styles.scrollView}>
      <View style={{
      borderTopLeftRadius:10,
      borderTopRightRadius:10,
      flex: 1,
      backgroundColor: '#350A0A'
      
      }}>
        <View style={styles.mainCont}>

      <Text style={theme.headerText}>Donate Food ♨ </Text>
        <Text style={styles.picUpWhere}>Pickup Where?</Text>

        <TextInput
            placeholder='221 Baker Street..'
            label=" Pickup Where?"
            style={styles.addresTxt}              
            labelStyle={{ fontFamily: 'ProductSans', }}
            placeholderTextColor= '#efefef'
            onChangeText={(add) => setAddress(add)}
        />

        <Text style={styles.foodItm}>
          Food Items
        </Text>


        <TextInput
            placeholder='Rice , Lentils , Daal'
            label=" Food Item(s)"
            style={styles.foodtxt}              
            labelStyle={{ fontFamily: 'ProductSans', }}
            placeholderTextColor= '#efefef'
            onChangeText={(fd) => setFood(fd)}
        />

      <View style={{ marginTop:30 }}>

        <TimePicker />
        {/* <ImgPicker/> */}

      </View>

      <TouchableOpacity
              style={styles.uploadOpacity}
              onPress={uploadData}
            >
              <Text style={styles.uploadBtn}> Upload Food </Text>
      </TouchableOpacity>

      {/* <Button style={styles.goButton} title="Go!" onPress={uploadData} />  */}

    </View>      
  </View>
    </ScrollView>
    
    
    
    )
  }

  export default Donor
  
  const styles = StyleSheet.create({
    uploadBtn:{
      marginLeft:38,
      marginTop:11,
      color:'white',
    },
    uploadOpacity:{
      marginTop:45,
      borderColor:'green',
      borderWidth: 2,
      borderRadius:10,
      width:170,
      height:50,
      marginLeft:'28%'
    },
    uploadButton:{
      marginTop:10,
      color:'red',
      // backgroundColor:'red'
    },
    scrollView: {
      backgroundColor: '#350A0A',
      marginTop:20,
      
    },
    timePicker:{ 
      display: "flex",
      marginTop:10,
      flexDirection: "row",
      justifyContent: "space-around",
      marginBottom: 40
    },
    picUpWhere:{
      color:'#efefef',
      marginTop:10,
      marginBottom:10,
      fontSize:20,
      fontWeight:'bold'
    },
    foodItm:{
      fontSize:20,
      marginTop:10,
      color:'#efefef',
      fontWeight:'bold', 
      marginTop:10
    },
    dateOfPic:{
      color:'#efefef',
      fontWeight:'bold',
      fontSize:20
    },
    pickup:{
      color:'#efefef',
      marginTop:12,
      fontSize:20,
      fontWeight:'bold'
    },
    date:{
      borderBottomColor:'white',
      fontSize:15,
      color:'white',
      paddingBottom:1,
      marginTop:4,
      paddingBottom:4,
      borderBottomWidth:2,
      marginBottom:20
    },
    mainCont:{
      marginLeft: '2%',
      marginRight: '2%',
      flex: 1,
      center: {
        justifyContent: 'center',
      }
    },
    addresTxt:{
    borderBottomColor:'white',
    fontSize:15,
    color:'white',
    paddingBottom:1,
    marginTop:4,
    paddingBottom:4,
    borderBottomWidth:2
    },
    foodtxt:{
    borderBottomColor:'white',
    fontSize:15,
    color:'white',
    paddingBottom:1,
    marginTop:4,
    paddingBottom:4,
    borderBottomWidth:2
    },
    container:{
      flex:1,
      alignItems:'center',
      backgroundColor:'#000',
      justifyContent:'center'
    },
    // selectButton: {
    //   borderRadius:5,
    //   width:150,
    //   height:50,
    //   backgroundColor:'red',
    //   alignItems:'center',
    //   justifyContent:'center'

    // },
    buttonText:{
      color:'white',
      fontSize:18,
      fontWeight:'bold'
    },
    imageContainer:{
      marginTop:5,
      marginBottom:5,
      alignItems:'center'
    }
  })

  
  
  
  // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

  //   <Text style={{ fontSize: 20, fontWeight: '700' }}>{text}</Text>
  //   <View style={{margin:20}}>
  //     <Button title='DatePicker' onPress={()=>showMode('date')}/>
  //   </View>
  //   <View style={{margin:20}}>
  //     <Button title='TimePicker' onPress={()=>showMode('time')}/>
  //   </View>

  //   {show && (
  //   <DateTimePicker
  //   testID='dateTimePicker'
  //   value = {date}
  //   mode = {mode}
  //   is24Hour={false}
  //   display='default'
  //   onChange={onChange}/>
  // )}
  // </View>

      //   try {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //       mediaTypes: ImagePicker.MediaTypeOptions.All,
    //       allowsEditing: true,
    //       aspect: [16, 9],
    //       quality: 1,
    //     });
    //     // if (result.assets[0] == Activity.RESULT_OK) {
    //     //   setImage({ image: result.assets[0].uri });
    //     //   callback(image);
    //     // }
    //     console.log(result);
    //   } catch (E) {
    //     console.log(E);
    //   }
      
    
  // = async () => { 

  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing:true,
  //     aspect:[4,3],
  //     quality:1,
  //   });
    
  //   console.log(result);
  //   if (!result.canceled) {
  //     setImage(result.assets[0].uri);
  //   }
     
    // if (!result.cancelled) {     
      // const storage = getStorage(); 
      // const imageRef =  ref(storage, `images/${Date.now()}.jpg`)  
      // const img = await fetch(result.assets[0].uri); 
      // const bytes = await img.blob(); 
 
      // const uploadTask =  await uploadBytes(imageRef,bytes).then(()=>{ 
        // setImage(result.assets[0].uri)        
         
        // console.log(imageRef.fullPath) 
      // }).catch(() =>{ 
        // console.log(error.message); 
      // }) 
      // getDownloadURL(imageRef) 
      //  .then((url) =>{ 
        // console.log(url); 
        // const user = db.collection("users") 
        // const userRef = user.doc(auth.currentUser.uid) 
        // userRef.update({ 
        //   userImage:url 
        // }) 
        // userRef.update({ 
          // userImage:url 
        // }) 
        // .then(() =>{ 
            // Alert.alert("image uploaded") 
        // }) 
      //  }
      //  ) 
      
    // }   
  // }

 
  // const pickImage = async () =>{

  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditig: true,
  //     aspect: [8,8],
  //     quality:1,
  //   });

  //   console.log(result);

    

  //   // const source = {uri: result.uri};
  //   const source = {uri: result.assets[0].uri};
  //   console.log(source);
  //   setImage(source);
  //   console.log('picked')
  //   // uploadImage
  // }

    // const [uploading, setUploading] = useState(false);

  // useEffect(()=>{
  //   (async()=>{
  //     const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   })();

  // },[]);
  // const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  