import React, { useMemo, useReducer } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Attendance from './screens/Attendance'
import WorkGenerator from './screens/WorkGenerator'
import Registration from './screens/Registration'
import Login from "./screens/login"
import Home from "./screens/Home"
import { AuthContext } from './component/context';
import DrawerContent from './screens/DrawerContent';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ValidateEmail } from './Module';
import axios from 'axios'
import { Data } from './Data';

const Drawer = createDrawerNavigator();

export default function App() {
  // #############################
  // init
  // #############################

  const initialState = {
    userName: null,
    userToken: null,
  }
  // #############################
  // reducer
  // #############################

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'login':
        return {
          ...prevState,
          userName: action.userName,
          userToken: action.userToken
        }
      case 'logout':
        return {
          ...prevState,
          userName: null,
          userToken: null
        }
      case 'Data':
        return {...prevState}
      default:
        break;
    }
  }


  const [loginState, dispatch] = useReducer(loginReducer, initialState)

  // #############################
  //  All func
  // #############################

  const authfunc = useMemo(() => ({

    // #############################
    // login Func
    // #############################


    logIn: async (email, password) => {
      let success = null
      if (email.length == 0) alert("Places Enter Email")
      else if (!ValidateEmail(email)) alert("Email not correct")
      else if (password.length == 0) alert("Places Enter password")
      else {
        await axios.post(`${Data.address}/login`, { email, password })
          .then(async (res) => {
            try {
              await AsyncStorage.setItem("user", JSON.stringify(res.data));
            } catch (error) {
              alert(error)
            }
            alert("Login Successfully")
            dispatch({
              type: 'login',
              userName: res.data.name,
              userToken: res.data.id
            })
            success = {
              userName: res.data.name,
              userToken: res.data.id
            }
          }).catch(e => {
            alert("Login Fail")
            success={
              userName: null,
              userToken: null
            }
          })
      }
      return loginState
    },

    // #############################
    // logout Func
    // #############################

    logOut: async () => {
      try {
        const value = await AsyncStorage.removeItem('user');
        dispatch({
          type: 'logout'
        })
      } catch (error) {
        alert(error)
      }
    },
    data:()=>{
      dispatch({
        type:'data'
      })
      return loginState
    }
     
  }), [])



  return (
    <AuthContext.Provider value={authfunc}>
      <NavigationContainer>
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Attendance" component={Attendance} />
          <Drawer.Screen name="Work" component={WorkGenerator} />
          <Drawer.Screen name="Registration" component={Registration} />
          <Drawer.Screen name="Login" component={Login} />
        </Drawer.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

