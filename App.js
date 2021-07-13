import React, { useState } from 'react';


import { FlatList, StyleSheet, TextInput, View, Image, Dimensions } from 'react-native';


import { NativeBaseProvider, Text, Box, Button} from 'native-base';

import { ImageView } from './ImageView';
import { TopBar } from './TopBar';

export const App = () => {

    // State variables 
    // For the GIPHY GIF data
    const [gifs, setGifs] = useState([]);
    // For the user's query
    const [query, setQuery] = useState("");
    // For the user's favourites
    const [favourites, setFavourites] = useState([]);
    // For the page toggle
    const [onMainPage, toggleOnMainPage] = useState(true);

    // Variables for the API call
    const apiKey = "4Qv7lexKKHdDEsqhXEeffI43Oxp1KJj2";
    const url = 'http://api.giphy.com/v1/gifs/search';
    const limit = 25;
    // State variable for offset
    const [offset, setOffset] = useState(0);

    async function getGifs() {

        try {
            const getRequest = url + "?api_key=" + apiKey + "&q=" + query + "&limit=" + limit + "&lang=en" + "&offset=" + offset;
            const responseJSON = await fetch(getRequest);
            const response = await responseJSON.json();
            setGifs(response.data);
        }
        
        catch (error) {
            console.warn(error);
        }
    }


    function addToFavourites(id) {
        let newFavourites = favourites.splice();

        if (newFavourites.includes(id)) {
            console.log("Already favourited");
        }
        
        else {
            newFavourites.push(id);
            setFavourites(newFavourites);
        }

    }

    return (
        <NativeBaseProvider>

            <View style={styles.container}>

                <View
                     style={styles.topBar}
                >

                    <TopBar
                        onMainPage={onMainPage}
                        toggleOnMainPage={toggleOnMainPage}
                        setQuery={setQuery}
                        getGifs={getGifs}
                    />

                </View>


                <Text style={styles.resultStatus}>
                    {
                        gifs.length === 0 ? "No results available." : gifs.length + " results for " + query + "."
                    }
                </Text>

                <FlatList
                    data={gifs}
                    renderItem={({ item }) => (
                        <ImageView
                            resizeMode='contain'
                            source={{ uri: item.images.original.url }}
                            id={item.id}
                            addToFavourites={addToFavourites}
                            favourites={favourites}
                        />
                    )}
                />

            </View>
        </NativeBaseProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 10,
    },
    topBar: {
        width: Dimensions.get("window").width * .9,
        height: Dimensions.get("window").height * .1,
    }
    
});