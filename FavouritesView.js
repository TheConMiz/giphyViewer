import React, {useEffect} from 'react';

import { View, Image, StyleSheet, Dimensions, Share } from 'react-native';

import { IconButton, Icon, List } from "native-base";

import { shareIcon, deleteIcon } from './Constants';


export const FavouritesView = (props) => {

    const shareOptions = {
        title: props.name,
        message: "Enjoy this GIF!",
        url: props.source,
        subject: "GIPHY GIF"
    };

    function shareGif() {
        Share.share(shareOptions);
    }

    if (props.favourites.includes(props.id)) {
        
        return (
        
            <View
                style={styles.container}
            >
    
                <Image
                    resizeMode={props.resizeMode}
                    style={styles.image}
                    source={props.source}
                />
    
                <View
                    style={styles.buttonPanel}
                >
                    <IconButton
                        style={styles.button}
                        variant="outlined"
                        icon={
                            <Icon size="sm" as={shareIcon} />
                        }
                        onTouchEnd={shareGif}
                    >
                        <Icon />
                    </IconButton>

                    {
                        props.favourites.includes(props.id) ?

                        <IconButton
                            variant="outlined"
                            style={styles.button}
                            icon={
                                <Icon
                                    size="sm"
                                    as={
                                        deleteIcon
                                    }
                                />
                            }
                            onTouchEnd={() => {
                                props.deleteFromFavourites(props.id);
                            }}
                        >
                        </IconButton>  : <View/>
                    }
                </View>
            </View>
        );

    }

    else {
        return (

            <View></View>

        );
    }

}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get("window").width * .9,
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: Dimensions.get("window").height * .3,
        borderColor: "black",
        borderWidth: 1,
        marginBottom: 15,
        marginTop: 15
    },
    image: {
        width: 400,
        height: 150,
        borderWidth: 3,
        marginBottom: 5
    },
    buttonPanel: {
        flex: 1,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    button: {
        width: "50%"
    }
});
