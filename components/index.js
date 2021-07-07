import React from 'react';
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {View} from 'react-native'
const AppIcon = ({name,color,background,size}) => {
    return (
        <View style={{
            backgroundColor:background,
            height:size,
            width:size,
            borderRadius:size/2,
            alignItems:'center',
            justifyContent:"center"
        }}>
            <MaterialCommunityIcons name={name} color={color} size={size*0.75}/>
        </View>

    );
};

export default AppIcon;