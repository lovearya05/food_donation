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
 import { signOut } from "firebase/auth";
 import { auth, database } from "../firebase/config";
 import { useNavigation } from "@react-navigation/native";
 import {AntDesign} from '@expo/vector-icons'
import { TouchableOpacity, Text } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import colors from '../assets/colors';


export default function Chat(){
    const [messages, setMessages] = useState([]);
    const navigation = useNavigation();

    const onSignOut = async ()=>{
        signOut(auth).catch(error => alert(error));
    }

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight: () =>(
                <TouchableOpacity
                    style = {{
                        marginRight:10
                    }}
                    onPress={onSignOut}
                >
                <AntDesign 
                name="logout"
                size={24} 
                color={colors.grey}
                style={{marginRight: 10}}/>

                </TouchableOpacity>
            )
        })
    },[navigation]);

    useLayoutEffect(()=>{
        const collectionRef = collection(database, 'chats');
        const q = query(collectionRef, orderBy('createdAt', 'desc'))

        const unsubscribe = onSnapshot(q, snapshot=>{
            setMessages(
                snapshot.docs.map(doc=>({
                    _id: doc.id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: doc.data().user
                }))
            )
        })
        return ()=> unsubscribe();
    },[])

    const onSend = useCallback((messages = []) =>{
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))

        const {_id, createdAt, text, user} = messages[0];

        addDoc(collection(database, 'chats'),{
            _id,
            createdAt,
            text,
            user
        })
    },[])

    return(
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: auth?.currentUser?.email,
                avatar: 'https://i.pravtar.cc/300'
            }}
            messagesContainerStyle={{
                backgroundColor: '#fff'
            }}
        />
    )
}