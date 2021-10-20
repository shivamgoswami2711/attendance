import React, { useState,useEffect } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Attendance from './screens/Attendance'
import WorkGenerator from './screens/WorkGenerator'
import Registration from './screens/Registration'
import Login from "./screens/login"
import Home from "./screens/Home"
import { UserData } from './Data/index';
import Logout from './screens/Logout';
import DrawerContent from './screens/DrawerContent';

const Drawer = createDrawerNavigator();

export default function App() {
  const [user, setUser] = useState(null)
  const [LonginLogout, setLonginLogout] = useState(true)
  useEffect(() => {
    UserData().then(res => {
        if (typeof res !== 'undefined') {
          setUser(res)
        } 
    })
    console.log(user)
    setLonginLogout(typeof user !== "object")
}, [])

  return (
      <NavigationContainer>
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>}>
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Attendance" component={Attendance} />
          <Drawer.Screen name="Work" component={WorkGenerator} />
          <Drawer.Screen name="Registration" component={Registration} />
          <Drawer.Screen name="Login" component={Login} /> 
        </Drawer.Navigator>
      </NavigationContainer>
  );
}

