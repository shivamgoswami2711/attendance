import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, Image, Button, TextInput, ToastAndroid, TouchableOpacity } from 'react-native'
import ImageRef from '../assets'
import { useNavigation } from '@react-navigation/native';
import { ValidateEmail } from '../Module';
import axios from 'axios';
import { Data } from '../Data'


const Registration = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    

    const Registration = async () => {
        if (name.length == 0) alert("Places Enter Name")
        else if (name.length > 25) alert("Name to Long")
        else if (name.length < 1) alert("Name to Short")
        else if (email.length == 0) alert("Places Enter Email")
        else if (password.length == 0) alert("Places Enter password")
        else if (!ValidateEmail(email)) alert("Email not correct")
        else if (password.length < 6) alert("password to Short")

        else {
            await axios.post(`${Data.address}/ragistration`, { name, email, password })
                .then(res => {
                    setName('')
                    setEmail('')
                    setPassword('')
                    alert("Registration Success")
                    navigation.navigate("Login")
                }).catch(err => {
                    console.log(err)
                })
        }
    }
    return (
        <View style={styles.mainCaontainer}>
            <View style={styles.ImageContainer}>
                <Image source={ImageRef.logo} />
            </View>
            <View>
                <View style={styles.inputContainer}>
                    <Text style={styles.labalText}>Name</Text>
                    <TextInput
                        style={styles.InputText}
                        placeholder="Type here to translate!"
                        onChangeText={text => setName(text)}
                        autoCapitalize="words"
                        defaultValue={name}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.labalText}>Email</Text>
                    <TextInput
                        style={styles.InputText}
                        placeholder="Type here to translate!"
                        onChangeText={text => setEmail(text)}
                        autoCompleteType="email"
                        defaultValue={email}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.labalText} >Password</Text>
                    <TextInput
                        style={styles.InputText}
                        placeholder="Type here to translate!"
                        onChangeText={text => setPassword(text)}
                        autoCompleteType="password"
                        defaultValue={password}
                        secureTextEntry
                    />
                </View>
            </View>
            <View style={styles.SubmitButonContainer}>
                <Button style={styles.SubmitButon} onPress={() => Registration()} title="Registration" />
            </View>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginAndForText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Registration

const styles = StyleSheet.create({
    mainCaontainer: {
        padding: 20
    },
    ImageContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        marginTop: 12
    },
    InputText: {
        borderWidth: 1,
        borderRadius: 20,
        fontSize: 20,
        padding: 5,
        paddingLeft: 30,
        paddingRight: 5
    },
    labalText: {
        fontSize: 20,
        fontWeight: '900'
    },
    SubmitButonContainer: {
        marginTop: 25
    },
    SubmitButon: {
        borderRadius: 10
    }
    , loginAndForText: {
        fontSize: 15,
        fontWeight: "900",
        color: '#2196F3',
        textAlign: 'center',
        marginVertical: 20
    }
})
