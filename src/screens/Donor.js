import React, { useState } from 'react'
import { View, Text,ScrollView,TextInput , StyleSheet, Button,ThemeProvider, Platform } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import theme from '../assets/GlobalStyles';

const Donor = ({navigation}) => {
  
  const [date,setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('Empty');
  const [Disabled, setDisabled] = useState(true);
  const [Image, setImage] = useState('');

  const onChange = (event, selectedDate) =>{
    const currentDate = selectedDate || date;
    setShow(Platform.OS ==='android');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth()+1) + '/' + tempDate.getFullYear();
    let fTime = 'Hours: ' + tempDate.getHours()+ ' | Minutes: ' + tempDate.getMinutes();
    setText(fDate + '\n' + fTime)

    // console.log(fDate + '(' + fTime + ')')
  }

  const showMode = (currentMode) =>{
    setShow(true);
    setMode(currentMode);

  }

  const handleImage = (dataFromChild) => {
    setImage(dataFromChild);
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
        console.log("Change Date Pressed!")
    };

    const showTimepicker = () => {
        showMode('time');
        console.log("Change Time Pressed!")
    };

      
  return (
    <View>
      <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", marginBottom: '7%' }}>
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

      <Text style={{color:'#efefef',fontWeight:'bold'}}>Date of Pickup</Text>

      <TextInput
          placeholder={date.toDateString()}
          editable={false}
          label=" Date of Pickup"

          style={{borderBottomColor:'white',
          color:'white',
          paddingBottom:1,
          marginTop:4,
          paddingBottom:4,
          borderBottomWidth:2
            }}              
          labelStyle={{ fontFamily: 'ProductSans', }}
          placeholderTextColor= '#efefef'
          onChangeText={(val) => { handlePickupWhere(val) }}
      />
      <Text style={{
      color:'#efefef',
      marginTop:8,
      fontWeight:'bold'}}>Time of Pickup</Text>
      
      <TextInput
          placeholder={date.toLocaleTimeString().replace(/:\d+ /, ' ')}
          editable={false}
          label=" Time of Pickup"

          style={{borderBottomColor:'white',
          color:'white',
          paddingBottom:1,
          marginTop:4,
          paddingBottom:4,
          borderBottomWidth:2
            }}              
          labelStyle={{ fontFamily: 'ProductSans', }}
          placeholderTextColor= '#efefef'
          onChangeText={(val) => { handlePickupWhere(val) }}
      />

    </View>
  );};

  return ( 
    
    <View style={{
      flex: 1,
      backgroundColor: 'black',}}>
        <View style={{
          marginLeft: '2%',
          marginRight: '2%',
          flex: 1,
          center: {
          justifyContent: 'center',
      },}}>

      <Text style={theme.headerText}>Donate Food ♨ </Text>
        <Text style={{color:'#efefef',fontWeight:'bold'}}>Pickup Where?</Text>
        <TextInput
            placeholder='221 Baker Street..'
            label=" Pickup Where?"

            style={{borderBottomColor:'white',
            color:'white',
            paddingBottom:1,
            marginTop:4,
            paddingBottom:4,
            borderBottomWidth:2
              }}              
            labelStyle={{ fontFamily: 'ProductSans', }}
            placeholderTextColor= '#efefef'
            onChangeText={(val) => { handlePickupWhere(val) }}
        />

        <Text style={{
          color:'#efefef',
          fontWeight:'bold', 
          marginTop:8
        }}>
          Food Items 
        </Text>


        <TextInput
            placeholder='Rice , Lentils , Daal'
            label=" Food Item(s)"

            style={{borderBottomColor:'white',
            color:'white',
            paddingBottom:1,
            marginTop:4,
            paddingBottom:4,
            borderBottomWidth:2
              }}              
            labelStyle={{ fontFamily: 'ProductSans', }}
            placeholderTextColor= '#efefef'
            // onChangeText={(val) => { handleFoodItems(val) }}
        />

        <View style={{
          marginTop:25
        }}>

        <TimePicker />
        <ImagePicker callback={handleImage} />
      </View>
      <Button title="Go!" disabled={Disabled}  /> 
    </View>      
  </View>
)}

  export default Donor
  
  
  
  
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

  