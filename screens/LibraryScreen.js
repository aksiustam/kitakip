import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useRef } from 'react'
import { Text, StyleSheet, View, FlatList, TouchableOpacity } from 'react-native'
import _ from 'lodash'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native'
import NumberFormat from 'react-number-format';
import { useNavigation } from '@react-navigation/native'
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


const LibraryScreen = () => {



    const navigation = useNavigation();
    const getComp = (id) => {
        navigation.navigate('LibaryDetails', {
            book: id
        });

    }



    const [datajson, setdatajson] = useState();

    // UPDATE
    const isFocused = useIsFocused()
    useEffect(() => {

        const fetchUser = async () => {
            const result = await AsyncStorage.getItem('Post')

            const json = await JSON.parse(result)

            return (true)
        }

        const sortTable = async () => {
            var results = await AsyncStorage.getItem('Post')

            if (results === [] || results === undefined || results === null) {
                results = [{ name: "Test" }]

            }
            const json = await JSON.parse(results)
            var result = await AsyncStorage.getItem('Set')
            if (results === [] || results === undefined || result === null) {
                result = { "radio": "name", "checked": { "read": true, "unread": true, "finish": true } }
            }

            const data = JSON.parse(result)
            const radio = await data.radio
            const checked = await data.checked

            var data1, data2, data3 = null

            if (checked.read) {

                data1 = json.filter(data => data.read === "true")
                data1 === [] ? null : data1
            }
            if (checked.unread) {
                data2 = json.filter(data => data.read === "false")
                data2 === [] ? null : data2
            }
            if (checked.finish) {
                data3 = json.filter(data => data.read === "finish")
                data3 === [] ? null : data3
            }
            const newData = _.union(data1, data2, data3)
            const sortedData = _.orderBy(newData, [radio], ["asc"])

            setdatajson(sortedData)
            //await AsyncStorage.setItem("Post", JSON.stringify(json));
        };


        sortTable()

    }, [isFocused])


    if (datajson !== undefined && datajson !== [] && datajson !== null) {
        return (
            <View style={styles.container}>
                <FlatList
                    data={datajson}
                    style={{ width: "90%" }}
                    keyExtractor={(item, index) => index + ""}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity onPress={hey => getComp(item)}>
                                <View style={{ ...styles.container, backgroundColor: index % 2 == 1 ? "#F0FBFC" : "white" }}>
                                    <View style={styles.leftContainer}>
                                        <Text style={{ fontWeight: "bold" }}>{item?.name}</Text>
                                        <Text numberOfLines={1} style={styles.text}>{item?.yazar}</Text>
                                    </View>
                                    <View style={styles.rightContainer}>
                                        <Text style={styles.text}>{item?.page} Sayfa</Text>
                                        <NumberFormat
                                            value={item?.money}
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
    else { return (<View></View>) }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e5e5e5',
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

export default LibraryScreen;

/*
AsyncStorage.getAllKeys((err, keys) => {
    AsyncStorage.multiGet(keys, (error, stores) => {
        stores.map((result, i, store) => {
            console.log({ [store[i][0]]: store[i][1] });
            return true;
        });
    });
});



<TouchableOpacity
                onPress={deleteJson}
                style={styles.buttonStyle}>
                <Text style={styles.buttonTextStyle}> deleteJson </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={addJson}
                style={styles.buttonStyle}>
                <Text style={styles.buttonTextStyle}> addJson </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={getJson} style={styles.buttonStyle}>
                <Text style={styles.buttonTextStyle}> getJson </Text>
            </TouchableOpacity>
*/

const tableHeader = () => (
    <View style={styles.tableHeader}>
        {
            columns.map((column, index) => {
                {
                    return (
                        <TouchableOpacity
                            key={index}
                            style={styles.columnHeader}
                            onPress={() => sortTable(column)}>
                            <Text style={styles.columnHeaderTxt}>{column + " "}
                                {selectedColumn === column && <MaterialCommunityIcons
                                    name={direction === "desc" ? "arrow-down-drop-circle" : "arrow-up-drop-circle"}
                                />
                                }
                            </Text>
                        </TouchableOpacity>
                    )
                }
            })
        }
    </View>
)