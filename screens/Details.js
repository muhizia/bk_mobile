import React, { useState, useEffect } from 'react';
import {View, Modal, Image, TextInput, Text, Button, Pressable, StyleSheet} from 'react-native'
import * as URL from "../constants/URL";
import Images from "../constants/Images";
import { getKeyFromAsyncStorage, saveKeyToAsyncStorage, } from "../utils/storage";

export const Details = ({navigation, route}) => {
    const [message, setMessage] = useState("");
    const [categoryID, setCategoryID] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [currency, setCurrency] = useState("");
    const [desc, setDesc] = useState("");
    const [manifactDate, setManifactDate] = useState("");
    const [image, setImage] = useState(null);
    const { item } = route.params;
    
    return (
       <View style={styles.loginContainer}>
        <Image
            style={styles.paymentImage}
            source={Images.basket}
            />
        <Text style={styles.input}>{item.pName}</Text>
        <Text style={styles.input}>{item.categoryID}</Text>
        <Text style={styles.input}>{item.currency}: {item.price}</Text>
        <Text style={[styles.input,styles.desc]}>{item.description}</Text>
        <Text style={styles.input}>{item.manufactDate}</Text>
    </View>
    );
};

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
      marginBottom: 30,
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
  desc:{
      height: 150,
  }

});