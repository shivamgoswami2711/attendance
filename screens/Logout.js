import React from 'react'
import { View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/core';

import {RemoveData} from '../Data/index'

const Logout = () => {
    const navigation = useNavigation();
     React.useEffect(() => {
        RemoveData()
        navigation.navigate("Home")
    }, [])
}

export default Logout
