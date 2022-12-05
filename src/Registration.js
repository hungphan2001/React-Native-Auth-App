import { View, Text,TextInput,TouchableOpacity,StyleSheet } from 'react-native';
import { useState } from 'react';
import {firebase } from '../config';
import { useNavigation } from '@react-navigation/native';
import React from 'react';


const Registration = () => {
  const navigation = useNavigation();
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [firstName,setFirstName] = useState();
  const [lastName,setLastName] = useState();

  registrationUser = async(email,password,lastName,firstName) =>{
    await firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(()=>{
      firebase.auth().currentUser.sendEmailVerification({
        handleCodeInApp:true,
        url:'test-auth-edcfd.firebaseapp.com',
      })
      .then(() =>{
        alert('Veritifiation email sent');
      }).catch((error) =>{
        alert(error.message)
      })
      .then(()=>{
        firebase.firestore().collection('user')
        .doc(firebase.auth().currentUser.uid)
        .set({
          firstName,
          lastName,
          email,
        })
      })
      .catch((error)=>{
        alert(error.message)
      })
    })
    .catch((error)=>{
      alert(error.message)
    })
  }
  return(
    <View style={styles.container}>
      <Text style={}></Text>
    </View>
  )
}

export default Registration

const styles =StyleSheet.create({
  container :{
    flex :1,
    alignItems:'center',
    margintop:100,
  }
})