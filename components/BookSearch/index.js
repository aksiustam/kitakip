import React from 'react'
import { Text, StyleSheet, View, FlatList, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'



const BookSearch = (props) => {

    const { book } = props
    const id = book._id ?? 'null'
    const score = book._score ?? 'null'
    const name = book._source?.m_suggest?.[0]?.input ?? 'null'
    const writer = book._source?.m_wrtrs?.[0]?.m_wname ?? 'null'
    const pub = book._source?.m_publisher?.m_pname ?? 'null'

    const navigation = useNavigation();
    const onClick = () => {
        navigation.navigate('BookDetails', {
            id: id,
            name: name,
        });
    }

    return (
        <TouchableOpacity onPress={onClick}>
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <Text style={styles.bookName}>{name}</Text>
                    <Text numberOfLines={1} style={styles.bookWriter}>{writer}</Text>
                </View>
                <View style={styles.rightContainer}>
                    <Text style={styles.BookPub}>{pub}</Text>
                    <Text style={styles.BookPub}>({score})</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({

    container: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        padding: 10,
        borderBottomWidth: 0.5,
    },
    leftContainer: {
        flexDirection: "column",
        flex: 1,
        justifyContent: "space-around",
    },
    rightContainer: {
        flexDirection: "column",
        justifyContent: "space-around",
        flex: 1,
        alignItems: "flex-end"
    },
    bookName: {
        fontWeight: "bold",
        fontSize: 16,
    },
    bookWriter: {
        color: "gray",
        fontSize: 16,
    },
    BookPub: {
        color: "gray",
        fontSize: 14,
    },
});
export default BookSearch;
