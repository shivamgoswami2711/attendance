import React, { useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    TextInput,
    TouchableOpacity,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ImageRef from '../assets'
import { useNavigation } from '@react-navigation/native';
import { ValidateEmail } from '../Module';
import axios from 'axios'
import { Data } from '../Data';

const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const LoginSubmit = async () => {
        if (email.length == 0) alert("Places Enter Email")
        else if (!ValidateEmail(email)) alert("Email not correct")
        else if (password.length == 0) alert("Places Enter password")
        else {
            await axios.post(`${Data.address}/login`, { email, password })
                .then(async(res) => {
                    setEmail('')
                    setPassword('')
                    try {
                        await AsyncStorage.setItem("user",JSON.stringify(res.data));
                      } catch (error) {
                        alert(error)
                      }
                    alert("Login Success")
                    navigation.navigate('Home')
                }).catch(e => {
                    alert("Login Fail")
                })
        }
    }
    return (
        <View style={styles.mainCaontainer}>
            <View style={styles.ImageContainer}>
                <Image source={ImageRef.logo} />
            </View>
            <View style={styles.inputMainCantainer}>
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
                <Button style={styles.SubmitButon} onPress={() => LoginSubmit()} title="Login" />
            </View>
            <View style={styles.forgetContainer}>
                <TouchableOpacity>
                    <Text style={styles.loginAndForText}>Forget Password</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
                    <Text style={styles.loginAndForText}>Ragistration</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    mainCaontainer: {
        padding: 20
    },
    inputMainCantainer: { marginTop: 30 },
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
        marginTop: 45
    },
    SubmitButon: {
        borderRadius: 10
    },
    forgetContainer: {
        marginTop: 7
    }
    , loginAndForText: {
        fontSize: 15,
        fontWeight: "900",
        color: '#2196F3',
        textAlign: 'center',
        marginVertical: 20
    }
})
