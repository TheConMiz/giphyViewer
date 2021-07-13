import React, { useEffect } from 'react'

import { StyleSheet, View } from 'react-native';

import { Icon, IconButton, Input } from 'native-base';

import { favouriteIcon, searchIcon } from './Constants';

export const TopBar = (props) => {

    useEffect(() => {
        props.getGifs()
    }, [props.query]);

    
    return (
        <View
            style={styles.container}
        >

            <Input
                style={styles.searchBar}
                variant="filled"
                size="md"
                placeholder="Search Gliphy"
                onChangeText={(text) => {
                    props.setQuery(text);
                    
                    // props.getGifs();
                }}
            />

            <IconButton
                style={styles.paginationToggle}
                variant="solid"
                icon={
                    <Icon size="sm" as={
                        props.onMainPage ? favouriteIcon : searchIcon
                    } />
                }
                onTouchEnd={() => {
                    // ! Slow to change. Check later
                    props.toggleOnMainPage(!props.onMainPage)
                }}
            >

            </IconButton>
        
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        // borderColor: "black",
        // borderWidth: 1,

    },
    searchBar: {
        width: "70%",
        height: "70%",
        color: "black",
        textAlign: "center",
    },
    paginationToggle: {
        width: "10%",
        height: "70%",
    },
    
    resultStatus: {
        marginBottom: 10,
        width: "100%",
        textAlign: "center"
    }
});
