import React, {createContext, useState, useEffect} from 'react'
// import AsyncStorage from '@react-native-async-storage/async-storage'

// Importaciones de firebase
import appFirebase from './Credentials'
import {getFirestore, collection, getDocs, doc, setDoc, onSnapshot, updateDoc } from 'firebase/firestore' // Tiempo real: onSnapshot

const db = getFirestore(appFirebase);

export const ButtonContext = createContext();

export const TokenProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState(null);

    const [Room, setRoom] = useState(false);
    const [Living, setLiving] = useState(false);
    const [Bathroom, setBathroom] = useState(false);
    const [Kitchen, setKitchen] = useState(false);

    const [approved, setApproved] = useState(false);

    useEffect(() => {
        const loadUser = () =>{
            /*const storedData = await getDocs(collection(db, 'Usuarios'));
            const userData = [];
            
            storedData.forEach(doc => {
                userData.push({ 
                    id: doc.id, 
                    ...doc.data(),
                });
            });
            
            setUser(userData[0].nombre)
            setPassword(userData[0].contrasena);*/

            // Forma en tiempo real:
            onSnapshot(collection(db, 'Usuarios'), query =>{
                const userData = [];
                query.forEach(doc =>{
                    userData.push({
                        id:doc.id,
                        ...doc.data(),
                    })
                })
                
                setUser(userData[0].nombre)
                setPassword(userData[0].contrasena);
            })
        }

        const loadRooms = () =>{
            onSnapshot(collection(db, 'Habitaciones'), query =>{
                const roomsData = [];
                query.forEach(doc =>{
                    roomsData.push({
                        id:doc.id,
                        ...doc.data(),
                    })
                })

                setRoom(roomsData[0].room);
                setLiving(roomsData[0].living);
                setBathroom(roomsData[0].bathroom);
                setKitchen(roomsData[0].kitchen);
            })
        }

        loadUser();
        loadRooms();

        // console.log('\nUsuario:',user,'\nContraseña:', password, '\nCuarto:',Room, '\nSala:',Living, '\nBaño:',Bathroom, '\nCocina:',Kitchen)

    }, [user, approved, password, Room, Living, Bathroom, Kitchen]);

    const toggleRoom = (roomType, bool=null) => {
        try {
            const roomDocRef = doc(db, 'Habitaciones', 'Mkjwqkvf5meuq2wkgLHz');

            if(bool == null){
                updateDoc(roomDocRef, {
                    [roomType]: !Room
                });
                setRoom(!Room)
            }else{
                updateDoc(roomDocRef, {
                    [roomType]: bool
                });
            }
    
        } catch (error) {
            console.log('Error --> ', error);
        }
    };

    const comparedUser = (getUserData, getPasswordData) =>{
        return (user === getUserData && password === getPasswordData) ? true : false;
    }

    return (
        <ButtonContext.Provider 
            value = {{ user, approved, password, Room, Living, Bathroom, Kitchen, toggleRoom, comparedUser, setApproved }}>
                {children}
        </ButtonContext.Provider>
    );
};
