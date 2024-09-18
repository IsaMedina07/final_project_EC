import { View, Text, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import style from '../../styles/mainStyle'

const Main = () => {
    const [room, setRoom] = useState('off');
    const [living, setLiving] = useState('off');
    const [bathroom, setBathroom] = useState('off');
    const [kitchen, setKitchen] = useState('off');

    const pushButtom = (value) =>{
        switch (value){
            case 'room':
                room=='off' ? setRoom('on') : setRoom('off')
                break
            case 'living':
                living=='off' ? setLiving('on') : setLiving('off')
                break
            case 'bathroom':
                bathroom=='off' ? setBathroom('on') : setBathroom('off')
                break
            case 'kitchen':
                kitchen=='off' ? setKitchen('on') : setKitchen('off')
                break
            default:
                setRoom('off')
                setLiving('off')
                setBathroom('off')
                setKitchen('off')
                break
        }
    }

    return (
        <View style={style.container}>
            <View style={style.exit}>
                <TouchableOpacity><Text>Exit</Text></TouchableOpacity>
            </View>
            <View style = {style.containerLigth}>
                <TouchableOpacity style={style.target} onPress={()=> pushButtom('room')}><Text style={style.text}>Room {room}</Text></TouchableOpacity>
                <TouchableOpacity style={style.target} onPress={()=> pushButtom('living')}><Text style={style.text}>Living {living}</Text></TouchableOpacity>
                <TouchableOpacity style={style.target} onPress={()=> pushButtom('bathroom')}><Text style={style.text}>Bathroom {bathroom}</Text></TouchableOpacity>
                <TouchableOpacity style={style.target} onPress={()=> pushButtom('kitchen')}><Text style={style.text}>Kitchen {kitchen}</Text></TouchableOpacity>
                <TouchableOpacity style={style.button}><Text style={style.text}> Off all </Text></TouchableOpacity>
            </View>
        </View>
    )
}

export default Main