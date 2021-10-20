
import AsyncStorage from '@react-native-async-storage/async-storage'

export const Data = {
    address:"http://192.168.2.7:3000", 
}

export const colorThame = {
    Primary: '#00BFFF',
    secondary: '#00BFFF',
    text : '#FFFFFF',
    
    background : '#000000',
    background2 : '#FFFFFF',
    background3 : '#000000',
    background4 : '#FFFFFF',
}

export const UserData = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        const data = JSON.parse(value)
       return data;
      }
    } catch (error) {
        alert(error)
    }
  };

export const RemoveData = async () => {
    try {
      const value = await AsyncStorage.removeItem('user');
      console.log(value)
      console.log("hello")
    } catch (error) {
        alert(error)
    }
  };