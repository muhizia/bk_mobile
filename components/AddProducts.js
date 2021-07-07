import React, { useState, useEffect } from 'react';
import {View, Modal, Image, TextInput, Text, Button, Pressable, StyleSheet} from 'react-native'
import {addProductAPI} from '../api/products';
import * as URL from "../constants/URL";
import Images from "../constants/Images";
import { getKeyFromAsyncStorage, saveKeyToAsyncStorage, } from "../utils/storage";
import * as ImagePicker from 'expo-image-picker';

const AddProducts = ({navigation, visible, callback}) => {
    const [message, setMessage] = useState("");
    const [categoryID, setCategoryID] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [currency, setCurrency] = useState("");
    const [desc, setDesc] = useState("");
    const [manifactDate, setManifactDate] = useState("");
    const [image, setImage] = useState(null);
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        (async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        // console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
            setPhoto(result);
        }
    };
    const addProduct =()=>{
        getKeyFromAsyncStorage("userInfo").then((value) => {
            if (value == null) {
                alert("Please login");
            }else{
                let id = JSON.parse(value).id;
                addProductAPI(URL.HOST, id, categoryID, name, price, currency, desc, manifactDate, photo, (error, data)=>{
                    if(error) setMessage("Something went wrong! Try again.");
                    else if('message' in data) setMessage("Something went wrong! Try again."); //setMessage(data.message);
                    else {
                        _resetFields();
                        setMessage("Product inserted");
                    };
                })
            }
        });
    }
    const _resetFields=()=>{
        setName("");
        setPrice("");
        csetCurrency("");
        setDesc("");
        setManifactDate("");
    };
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
                    source={Images.basket}
                    />
                    <Button title="Pick an image" onPress={pickImage} />
                    {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
                    
                <TextInput
                    placeholder={'Category id'}
                    style={styles.input}
                    onChangeText={text => setCategoryID(text)}
                />
                <TextInput
                    placeholder={'Name'}
                    style={styles.input}
                    onChangeText={text => setName(text)}
                />
                <TextInput
                    placeholder={'Price'}
                    style={styles.input}
                    onChangeText={text => setPrice(text)}
                />

                <TextInput
                    placeholder={'Currency'}
                    style={styles.input}
                    onChangeText={text => setCurrency(text)}
                />

                <TextInput
                    placeholder={'Description'}
                    style={styles.input}
                    onChangeText={text => setDesc(text)}
                />

                <TextInput
                    placeholder={'Manifucture date'}
                    style={styles.input}
                    onChangeText={text => setManifactDate(text)}
                />
                <Pressable style={styles.button} onPress={()=>addProduct()}>
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

export default AddProducts;

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

});


// userID: req.body.userID,
//         categoryID: req.body.categoryID,
//         pName: req.body.pName,
//         price: req.body.price,
//         currency: req.body.currency,
//         description: req.body.description,
//         image: req.body.image,
//         manufactDate: req.body.manufactDate