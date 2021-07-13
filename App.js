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


    function addToFavourites(gif) {
        let newFavourites = favourites.slice();

        if (newFavourites.includes(gif.id)) {
            console.log("Already favourited. Gonna Delete now");

            // TODO: Delete favourites.
            // let targetIndex = newFavourites.findIndex(item => item === id);

            // let finalFavourites = newFavourites.splice(targetIndex, 1);

            // setFavourites(finalFavourites);


        }
        
        else {
            newFavourites.push(gif);

            setFavourites(newFavourites);
        }

    }

    function deleteFromFavourites(id) {
        
    }

    async function supplementGifs() {
        
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
                        query={query}
                        
                    />

                </View>


                <Text style={styles.resultStatus}>
                    {
                        gifs.length === 0 ? "No results available." : gifs.length + " results for " + query + "." + 

                        favourites.length
                    }
                </Text>

                <FlatList
                    data={onMainPage ? gifs : gifs.filter((item) => {
                        favourites.includes(item.id);
                    })}
                    extraData={onMainPage}

                    renderItem={({ item }) => (
                        <ImageView
                            resizeMode='contain'
                            source={{ uri: item.images.original.url }}
                            id={item.id}
                            addToFavourites={addToFavourites}
                            favourites={favourites}
                            onMainPage={onMainPage}
                        />
                    )}
                    // onEndReached={() => {
                    //     setOffset(offset + limit);
                    //     supplementGifs();
                    // }}
                    // onEndReachedThreshold={0.01}
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