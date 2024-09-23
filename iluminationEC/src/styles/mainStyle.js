import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        padding: 20
    },
    containerLigth:{
        width: '100%',
        maxHeight: '90%',
        alignItems:'center',
        justifyContent: 'space-between',
        gap: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingVertical: 20,

    },
    exit:{
        width: '100%',
        height: 60,
        paddingTop: 30,
    },
    target:{
        minWidth: '47%',
        minHeight: '40%',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#845ec2',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    button:{
        minWidth:'100%',
        padding: 20,
        paddingVertical: 30,
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#845ec2',
        marginTop: 50,
        backgroundColor:'#fff'
    },
    text :{
        fontSize: 17,
        fontWeight: '400',
    },
    touch:{
        position: 'absolute',
        top:10,
        right:15,
    }
})
export default styles
