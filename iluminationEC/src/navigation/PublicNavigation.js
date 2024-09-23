import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from '@expo/vector-icons/Ionicons'
import Info from '../screens/public/Information'
import Login from '../screens/public/Login'

const Tab = createBottomTabNavigator();

const PublicNavigation = () => {
    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator 
            initialRouteName='Home'
            screenOptions={{
                // tabBarShowLabel: false,
                tabBarActiveTintColor: '#232f46',
                tabBarInactiveTintColor: '#232f4640',
                tabBarInactiveBackgroundColor: 'transparent',
                headerShown: false,
                tabBarStyle:{
                    height:60,
                    position: 'absolute',
                    bottom: 16,
                    left: 16,
                    right: 16,
                    borderRadius: 50,
                    paddingBottom:10,
                    paddingTop:10,
                    backgroundColor:'#fff'
                }
                
            }}
            >
                <Tab.Screen name='Login' component={Login} options={{tabBarIcon:()=>(<Ionicons name="enter" size={22} color="#000" />)}} />
                <Tab.Screen name='Information' component={Info} options={{tabBarIcon:()=>(<Ionicons name="information-circle" size={22} color="#000" />)}} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default PublicNavigation