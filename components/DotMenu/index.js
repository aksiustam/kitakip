import React, { useState } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { Menu, Divider, Provider, Button } from 'react-native-paper';
import Modal from 'react-native-modal';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
const DotMenu = (props) => {

    const navigation = useNavigation();
    const deleteJson = async (id) => {
        const results = await AsyncStorage.getItem('Post')
        const result = JSON.parse(results)
        const data = result.filter(data => data.id !== id);
        await AsyncStorage.setItem("Post", JSON.stringify(data));
    }


    const { id, name } = props
    const [modal, setModal] = useState(false)
    const [visible, setVisible] = useState(false)
    const openMenu = () => { setVisible(true); };
    const closeMenu = () => { setVisible(false); };

    const ondelete = () => { setModal(true); setVisible(false); }

    const BtnPress = (item) => {
        if (item) {
            setModal(false)
            deleteJson(id)
            navigation.navigate('bookLibary');

            //navigation.goBack();
        }
        else {
            setModal(false)
        }
    }
    return (
        <View style={styles.container}>
            <Modal
                backdropOpacity={0.35}
                style={{ margin: 0 }}
                isVisible={modal}
                statusBarTranslucent
                onBackdropPress={() => { setModal(!modal) }} >
                <View style={styles.wrap}>
                    <View style={styles.up}>
                        <Text style={styles.text}>{name} adlı kitap silincektir.</Text>
                        <Text style={styles.text}>Emin misiniz?</Text>
                    </View>
                    <View style={styles.down}>
                        <Button mode="contained" dark={true} color="#dc3545" onPress={() => BtnPress(false)}>
                            Hayır</Button>
                        <Button mode="contained" dark={true} color="#007bff" onPress={() => BtnPress(true)}>
                            Evet</Button>
                    </View>
                </View>
            </Modal>

            <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                    <TouchableOpacity onPress={() => openMenu()}>
                        <MaterialCommunityIcons name="dots-vertical" size={30} color={"white"} />
                    </TouchableOpacity>
                }>

                <Menu.Item onPress={ondelete} title="Kitabı Sil" />
                <Divider />
            </Menu>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: "center",
        right: 10,
    },
    wrap: {
        width: 250,
        height: 166,
        backgroundColor: "white",
        flexDirection: "column",
        alignSelf: "center",
        borderRadius: 20,
    },
    up: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

        flexWrap: "nowrap",
        marginLeft: 10,
        marginRight: 10,
    },
    down: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-evenly",
        padding: 10,
        paddingBottom: 20,

    },
    text: {
        fontSize: 16,
        fontWeight: "600",
        textAlign: "center",
    },
})

export default DotMenu;