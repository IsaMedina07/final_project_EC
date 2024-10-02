import { View, Text, TouchableOpacity, Switch, Pressable, ScrollView } from 'react-native'
import { ButtonContext } from '../../../ButtonContext'
import React, { useState, useContext, useEffect } from 'react'
import style from '../../styles/MainStyle'
// import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

const Main = () => {
    const { roomsUser, setApproved, updateRoom } = useContext(ButtonContext);

    const pushButtom = (name, value) => {
        updateRoom(name, !value); // Cambiamos el valor en Firebase
    };

    return (
        <View style={style.container}>
            <View style={style.exit}>
                <TouchableOpacity onPress={() => setApproved(false)}>
                    <MaterialCommunityIcons name="exit-run" size={24} color="#845ec2" />
                </TouchableOpacity>
            </View>
            <View style={style.containerLigth}>

                <ScrollView contentContainerStyle={style.scroll}>

                    {roomsUser.map(room => {
                        return (
                            <Pressable
                                key={room.id}
                                style={[
                                    style.target,
                                    (room.status) ? { backgroundColor: '#fcf7ff' } : { backgroundColor: '#fff' }, // Estilo condicional
                                ]}
                                onPress={() => {
                                    pushButtom(room.name, room.status);
                                }}
                                activeOpacity={1}
                            >
                                <Switch
                                    style={style.touch}
                                    trackColor={{ false: '#9b89b3', true: '#845ec2' }}
                                    thumbColor={room.status ? '#fcf7ff' : '#f4f3f4'}
                                    // trackColor={{ false: '#9b89b3', true: '#845ec2' }}
                                    // thumbColor={isEnabled ? '#f4f3f4' : '#fcf7ff'}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={() => {
                                        // Función para cambiar el estado
                                        pushButtom(room.name, room.status);
                                    }}
                                    value={room.status}
                                />
                                <Text style={style.text}>{room.name} {room.status}</Text>
                            </Pressable>
                        )
                    })}

                </ScrollView>

                <TouchableOpacity
                    style={style.button}
                    onPress={() => offAll()}
                >
                    <Text style={style.text}> Off all </Text>

                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Main