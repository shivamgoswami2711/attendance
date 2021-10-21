import React, { useEffect, useReducer, useState} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Attendance from './screens/Attendance'
import WorkGenerator from './screens/WorkGenerator'
import Registration from './screens/Registration'
import Login from "./screens/login"
import Home from "./screens/Home"
import { AuthContext } from './component/context';
import DrawerContent from './screens/DrawerContent';

const Drawer = createDrawerNavigator();

export default function App() {


  // init
  // #############################

  const initialState = {
    userName: null,
    userToken: null,
  }
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
      case 'loginChack':
        return {
          ...prevState
        }
      default:
        break;
    }
  }
  return (
    <AuthContext.Provider value={useReducer(loginReducer, initialState)}>
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

