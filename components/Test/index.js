import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableOpacity } from 'react-native'
import { Button, Menu, Divider, Provider } from 'react-native-paper';


const Test = (props) => {

    const { vis } = props
    const [visible, setVisible] = useState(vis);

    const openMenu = () => { setVisible(true); console.log("hey") };

    const closeMenu = () => { setVisible(false); console.log("hey") };
    return (
        <Provider>
            <View
                style={{
                    flex: 1,
                    paddingTop: 50,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    backgroundColor: "black",
                    alignItems: "center",
                    position: "absolute",
                    right: 10,
                    width: 100,
                    height: 100,
                }}>
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={<Button onPress={openMenu}>Show menu</Button>}>
                    <Menu.Item onPress={() => { }} title="Item 1" />
                    <Menu.Item onPress={() => { }} title="Item 2" />
                    <Divider />
                    <Menu.Item onPress={() => { }} title="Item 3" />
                </Menu>
            </View>
        </Provider>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    }

})

export default Test;