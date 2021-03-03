import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { RadioButton, Checkbox } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';

import { useNavigation } from '@react-navigation/native'
import Colors from '../../constants/Colors';

const NavFilter = () => {

    const [bool, setBool] = useState(true);
    const [setjson, setSetjson] = useState();
    const navigation = useNavigation();
    const SetGet = async () => {
        await AsyncStorage.getItem('Set').then(
            (value) => {
                if (value === null) {
                    const undata = { radio: "name", checked: { read: true, unread: true, finish: true } }
                    setSetjson(undata);
                }
                else { setSetjson(JSON.parse(value)); }

            })
    };
    const SetSet = async () => {
        await AsyncStorage.setItem('Set', JSON.stringify(setjson));
    };
    const setChecked = (e) => {
        switch (e) {
            case "read":
                var bucket = setjson
                bucket.checked.read = !bucket.checked.read
                setSetjson(bucket)
                setBool(!bool)
                SetSet()
                break;
            case "unread":
                var bucket = setjson
                bucket.checked.unread = !bucket.checked.unread
                setSetjson(bucket)
                setBool(!bool)
                SetSet()
                break;
            case "finish":
                var bucket = setjson
                bucket.checked.finish = !bucket.checked.finish
                setSetjson(bucket)
                setBool(!bool)
                SetSet()
                break;

        }
    };
    const setRadio = (e) => {
        var bucket = setjson
        bucket.radio = e
        setSetjson(bucket)
        setBool(!bool)
        SetSet()
    };
    useEffect(() => {
        if (setjson === undefined && setjson !== null) {
            SetGet()
            setBool(false)
        }
    }, [setjson])


    if (setjson !== undefined && setjson !== null && bool !== null) {
        return (
            <Modal
                backdropOpacity={0.35}
                style={{ margin: 0 }}
                isVisible={true}
                statusBarTranslucent
                onBackdropPress={() => { navigation.goBack(); }} >
                <View style={styles.container}>
                    <View style={styles.leftcontainer}>
                        <Text style={styles.text}>Şuna göre sırala</Text>
                        <View style={styles.view}>
                            <RadioButton
                                uncheckedColor="#03dac4"
                                value="name"
                                status={setjson.radio === 'name' ? 'checked' : 'unchecked'}
                                onPress={() => setRadio('name')}
                            />
                            <Text style={styles.text}>Kitap Adı</Text>
                        </View>
                        <View style={styles.view}>
                            <RadioButton
                                uncheckedColor="#03dac4"
                                value="yazar"
                                status={setjson.radio === 'yazar' ? 'checked' : 'unchecked'}
                                onPress={() => setRadio('yazar')}
                            />
                            <Text style={styles.text}>Yazar</Text>
                        </View>
                        <View style={styles.view}>
                            <RadioButton
                                uncheckedColor="#03dac4"
                                value="money"
                                status={setjson.radio === 'money' ? 'checked' : 'unchecked'}
                                onPress={() => setRadio('money')}
                            />
                            <Text style={styles.text}>Fiyat</Text>
                        </View>
                        <View style={styles.view}>
                            <RadioButton
                                uncheckedColor="#03dac4"
                                value="date"
                                status={setjson.radio === 'date' ? 'checked' : 'unchecked'}
                                onPress={() => setRadio('date')}
                            />
                            <Text style={styles.text}>Tarih</Text>
                        </View>
                        <View style={styles.view}>
                            <RadioButton
                                uncheckedColor="#03dac4"
                                value="page"
                                status={setjson.radio === 'page' ? 'checked' : 'unchecked'}
                                onPress={() => setRadio('page')}
                            />
                            <Text style={styles.text}>Sayfa</Text>
                        </View>
                        <View style={styles.view}>
                            <RadioButton
                                uncheckedColor="#03dac4"
                                value="star"
                                status={setjson.radio === 'star' ? 'checked' : 'unchecked'}
                                onPress={() => setRadio('star')}
                            />
                            <Text style={styles.text}>Favori</Text>
                        </View>
                    </View>
                    <View style={styles.rightcontainer}>
                        <Text style={styles.text}>Okuma Süzgeçi</Text>
                        <View style={styles.view}>
                            <Checkbox
                                uncheckedColor="#03dac4"
                                status={setjson.checked.unread === true ? 'checked' : 'unchecked'}
                                onPress={() => { setChecked("unread") }}
                            />
                            <Text style={styles.text}>Okunmamış</Text>
                        </View>
                        <View style={styles.view}>
                            <Checkbox
                                uncheckedColor="#03dac4"
                                status={setjson.checked.read === true ? 'checked' : 'unchecked'}
                                onPress={() => { setChecked("read"); }}
                            />
                            <Text style={styles.text}>Okunan</Text>
                        </View>

                        <View style={styles.view}>
                            <Checkbox
                                uncheckedColor="#03dac4"
                                status={setjson.checked.finish === true ? 'checked' : 'unchecked'}
                                onPress={() => { setChecked("finish"); }}
                            />
                            <Text style={styles.text}>Bitirilen</Text>
                        </View>

                    </View>
                </View>
            </Modal>
        )
    }
    else {
        return (null)
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        flexDirection: "row",
        //backgroundColor: "#505050",
        backgroundColor: Colors.light.tint,
        position: "relative",
        alignSelf: "center",
        fontWeight: "bold",
        padding: 8,
    },
    leftcontainer: {
        flexDirection: "column",
        padding: 20,
    },
    rightcontainer: {
        flexDirection: "column",
        padding: 20,
    },
    view: {
        alignItems: "center",
        paddingLeft: 5,
        flexDirection: "row",
    },
    text: {
        fontSize: 16,
        padding: 2,
        color: "white"
    }
})

export default NavFilter;

/*
        const add = {
            id: book.id,
            name: book.name,
            yazar: Yazar,
            pub: Yayınevi,
            site: book.site,
            link: book.link,
            page: Sayfa,
            image: book.image,
            money: book.price,
            date: today,
            read: "false",
            star: "0"
        }
    */