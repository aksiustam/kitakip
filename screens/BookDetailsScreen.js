import React, { useEffect, useState } from 'react'
import { FlatList, Text, View, ImageBackground, StyleSheet } from 'react-native'
import { useRoute } from '@react-navigation/native'


import BookPrice from '../components/BookPrice/BookPrice';




const BookDetailsScreen = () => {

    const cheerio = require('react-native-cheerio');
    const route = useRoute();

    const id = route.params.id;
    const title = route.params.name;

    const [Urldata, setUrlData] = useState([]);
    const [urlArray, setArray] = useState([]);
    const [desc, setDesc] = useState([]);
    const array = new Array()

    const data = cheerio.load(urlArray);
    const $ = cheerio.load(Urldata);

    useEffect(() => {
        getBooks();
        getArray();
        getDesc();
    }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

    const getBooks = () => {
        fetch(`https://www.kitabinabak.com/lazydata/product/${id}/shplist`)
            .then(response => response.text())
            .then(jsondata => setUrlData(jsondata))
    };
    const getArray = () => {
        fetch(`https://www.kitabinabak.com/lazydata/product/${id}`)
            .then(response => response.text())
            .then(jsondata => setArray(jsondata));
    }
    const getDesc = () => {
        fetch(`https://www.kitabinabak.com/lazydata/product/${id}/prdesc`)
            .then(response => response.text())
            .then(jsondata => setDesc(jsondata))
    }
    { // cheerio
        var book = [];
        const data = cheerio.load(desc);

        const key = new Array();
        const name = new Array();
        const link = new Array();
        const price = new Array();
        const site = new Array();
        const siteto = new Array();
        const image = new Array();
        const siteimg = new Array();
        const siterek = new Array();
        const des = data('.lazydata').text().trim()




        $('.font9').each((i, el) => {
            const item = $(el).text();
            name.push(item);

        });
        $('.bookDescListMarginTop a').each((i, el) => {
            const item = $(el).get(0).attribs.onclick;
            var pos = item.search("doAffPost");
            var res = item.substring(pos).split(/,/);
            link.push(res[3].replace(/\s/g, '').slice(1, -1));
            price.push(res[6].replace(/\s/g, '').slice(1, -1));
            key.push(res[8].replace(/\s/g, '').slice(1, -1));
            site.push(res[9].replace(/\s/g, '').slice(1, -1));
            siteto.push(res[10].replace(/\s/g, '').slice(1, -3));
        });
        $('.font8Italic').each((i, el) => {
            const item = $(el).text();
            if (item != null)
                siterek.push(item);
        });
        $('.thumnailImage').each((i, el) => {
            const item = $(el).find('img').attr("src");
            image.push(item);
        });

        $('.siteText').each((i, el) => {
            const item = $(el).find('img').attr("src");
            if (item != null)
                siteimg.push(item);
        });



        for (let i = 0; i < key.length; i++) {
            book.push({
                key: i,
                id: key[i],
                name: name[i], // +
                link: link[i], // +
                price: price[i], // +
                site: site[i], // +
                siteto: siteto[i], // +
                image: image[i], // +
                siteimg: siteimg[i],
                siterek: siterek[i],
                desc: des
            })
        }

    }

    data('.bookPropItem').each((i, el) => {
        const item1 = data(el).find('.col-lg-3').text().trim();
        const item2 = data(el).find('.col-lg-9').text().trim().replace(/\s+/g, " ");
        array.push({ key: item1, value: item2 });
        //console.log(i + " => loop" + " + " + item1 + " + " + item2)
    });

    const list = array.map((item, i) => {
        return (
            <View key={i} style={styles.box}>
                <View style={styles.mbox}>
                    <Text style={styles.text}>{item.key}</Text>
                </View>
                <View style={styles.mbox}>
                    <Text style={styles.text} numberOfLines={2}>{item.value}</Text>
                </View>
            </View>
        )
    })
    return (
        <View style={styles.container}>
            <FlatList
                style={{ width: "100%" }}
                data={book}
                initialNumToRender={7}
                renderItem={({ item }) => <BookPrice book={item} id={id} array={array} />}
                keyExtractor={(item) => item.key.toString()}
                ListHeaderComponent={
                    <View style={styles.mainContainer}>
                        <View style={styles.downContainer}>
                            {list}
                        </View>
                    </View>
                }
            />
        </View>

    )
};

export default BookDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainContainer: {
        padding: 4,
        justifyContent: "space-around",
        flex: 1,
    },

    downContainer: {
        justifyContent: "space-evenly",
        flexDirection: "column"
    },
    box: {
        padding: 5,
        justifyContent: "space-between",
        flexDirection: "row",
        paddingRight: 10,
    },
    mbox: {
        width: 150,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,

        backgroundColor: "#d0d0d0",
        alignSelf: 'center',


    },
    text: {
        alignItems: "center",
        fontSize: 17,
        alignSelf: 'center',
        flexWrap: "wrap",
        padding: 15,
    },
});

