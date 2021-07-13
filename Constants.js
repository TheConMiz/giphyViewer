import React, { useEffect } from 'react'

import { Icon, IconButton } from 'native-base';

import { MaterialIcons, AntDesign } from '@expo/vector-icons';

export const favouriteIcon = (
    <MaterialIcons name="favorite-border" size={24} color="black" />
);

export const shareIcon = (
    <AntDesign name="sharealt" size={24} color="black" />
);

export const deleteIcon = (
    <AntDesign name="delete" size={24} color="black" />
);

export const searchIcon = (
    <AntDesign name="search1" size={24} color="black" />
);