import React from 'react'
import { Text, StyleSheet, View, TextInput, TouchableOpacity, ImagePropTypes } from 'react-native'
import { Fontisto, MaterialCommunityIcons, Entypo, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';


const InputBox = (props) => {

    const { onPress, buttonText } = props;


    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <TextInput
                    placeholder={"Input here!"}
                    style={styles.textInput}
                    multiline={false}
                    value={buttonText}
                    autoCorrect={false}
                    underlineColorAndroid="transparent"
                    InputProps={{ disableUnderline: true }}
                    onChangeText={text => onPress(text)} {...props} />
            </View>
        </View>
    )

}


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        margin: 20,
    },
    mainContainer: {
        flexDirection: "row",
        backgroundColor: "white",
        padding: 10,
        borderRadius: 25,
        marginRight: 10,
        flex: 1,
        alignItems: "center",
    },
    buttonContainer: {
        backgroundColor: Colors.light.tint,
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    textInput: {
        borderColor: "transparent",
        flex: 1,
        marginHorizontal: 10,
    },

})

export default InputBox;