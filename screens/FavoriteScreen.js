import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View, FlatList, TouchableOpacity, Image, Linking } from 'react-native'
import _ from 'lodash'
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native'
import NumberFormat from 'react-number-format';
import Modal from 'react-native-modal';
import Colors from '../constants/Colors';
//Dummy data 
//Dummy list https://reactnativemaster.com/sortable-react-native-table-example/
//List to AsyncStorage
//
/*
    "id": "c777af03af25448eb615988d60185636",
    "name": "Hayvan Çiftliği",
    "writer": "George Orwell",
    "pub": "Can Yayınları",
    "page": "152",
    "money": "6.00 TL",
    "image": "https://cdnw.kitabinabak.com/Kibak/Site/P/ad/a9/04d0ada5614b6dba2a5a3f643908T.webp",
    "read": "false",
    "star": "6",
    "date": "02/02/21"
*/


const FavoriteScreen = () => {
    const [focus, setFocus] = useState([]);
    const [datajson, setdatajson] = useState([]);
    const [setjson, setSetjson] = useState();
    const fetchUsers = async () => {
        await AsyncStorage.getItem('Fav').then(
            (value) => { setdatajson(JSON.parse(value)) }
        );
    };

    // UPDATE
    const isFocused = useIsFocused()
    useEffect(() => {
        fetchUsers()
    }, [isFocused])
    const [visible, setVisible] = useState(false);

    const addLib = (id) => {
        console.log(id)
        setVisible(false)
    }
    const deleteJson = (id) => {
        var newArray = datajson.filter(data => data.id !== id);
        setdatajson(newArray)
        AsyncStorage.setItem("Fav", JSON.stringify(newArray));
        setVisible(false)
    }
    const setmodal = (item) => {
        setVisible(true)
        setFocus(item)
    }
    const addUrl = (link) => {
        Linking.canOpenURL(link).then(supported => {
            if (supported) {
                Linking.openURL(link);
            } else {
                console.log("Don't know how to open URI: " + link);
            }
        });
    }
    return (

        <View style={styles.container}>
            {   !visible ? null : <Modal
                backdropOpacity={0.35}
                style={{ margin: 0 }}
                isVisible={visible}
                statusBarTranslucent
                onBackdropPress={() => { setVisible(false) }} >
                <View style={styles.modelContainer}>
                    <View style={styles.top}>
                        <TouchableOpacity onPress={() => addLib(focus.id)} style={styles.box}>
                            <AntDesign name="book" size={30} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => addUrl(focus.link)} >
                            <Image style={styles.image} source={{ uri: focus.siteimg }} resizeMode="contain" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => deleteJson(focus.id)} style={styles.box}>
                            <FontAwesome name="trash-o" size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            }

            <FlatList
                data={datajson}
                style={{ width: "90%" }}
                keyExtractor={(item, index) => index + ""}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity onPress={hey => setmodal(item)}>
                            <View style={{ ...styles.container, backgroundColor: index % 2 == 1 ? "#F0FBFC" : "white" }}>
                                <View style={styles.leftContainer}>
                                    <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                                    <Text numberOfLines={1} style={styles.text}>{item.yazar}</Text>
                                </View>
                                <View style={styles.rightContainer}>
                                    <Text style={styles.text}>{item.site}</Text>
                                    <NumberFormat
                                        value={item.money}
                                        displayType={'text'}
                                        decimalScale={2}
                                        fixedDecimalScale={true}
                                        thousandSeparator={true}
                                        suffix={' TL'}
                                        renderText={value => <Text style={{ fontSize: 16, }}>{value}</Text>} />

                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    modelContainer: {
        justifyContent: "space-between",
        flexDirection: "row",
        //backgroundColor: "#505050",
        backgroundColor: "#2F4F4F",
        position: "relative",
        alignSelf: "center",
        fontWeight: "bold",
        borderRadius: 25,

    },
    top: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 25,

    },
    box: {

        width: 50,
        height: 50,
        backgroundColor: Colors.light.tint,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 10,

    },
    image: {
        width: 150,
        height: 50,

    },
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        borderBottomWidth: 0.5,
    },
    leftContainer: {
        flexDirection: "column",
        flex: 1,
        justifyContent: "space-around",
        alignItems: "flex-start",
    },
    rightContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
    text: {
        padding: 4,
        fontSize: 15,
    }

});

export default FavoriteScreen;