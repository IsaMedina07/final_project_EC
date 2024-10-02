import React, { createContext, useState, useEffect } from 'react';
import { getDatabase, ref, onValue, set, update, push } from 'firebase/database';
import appFirebase from './Credentials';

const db = getDatabase(appFirebase);

export const ButtonContext = createContext();

export const ButtonProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [userId, setUserId] = useState(null);
    const [dictRooms, setDictRooms] = useState([]);
    const [roomsUser, setRoomsUser] = useState([]); // [ {id: 0, name: room, status:false} ]
    const [approved, setApproved] = useState(false);

    useEffect(() => {
        const reference = ref(db, 'users/');
        onValue(reference, (snapshot) => {
            const datos = snapshot.val();
            const newUsers = Object.keys(datos).map(key => ({
                id: key,
                ...datos[key],
            }))
            // console.log(newUsers);
            setData(newUsers);
        });

        if (!userId) return; // No ejecuta si no hay usuario

        const roomRef = ref(db, `users/${userId}/rooms`);

        const unsubscribe = onValue(roomRef, (snapshot) => {
            const roomsData = snapshot.val();
            if (roomsData) {
                setDictRooms(roomsData); // Actualizamos el estado de las habitaciones
                listRooms(roomsData); // Llamamos a listRooms para formatear las habitaciones
            }
        });

        // Cleanup cuando se desmonte el componente o cambie el userId
        return () => unsubscribe();

    }, [userId])

    const updateRoom = (room, status) => {
        update(ref(db, `users/${userId}/rooms`), {
            [room]: status,
        });

        const ferencia = ref(db, `users/${userId}/rooms`);
        onValue(ferencia, (snapshot) => {
            const datos = snapshot.val();
            // console.log('Datos --> ', datos);
            setDictRooms(datos);
        })
    }

    const findUser = (name, password) => {
        for (let i of data) {
            if ((i.name).trim().toLowerCase() == name && (i.password).trim().toLowerCase() == password) {
                return i
            }
        }
        return null
    }

    const listRooms = (dict = null) => {
        const names = Object.keys(dict || dictRooms);
        const arrayRooms = names.map((name, index) => ({
            id: index,
            name,
            status: dict ? dict[name] : dictRooms[name]
        }));

        setRoomsUser(arrayRooms);
    };


    return (
        <ButtonContext.Provider
            value={{
                data,
                approved,
                roomsUser,
                setUserId,
                setDictRooms,
                updateRoom,
                findUser,
                setApproved,
                listRooms,
            }}
        >
            {children}
        </ButtonContext.Provider>
    );
};
