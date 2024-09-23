import { View, Text, TextInput, TouchableOpacity, Alert, } from 'react-native'
import style from '../../styles/LoginStyle'
import React, { useState, useContext } from 'react'
import { ButtonContext } from "../../../ButtonContext"

const Login = () => {
    const { comparedUser, setApproved, approved } = useContext(ButtonContext);

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        const compared = comparedUser(user.trim().toLowerCase(), password.trim().toLowerCase());

        console.log(compared)

        if(compared){
            setApproved(compared);
            return
        }

        if(user == '' || password == ''){
            Alert.alert('Error', 'Los campos son obligatorios')
        }
        else if(!approved){
            setUser('');
            setPassword('');
            Alert.alert('Error', 'Credenciales incorrectas')
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