import React, { useEffect, useState } from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import { useRoute } from '@react-navigation/native'
import BookSearch from '../components/BookSearch';
import InputBox from '../components/InputBox/InputBox';
import Box from '../components/InputBox/BoxInput';



const SearchScreen = () => {


    const [books, setBooks] = useState([]);
    const [query, setInput] = useState('');

    useEffect(() => {
        getBooks();

    }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

    const getBooks = () => {
        if (query === '') {

        }
        else {
            fetch(`https://www.kitabinabak.com/autocomplete/${query}`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
                    'Content-Type': 'application/json'
                },
            })
                .then(response => response.json())
                .then(jsondata => setBooks(jsondata.suggest.book[0].options))
        }


    };

    const route = useRoute();


    const [Visible, setVisible] = useState(true)



    return (

        <View style={styles.container}>
            <FlatList
                style={{ width: "100%" }}
                data={books}
                renderItem={({ item }) => <BookSearch book={item} />}
                keyExtractor={(item) => item._id} />
            { Visible ? <Box onClick={setVisible} /> : <InputBox buttonText={query} onPress={setInput} />}
        </View>

    )
};

export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

