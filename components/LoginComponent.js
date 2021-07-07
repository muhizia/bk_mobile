import React, { useState } from 'react';
import {View, Modal, Image, TextInput, Text, Pressable, StyleSheet} from 'react-native'
import {loginAPI} from '../api/user';
import * as URL from "../constants/URL";
import Images from "../constants/Images";
import { getKeyFromAsyncStorage, saveKeyToAsyncStorage, } from "../utils/storage";

const Login = ({navigation, visible, callback}) => {
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login =()=>{
        loginAPI(URL.HOST, username, password, (error, data)=>{
            if(error) setMessage("Something went wrong! Try again.")
            else if('message' in data) setMessage(data.message)
            else {
                saveKeyToAsyncStorage("isLoggedIn", "true");
                saveKeyToAsyncStorage("userInfo", JSON.stringify(data));
                callback(false)
                navigation.navigate("Products") 
            };
        })
    }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                callback(!visible);
            }}
        >
            <View style={styles.loginContainer}>
            
                <Image
                style={styles.paymentImage}
                source={Images.logoLandscape}
                />
                <TextInput
                    placeholder={'Username'}
                    style={styles.input}
                    onChangeText={text => setUsername(text)}
                />
                <TextInput
                    placeholder={'Password'}
                    secureTextEntry={true}
                    style={styles.input}
                    onChangeText={text => setPassword(text)}
                />
                <Pressable style={styles.button} onPress={()=>login()}>
                    <Text style={styles.text}>Login</Text>
                </Pressable>
                <Text>{message}</Text>
                <View>
                    <Text onPress={() => callback(false)} style={{marginTop: 100, color: 'red'}}>Cancel</Text>
                </View>
            </View>
        </Modal>

    );
};

export default Login;

const styles = StyleSheet.create({
loginContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  input: {
    width: 290,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: '#0e4194',
    marginBottom: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  paymentImage:{
      width: 300,
      height: 150,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#FFFFFF',
    width: 290,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: '#0e4194',
    marginBottom: 10,
    backgroundColor: '#0e4194',
    textAlign: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },

});