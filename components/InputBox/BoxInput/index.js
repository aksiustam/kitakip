import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity, } from 'react-native'
import { Fontisto } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';

const Box = (props) => {

    const { onClick } = props

    return (
        <TouchableOpacity style={styles.container} onPress={text => onClick(!text)}>
            <View>
                <Fontisto name="search" size={24} color="white" />
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        width: 60,
        height: 60,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.light.tint,
        position: "absolute",
        bottom: 20,
        right: 10,
    }
})

export default Box;