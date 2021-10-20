import React, { useState, useContext,useEffect } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    TextInput,
    TouchableOpacity,
} from 'react-native'
import ImageRef from '../assets'
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../component/context';
const Login = () => {
    // navigation
    const navigation = useNavigation();

    // variabel
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Context func
    const { logIn, data } = useContext(AuthContext)

    const formSubmit =()=>{
        const data = logIn(email, password).then(data=>{
 console.log(data)
        })
       
    }
    // useEffect(() => {
    //     if (data().userToken !== null){
    //         navigation.navigate("Home")
    //     }
    // }, [])

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
                <Button style={styles.SubmitButon} onPress={() => formSubmit()} title="Login" />
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




