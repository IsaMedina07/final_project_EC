import { View, Text, TouchableOpacity, Switch, Pressable } from 'react-native'
import React, { useState } from 'react'
import style from '../../styles/mainStyle'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Ionicons from '@expo/vector-icons/Ionicons'

const Main = () => {
    const [room, setRoom] = useState('off');
    const [living, setLiving] = useState('off');
    const [bathroom, setBathroom] = useState('off');
    const [kitchen, setKitchen] = useState('off');

    const icon = {
        icon1: <Ionicons name="flashlight" size={24} color="black" />,
        icon2: <Ionicons name="flashlight-outline" size={24} color="black" />
    }

    const pushButtom = (value) => {
        switch (value) {
            case 'room':
                room == 'off' ? setRoom('on') : setRoom('off')
                break
            case 'living':
                living == 'off' ? setLiving('on') : setLiving('off')
                break
            case 'bathroom':
                bathroom == 'off' ? setBathroom('on') : setBathroom('off')
                break
            case 'kitchen':
                kitchen == 'off' ? setKitchen('on') : setKitchen('off')
                break
            default:
                setRoom('off')
                setLiving('off')
                setBathroom('off')
                setKitchen('off')
                break
        }
    }

    const [isEnabledRoom, setIsEnabledRoom] = useState(false);
    const toggleSwitchRoom = () => setIsEnabledRoom(previousState => !previousState);

    const [isEnabledLiving, setIsEnabledLiving] = useState(false);
    const toggleSwitchLiving = () => setIsEnabledLiving(previousState => !previousState);

    const [isEnabledBathroom, setIsEnabledBathroom] = useState(false);
    const toggleSwitchBathroom = () => setIsEnabledBathroom(previousState => !previousState);

    const [isEnabledKitchen, setIsEnabledKitchen] = useState(false);
    const toggleSwitchKitchen = () => setIsEnabledKitchen(previousState => !previousState);

    const offAll = () =>{
        setIsEnabledRoom(false);
        setIsEnabledLiving(false);
        setIsEnabledBathroom(false);
        setIsEnabledKitchen(false);
        setRoom('off');
        setLiving('off');
        setBathroom('off');
        setKitchen('off');
    }

    return (
        <View style={style.container}>
            <View style={style.exit}>
                <TouchableOpacity>
                <MaterialIcons name="exit-to-app" size={24} color="#845ec2" />
                </TouchableOpacity>
            </View>
            <View style={style.containerLigth}>
                <Pressable
                    // style={style.target}
                    style={[
                        style.target, 
                        (isEnabledRoom || room === 'on') ? { backgroundColor: '#fcf7ff' } : { backgroundColor: '#fff' } // Estilo condicional
                    ]}
                    onPress={() => {
                        pushButtom('room')
                        toggleSwitchRoom()
                    }}
                    activeOpacity={1}
                >
                    <Switch
                        style={style.touch}
                        trackColor={{ false: '#9b89b3', true: '#845ec2' }}
                        thumbColor={isEnabledRoom ? '#fcf7ff' : '#f4f3f4'}
                        // trackColor={{ false: '#9b89b3', true: '#845ec2' }}
                        // thumbColor={isEnabled ? '#f4f3f4' : '#fcf7ff'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => { toggleSwitchRoom(); pushButtom('room') }}
                        value={isEnabledRoom}
                    />
                    <Text style={style.text}>Room {room}</Text>
                    
                    
                </Pressable>

                <Pressable
                    // style={style.target}
                    style={[
                        style.target, 
                        (isEnabledLiving || living === 'on') ? { backgroundColor: '#fcf7ff' } : { backgroundColor: '#fff' } // Estilo condicional
                    ]}
                    onPress={() => {
                        pushButtom('living')
                        toggleSwitchLiving()
                    }}
                    activeOpacity={1}
                >
                    <Switch
                        style={style.touch}
                        trackColor={{ false: '#9b89b3', true: '#845ec2' }}
                        thumbColor={isEnabledLiving ? '#fcf7ff' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => { toggleSwitchLiving(); pushButtom('room') }}
                        value={isEnabledLiving}
                    />

                    <Text style={style.text}>Living {living}</Text>

                </Pressable>

                <Pressable
                    // style={style.target}
                    style={[
                        style.target, 
                        (isEnabledBathroom || bathroom === 'on') ? { backgroundColor: '#fcf7ff' } : { backgroundColor: '#fff' } // Estilo condicional
                    ]}
                    onPress={() => {
                        pushButtom('bathroom')
                        toggleSwitchBathroom()
                    }}
                    activeOpacity={1}
                >
                    <Switch
                        style={style.touch}
                        trackColor={{ false: '#9b89b3', true: '#845ec2' }}
                        thumbColor={isEnabledBathroom ? '#fcf7ff' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => { toggleSwitchBathroom(); pushButtom('room') }}
                        value={isEnabledBathroom}
                    />

                    <Text style={style.text}>Bathroom {bathroom}</Text>

                </Pressable>

                <Pressable
                    // style={style.target}
                    style={[
                        style.target, 
                        (isEnabledKitchen || kitchen === 'on') ? { backgroundColor: '#fcf7ff' } : { backgroundColor: '#fff' } // Estilo condicional
                    ]}
                    onPress={() => {
                        pushButtom('kitchen')
                        toggleSwitchKitchen()

                    }}
                    activeOpacity={1}
                >
                    <Switch
                        style={style.touch}
                        trackColor={{ false: '#9b89b3', true: '#845ec2' }}
                        thumbColor={isEnabledKitchen ? '#fcf7ff' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => { toggleSwitchKitchen(); pushButtom('room') }}
                        value={isEnabledKitchen}
                    />

                    <Text style={style.text}>Kitchen {kitchen}</Text>

                </Pressable>

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