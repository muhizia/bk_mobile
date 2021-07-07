import React, { useEffect } from 'react';
import { Alert, Button, TextInput, Image, View, StyleSheet } from 'react-native';
import Images from '../constants/Images';


export const Splash = ({navigation}) => {
    useEffect(() => {
        let intervalId = setInterval(() => {
            navigation.navigate('Home')
            clearInterval(intervalId)
        }, 4000);
    }, [])
    return (
      <View style={styles.container}>
        <Image
            style={styles.paymentImage}
            source={Images.logo}
        />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0e4194'
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  paymentImage: {

  }
});