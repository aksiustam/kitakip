import React, { useState } from 'react'
import { Text, StyleSheet, View, Image, ScrollView } from 'react-native'
import { useRoute } from '@react-navigation/native'
import NumberFormat from 'react-number-format';
import StarRating from 'react-native-star-rating';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';



const LibraryDetailsScreen = () => {
    const route = useRoute();
    const book = route.params.book;
    const [star, setStar] = useState(book.star)
    const [read, setRead] = useState(book.read)
    const dummy = 'https://dummyimage.com/46x66/a8a8ad/000.jpg&text=blank'
    /*
    Object {
      "id": "SUxBSxsaTU1JQEodTEoeS0FOHk4aTkBJTxxLGklNT08",
      "link": "https://www.kitapsec.com/Products/1984-Can-Yayinlari-42821.html",
      "read": "false",
      "site": "KitapsecCom",
      "star": 0,
    }
    */



    const StarPress = async (rating) => {
        const results = await AsyncStorage.getItem('Post')
        const result = JSON.parse(results)
        const data = result.filter(data => data.id !== book.id);
        const newArray = result.filter(data => data.id === book.id)[0];
        newArray.star = rating
        const newdata = [...data, newArray]
        await AsyncStorage.setItem("Post", JSON.stringify(newdata));
        setStar(rating)
    }

    const BtnPress = async (item) => {
        const results = await AsyncStorage.getItem('Post')
        const result = JSON.parse(results)
        const data = result.filter(data => data.id !== book.id);
        const newArray = result.filter(data => data.id === book.id)[0];
        switch (item) {
            case "false":
                setRead("false")
                newArray.read = "false"
                break;
            case "true":
                setRead("true")
                newArray.read = "true"
                break;
            case "finish":
                setRead("finish")
                newArray.read = "finish"
                break;
        }
        const newdata = [...data, newArray]
        await AsyncStorage.setItem("Post", JSON.stringify(newdata));

    }


    return (
        <View style={styles.container}>
            <View style={styles.upcontainer}>
                <Text style={styles.bigtext}>{book.name}</Text>
                <Text style={styles.text}>{book.yazar}</Text>
            </View>
            <View style={styles.midcontainer}>
                <View style={styles.up}>
                    <View style={styles.left}>
                        <Image style={styles.image} source={{ uri: book.image || dummy }} />
                    </View>
                    <View style={styles.right}>
                        <Text style={styles.smalltext}>Yayınevi : {book.pub}</Text>
                        <Text style={styles.smalltext}>Sayfa : {book.page}</Text>
                        <NumberFormat
                            value={book.money}
                            displayType={'text'}
                            decimalScale={2}
                            fixedDecimalScale={true}
                            thousandSeparator={true}
                            suffix={' TL'}
                            renderText={value => <Text style={styles.smalltext}>Fiyatı : {value}</Text>} />
                        <Text style={styles.smalltext}>Tarih : {book.date}</Text>
                    </View>
                </View>
                <View style={styles.down}>
                    <View style={{ flexDirection: "row", alignItems: "center", padding: 2, }}>
                        <Text style={styles.smalltext}>Puan : </Text>
                        <StarRating
                            //buttonStyle={styles.star}
                            containerStyle={styles.star}
                            disabled={false}
                            emptyStar={'ios-star-outline'}
                            fullStar={'ios-star'}
                            halfStar={'ios-star-half'}
                            iconSet={'Ionicons'}
                            maxStars={5}
                            rating={star}
                            selectedStar={(rating) => StarPress(rating)}
                            fullStarColor={'gold'} />
                    </View>
                    <View style={styles.buttoncontainer}>
                        <Button mode="outlined" dark={true} compact={true} color="darkgreen"
                            style={{ ...styles.button, backgroundColor: read === "false" ? "#00640099" : null }}
                            onPress={() => BtnPress("false")}>
                            unread
                      </Button>
                        <Button mode="outlined" dark={true} compact={true} color="darkgreen"
                            style={{ ...styles.button, backgroundColor: read === "true" ? "#00640099" : null }}
                            onPress={() => BtnPress("true")}>
                            read
                      </Button>
                        <Button mode="outlined" dark={true} compact={true} color="darkgreen"
                            style={{ ...styles.button, backgroundColor: read === "finish" ? "#00640099" : null }}
                            onPress={() => BtnPress("finish")}>
                            finish
                      </Button>
                    </View>
                </View>
            </View>
            <ScrollView>
                <View style={styles.downcontainer}>
                    <Text style={styles.text}>Açıklama</Text>
                    <Text>{book.desc}</Text>
                </View>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    button: {
        //backgroundColor: "#00640099",
        borderWidth: 2,
    },
    buttoncontainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 2,
    },
    container: {
        width: "80%",
        flexDirection: "column",
        alignSelf: "center",
        justifyContent: "center",
    },
    upcontainer: {
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: "lightgrey",
        justifyContent: "flex-start",
        padding: 10,
    },
    midcontainer: {
        padding: 10,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    up: {
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    down: {
        flexDirection: "column",
        alignSelf: "flex-start",
    },
    star: {
        transform: [{ scale: 0.5 }],
        width: "100%",
        height: "80%",
        marginHorizontal: -50,
        alignItems: "center",
    },
    left: {
        flex: 1,
        alignItems: "flex-start",
    },
    right: {
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
    },
    downcontainer: {
        padding: 10,
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        marginBottom: 70,
    },
    image: {
        width: 60,
        height: 80,
    },
    bigtext: {
        fontSize: 24,
    },
    text: {
        fontSize: 20,
    },
    smalltext: {
        fontSize: 16,
    },
})

export default LibraryDetailsScreen;