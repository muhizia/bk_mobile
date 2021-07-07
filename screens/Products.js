import React, { useState } from 'react';
import { Alert, Button, Text, TextInput, Image, View, StyleSheet,  SafeAreaView, FlatList } from 'react-native';
import { FAB } from 'react-native-paper';
import Images from '../constants/Images';

export const Products = ({ navigation, route }) => {
    const [dataSource, setDataSource] = useState([]);

    useState(() => {
        let items = Array.apply(null, Array(60)).map((v, i) => {
        return { id: i, text: "new image", src: 'http://placehold.it/200x200?text=' + (i + 1) };
        });
        setDataSource(items);
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={dataSource}
                renderItem={({ item }) => (
                <View style={styles.item}>
                    <Image style={styles.imageThumbnail} source={{ uri: item.src }} />
                    <Text numberOfLines={5} style={styles.itemName}>{item.text}</Text>
                </View>
                )}
                //Setting the number of column
                numColumns={2}
                keyExtractor={(item, index) => index}
            />
            <FAB
                style={styles.fab}
                icon={Images.add}
                onPress={() => navigation.navigate('Login')}
            />
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
