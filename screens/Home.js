import React, { useState, useEffect } from 'react';
import { Alert, Modal, Pressable, Button, Text, TextInput, Image, View, StyleSheet,  SafeAreaView, FlatList } from 'react-native';
import { FAB } from 'react-native-paper';
import Login from '../components/LoginComponent';
import AddProducts from '../components/AddProducts';
import Images from "../constants/Images";
import { getKeyFromAsyncStorage, saveKeyToAsyncStorage, } from "../utils/storage";
import {getProducts} from '../api/products';
import * as URL from "../constants/URL";

export const HomeScreen = ({ navigation, route }) => {
    const [dataSource, setDataSource] = useState([]);
    const [loginModalVisible, setLoginModalVisible] = useState(false);
    const [productModalVisible, setProductModalVisible] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    useEffect(() => {
        getKeyFromAsyncStorage("isLoggedIn").then((value) => {
            if (value === 'false' || value == null) {
                setIsLoggedIn(false);
            }else{
                setIsLoggedIn(true);
            }
        });
        _reflesh();
    }, [])
    const changeLoginState =(value)=>{
        setLoginModalVisible(value)
    }
    const changeProductState =(value)=>{
        setProductModalVisible(value)
        _reflesh();
    }
    const _reflesh = () =>{
        getProducts(URL.HOST, (error, data)=>{
            if(error) console.log("Something went wrong! Try again.")
            else if('message' in data) console.log(data.message)
            else {
                setDataSource(data);
            };
        });
    }
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={dataSource}
                renderItem={({ item }) => (
                <View style={styles.item}>
                    <Image style={styles.imageThumbnail} source={{ uri: URL.HOST + '/images/' + item.image }} />
                    <Text numberOfLines={5} style={styles.itemName} onPress={() => navigation.navigate("Details",{"item": item})}>{item.pName}</Text>
                    <Text numberOfLines={5} style={styles.itemName}>{item.currency}: {item.price}</Text>
                </View>
                )}
                //Setting the number of column
                numColumns={2}
                keyExtractor={(item, index) => index}
            />
            {
            !isLoggedIn ?
            <FAB
                style={styles.fab}
                small
                label="Login"
                icon={Images.login}
                onPress={() => setLoginModalVisible(true)} 

            /> :
            <FAB
                style={styles.fab}
                icon={Images.add}
                onPress={() => setProductModalVisible(true)}
            />
            }
            <Login navigation={navigation} visible={loginModalVisible} callback={changeLoginState} />
            <AddProducts navigation={navigation} visible={productModalVisible} callback={changeProductState} />
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#d0e1fb',
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 120,
    },
    item: {
        flex: 1,
        flexDirection: 'column',
        margin: 1,
        borderWidth: 1,
        backgroundColor: '#ffffff',
        borderColor: 'rgba(158, 150, 150, .1)',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        padding: 15,
        margin: 10,
        shadowColor: "#0e4194",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
        height: 1,
        width: 1
        }
    },
    itemName: {
        color: "#0e4194",
        textAlign: "center",
    },
    fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#0e4194',
  },
});
