import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, StyleSheet, View, Linking, Image, TouchableOpacity } from 'react-native'
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';



const BookPriceBig = (props) => {

  const { link, book, id, array } = props;



  const addFavori = async () => {
    var Yazar, Yayınevi = "null"
    array.map((item, i) => {
      switch (item.key) {
        case "Yazar":
          Yazar = item.value
          break;
        case "Yayınevi":
          Yayınevi = item.value
          break;
      }
    })
    var data = []
    await AsyncStorage.getItem("Fav").then((value) => {
      data = JSON.parse(value)
      //console.log("Get => " + value)
    })

    const add = {
      id: book.id,
      name: book.name,
      yazar: Yazar,
      pub: Yayınevi,
      site: book.site,
      link: book.link,
      money: book.price,
      siteimg: book.siteimg
    }
    var newFav
    if (data === null) {
      newFav = [add];
    }
    else {
      newFav = [...data, add];
    }

    //console.log("Set => " + JSON.stringify(newJson))
    await AsyncStorage.setItem("Fav", JSON.stringify(newFav));
    alert('Data Saved');
  }

  const addStorage = async () => {
    var Yazar, Yayınevi, Sayfa = "null"
    array.map((item, i) => {
      switch (item.key) {
        case "Yazar":
          Yazar = item.value
          break;
        case "Yayınevi":
          Yayınevi = item.value
          break;
        case "Sayfa":
          Sayfa = item.value
          break;
      }
    })


    var data = []

    await AsyncStorage.getItem("Post").then((value) => {
      data = JSON.parse(value)
      //console.log("Get => " + value)
    })

    let today = new Date().toLocaleDateString()
    const add = {
      id: book.id,
      name: book.name,
      yazar: Yazar,
      pub: Yayınevi,
      site: book.site,
      link: book.link,
      page: Number(Sayfa),
      image: book.image,
      money: Number(book.price),
      date: today,
      read: "false",
      star: 0,
      desc: book.desc
    }
    var newJson
    if (data === null) {
      newJson = [add];
    }
    else {
      newJson = [...data, add];
    }

    //console.log("Set => " + JSON.stringify(newJson))
    await AsyncStorage.setItem("Post", JSON.stringify(newJson));
    alert('Data Saved');

    //console.log(array[0])
  }

  const addUrl = () => {
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
      <View style={styles.top}>
        <TouchableOpacity onPress={addStorage} style={styles.box}>
          <AntDesign name="book" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={addUrl}>
          <Image style={styles.image} source={{ uri: book.siteimg }} resizeMode="contain" />
        </TouchableOpacity>
        <TouchableOpacity onPress={addFavori} style={styles.box}>
          <FontAwesome name="star" size={30} color="white" />
        </TouchableOpacity>
      </View>
      {book.siterek == null ? null : <View style={styles.bottom}><Text>{book.siterek}</Text></View>}
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingTop: 15,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  bottom: {
    paddingTop: 10,
    alignItems: "center",

  },
  image: {
    width: 150,
    height: 50,

  },
  box: {
    width: 50,
    height: 50,
    backgroundColor: Colors.light.tint,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,

  },
})

export default BookPriceBig;