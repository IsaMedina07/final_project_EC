import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import { ButtonContext } from "./ButtonContext"
import React, { useContext } from "react"
import PrivateNavigation from './src/navigation/PrivateNavigation'
import PublicNavigation from './src/navigation/PublicNavigation'

const Tab = createBottomTabNavigator();

export default function Router() {
    const { approved } = useContext(ButtonContext);

    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator 
                initialRouteName="public" 
                screenOptions={{ 
                    tabBarStyle: { display: 'none' },
                    tabBarActiveTintColor: '#232f46',
                    tabBarInactiveTintColor: '#232f4640',
                    tabBarInactiveBackgroundColor: 'transparent',
                    headerShown: false,
                }}c>

                {approved ? (
                        <Tab.Screen name='private' component={PrivateNavigation} />
                ) : (
                    <Tab.Screen name='public' component={PublicNavigation} />
                )}

            </Tab.Navigator>
        </NavigationContainer>
    );
}