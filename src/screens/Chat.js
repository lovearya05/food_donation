import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useCallback
} from "react";
import { 
    collection,
    addDoc,
    orderBy,
    query,
    onSnapshot,
    doc
 } from "firebase/firestore";
 import firebase from 'firebase/compat'
 import { signOut } from "firebase/auth";
 import { auth, database } from "../firebase/config";
 import { useNavigation } from "@react-navigation/native";
 import {AntDesign} from '@expo/vector-icons'
import { TouchableOpacity, Text,StyleSheet, View, ScrollView, Keyboard, KeyboardAvoidingView, TextInput } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import colors from '../assets/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default function Chat({route}){

    // console.log(route.params.id);

    // const [message, setMessage] = useState();
    // const [messages, setMessages] = useState([]);
    
    const [chats, setChats] = useState([]); 
    const [message, setMessage] = useState("") 
    const [messages, setMessages] = useState([])
    const navigation = useNavigation();



    
    async function sendChat(fieldId) { 
        Keyboard.dismiss(); 
        firebase.firestore().collection("chats").doc(route.params.id).collection(route.params.id) 
        .add({ 
        timestamp:firebase.firestore.FieldValue.serverTimestamp(), 
        message:message, 
        name:firebase.auth().currentUser.displayName, 
        email:firebase.auth().currentUser.email
        }) 
        setMessage("") 
    }

    // const getData = () =>{
    //     firebase.firestore()
    //     .collection("chats").doc(route.params.id)
    //     .onSnapshot(snapshot=>(
    //       // console.log(snapshot.docs.map((doc) => doc.data()))
    //       setMessages(snapshot.docs.map((doc)=>(
    //         {
    //             messages:doc.messages
    //         }
    //       )))
    //     )) 
    // }

    useLayoutEffect(() =>{ 
        const unsubcribe =  firebase.firestore().collection("chats") 
        .doc(route.params.id).collection(route.params.id) 
        .orderBy('timestamp').onSnapshot(snapshot => setMessages( 
          snapshot.docs.map((doc) =>({ 
            id:doc.id, 
            data:doc.data()
          })) 
        )) 
        return unsubcribe; 
      },[route])
   

    // useLayoutEffect(()=>{
    //     const collectionRef = collection(database, 'chats');
    //     const q = query(collectionRef, orderBy('createdAt', 'desc'))

    //     const unsubscribe = onSnapshot(q, snapshot=>{
    //         setMessages(
    //             snapshot.docs.map(doc=>({
    //                 _id: doc.id,
    //                 createdAt: doc.data().createdAt.toDate(),
    //                 text: doc.data().text,
    //                 user: doc.data().user
    //             }))
    //         )
    //     })
    //     return ()=> unsubscribe();
    // },[])

    // const onSend = useCallback((messages) =>{
    //     console.log(messages);
    //     const user = firebase.auth().currentUser.displayName
        
    //     firebase.firestore().collection('chats').doc(route.params.id).collection(route.params.id).add({
    //     name: user,
    //     messages:messages[0].text
    //     // message: messages,
    // }).then(()=>{
    //     // alert("ThankYou! Your Food is Added")    
    // })
    // },[])

    return(
        // <GiftedChat
        //     messages={messages}
        //     onSend={messages => onSend(messages)}
        //     user={{
        //         _id: auth?.currentUser?.email,
        //         avatar: 'https://i.pravtar.cc/300'
        //     }}
        //     messagesContainerStyle={{
        //         backgroundColor: '#fff'
        //     }}
        // />

        <KeyboardAvoidingView
     style={styles.container} 

     keyboardVerticalOffset={90} 
     > 
        <ScrollView > 
           <View style={{}}> 
           {messages.map(({id, data}) =>( 
             data.email  === firebase.auth().currentUser.email ? 
             ( 
              <View key={id} style={styles.reciever}> 
                  <Text  style={styles.recieverText}>{data.message}</Text> 
                  <Text style={{color:"white",fontSize:8, textAlign: 'right', marginRight:5 }}>{data.name}</Text>
              </View> 
             ) 
             : 
            ( 
            <View key={id} style={styles.sender}> 
              <Text  style={styles.senderText}>{data.message}</Text> 
            <Text style={{color:'#350A0A',fontSize:8}}>{data.name}</Text>
            </View> 
             ) 
         ))} 
           </View> 
        </ScrollView> 
        <View style={styles.footer}> 
          <TextInput placeholder='Type something..' value={message} onChangeText={text => setMessage(text)} style={styles.textInput} /> 
          <TouchableOpacity activeOpacity={0.5} onPress={sendChat}> 
          <MaterialCommunityIcons name="send" color={'#350A0A'} size={26} />
             {/* <Ionicons name="send" size={26} color="#7B77FF" />  */}
          </TouchableOpacity>    
        </View> 
     </KeyboardAvoidingView>
    )
}





const styles = StyleSheet.create({ 
    textInput:{ 
      bottom:0, 
      height:40, 
      flex:1, 
      marginRight:15, 
      borderColor:"transparent", 
      backgroundColor:"#FFF", 
      padding:10, 
      color:"black", 
      borderRadius:30 
   
    }, 
    footer:{ 
      flexDirection:"row", 
      padding:15, 
      width:"100%",  
      alignItems:"center" 
    }, 
    reciever:{ 
      padding:10, 
      backgroundColor:"#350A0A", 
      alignSelf:"flex-end", 
      borderTopRightRadius:15, 
      borderBottomEndRadius:15, 
      marginTop:5, 
      borderBottomLeftRadius:15, 
      marginRight:12, 
      marginBottom:5, 
      maxWidth:"80%", 
      position:"relative" 
    }, 
    recieverText:{ 
      color:"#EFEFEF", 
      fontSize:14, 
      fontWeight:"800", 
    }, 
    sender:{ 
      padding:10, 
      backgroundColor:"#FFF", 
      alignSelf:"flex-start", 
      borderTopLeftRadius:15, 
      borderBottomLeftRadius:15, 
      borderBottomRightRadius:15, 
      // borderRadius:20, 
      // margin:15, 
      marginBottom:5, 
      marginLeft:12, 
      maxWidth:"80%", 
      position:"relative" 
    }, 
    senderText:{ 
      color:"rgba(0,0,0,0.6)", 
      fontSize:14, 
      marginLeft:10, 
      fontWeight:"800", 
    }, 
    container:{ 
      flex:1,
      marginTop:35
    } 
  })