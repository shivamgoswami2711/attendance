import React, { useEffect} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import ImageRef from '../assets'
import { UserData } from '../Data';
import { useStateValue } from '../component/context';


const Home = () => {
    const [State, dispatch] = useStateValue();
    useEffect(() => {
        UserData().then(data => {
            if (typeof data !== 'undefined') {
                dispatch({
                    type: 'login',
                    userName: data.name,
                    userToken: data.id
                })
            }
        })
    }, [])
    return (
        <View>
            <View style={styles.CardContainer} >
                <TouchableOpacity>
                    <Text style={styles.header}>Home</Text>
                    <Image style={styles.Image} source={ImageRef.logo} />
                    <Text>
                        Well organized and easy to understand Web
                        building tutorials with lots of examples of how
                        to use HTML, CSS, JavaScript, SQL, Python, PHP,
                        Bootstrap, Java, ...
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    CardContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 10,
        // borderWidth: 1,
        padding: 10,
        elevation: 5,
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000',
        margin: 10,
        textAlign: 'center',
    },
    Image: {
        width: 300,
        height: 100,
        margin: 10,
        borderWidth: 1,

    }
})
