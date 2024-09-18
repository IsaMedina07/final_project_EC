import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fcf7ff',
        width: '100%',
        height: '100%',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 50,
    },
    containerInput:{
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20
    },
    input:{
        padding: 10,
        paddingLeft: 30,
        minWidth: '77%',
        borderWidth:0.5,
        borderRadius: 15,
        fontSize: 15,
    },
    button: {
        backgroundColor: '#845ec2',
        minWidth: '50%',
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 50
    },
    text:{
        color:'#fcf7ff'
    }
})
export default  styles;