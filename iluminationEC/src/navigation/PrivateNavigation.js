import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Main from '../screens/private/Main'
import Login from '../screens/public/Login'

const Stack = createNativeStackNavigator();

const PrivateNavigation = () => {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}>
                <Stack.Screen name='Main' component={Main} />
                <Stack.Screen name='login' component={Login}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default PrivateNavigation