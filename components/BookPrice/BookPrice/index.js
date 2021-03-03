import React, { useState } from 'react'
import { Text, StyleSheet, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import NumberFormat from 'react-number-format';
import BookPriceBig from '../BookPriceBig';


const BookPrice = (props) => {

    const { book, id, array } = props;
    const [Visible, setVisible] = useState(true)

    const dummy = 'https://dummyimage.com/46x66/a8a8ad/000.jpg&text=blank'
    const onClick = () => {
        const hey = Visible
        setVisible(!hey)
    }


    return (

        <View style={styles.container}>
            <TouchableOpacity onPress={onClick}>
                <View style={styles.leftcontainer}>
                    <Image style={styles.image} source={{ uri: book.image || dummy }} resizeMode="contain" />
                    <View style={styles.midcontainer}>
                        <View style={styles.upcontainer}>
                            <Text style={{ fontSize: 16, }}>{book.name} </Text>
                        </View>
                        <View style={styles.downcontainer}>
                            <View style={styles.text}>
                                <NumberFormat
                                    value={book.price}
                                    displayType={'text'}
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                    thousandSeparator={true}
                                    suffix={' TL'}
                                    renderText={value => <Text style={{ fontSize: 20, }}>{value}</Text>} />
                            </View>
                            <View >
                                <Text style={styles.subtext}>{Visible ? book.site : book.site + " / " + book.siteto}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            {Visible ? null :
                <BookPriceBig book={book} link={book.link} siteto={book.siteto} id={id} array={array} />}
        </View>

    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e5e5e5',
        width: "100%",
        padding: 10,
        borderBottomWidth: 0.5,
    },
    leftcontainer: {
        flexDirection: "row",
        justifyContent: "flex-start",

    },
    midcontainer: {
        justifyContent: "space-between",
        width: Dimensions.get('window').width - 120,
        flexDirection: "column",
        left: 10,
    },
    upcontainer: {
        alignItems: "flex-start",
    },
    downcontainer: {
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: 'row',
    },
    image: {
        width: 80,
        height: 80,
    },
    text: {
        alignItems: "flex-start",
    },
    subtext: {
        color: "gray",
        fontSize: 14,
    },
})

export default BookPrice;