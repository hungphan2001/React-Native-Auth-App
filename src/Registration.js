import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useState} from 'react';
import {firebase} from '../config';
import {useNavigation} from '@react-navigation/native';
import React from 'react';

const Registration = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  registrationUser = async (email, password, lastName, firstName) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .auth()
          .currentUser.sendEmailVerification({
            handleCodeInApp: true,
            url: 'test-auth-edcfd.firebaseapp.com',
          })
          .then(() => {
            alert('Veritifiation email sent');
          })
          .catch(error => {
            alert(error.message);
          })
          .then(() => {
            firebase
              .firestore()
              .collection('user')
              .doc(firebase.auth().currentUser.uid)
              .set({
                firstName,
                lastName,
                email,
              });
          })
          .catch(error => {
            alert(error.message);
          });
      })
      .catch(error => {
        alert(error.message);
      });
  };;
  return  (
    <View style={styles.container}>
      <Text style={{fontWeight: 'bold', fontSize: 23}}>Register Here !</Text>
      <View style={{marginTop: 40}}>
        <TextInput
          style={styles.TextInput}
          placeholder="First name"
          onChangeText={firstName => setFirstName(firstName)}
          autoCorrect={false}></TextInput>
        <TextInput
          style={styles.TextInput}
          placeholder="Last Name"
          onChangeText={lastName => setLastName(lastName)}
          autoCorrect={false}></TextInput>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          onChangeText={email => setEmail(email)}
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType="email-address"></TextInput>
        <TextInput
        style ={styles.TextInput}
        placeholder="Password"
        onChangeText={password => setPassword(password)}
        autoCorrect={false}
        autoCapitalize='none'
        secureTextEntry={true}></TextInput>
      </View>
      <TouchableOpacity
      onPress={() => registrationUser(email,password,firstName,lastName)}
      style={styles.button}>
        <Text style={{fontWeight:'bold',fontSize:20}}>Register</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Registration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100,
  },
  TextInput: {
    paddingTop: 20,
    paddingBottom: 10,
    width: 400,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    marginTop: 50,
    height: 70,
    width: 250,
    backgroundColor: '#026efd',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
});