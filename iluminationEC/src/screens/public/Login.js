import { View, Text, TextInput, TouchableOpacity, Alert, } from 'react-native'
import style from '../../styles/LoginStyle'
import React, { useState, useContext } from 'react'
import { ButtonContext } from "../../../ButtonContext"

const Login = () => {
    const { setUserId, findUser, setApproved, approved, listRooms, setDictRooms } = useContext(ButtonContext);

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async() => {
        const compared = findUser(user.trim().toLowerCase(), password.trim().toLowerCase());
        
        if (compared) {
            await setUserId(compared.id);
            await setDictRooms(compared.rooms);
            await listRooms(compared.rooms);
            await setApproved(true);
            setUser('');
            setPassword('');
            return
        }

        if (user == '' || password == '') {
            Alert.alert('Error', 'Los campos son obligatorios');
        }
        else if (!approved) {
            setUser('');
            setPassword('');
            await setDictRooms({});
            Alert.alert('Error', 'Credenciales incorrectas');
        }
    }


    return (
        <View style={style.container}>
            <View style={style.containerInput}>
                <TextInput
                    style={style.input}
                    placeholder="Email"
                    keyboardType="default"
                    placeholderTextColor={"#9b89b3"}
                    onChangeText={(valor) => setUser(valor)}
                    value={user}
                />
                <TextInput
                    style={style.input}
                    placeholder="Password"
                    placeholderTextColor={"#9b89b3"}
                    secureTextEntry
                    onChangeText={text => setPassword(text)}
                    value={password}
                />
            </View>
            <TouchableOpacity
                style={style.button}
                onPress={handleLogin}
            >
                <Text style={style.text}>Login</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login