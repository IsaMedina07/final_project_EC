import React, { createContext, useState, useEffect } from 'react';
import { getDatabase, ref, onValue, update, push } from 'firebase/database';
import appFirebase from './Credentials';
import { Password } from '@mui/icons-material';

const db = getDatabase(appFirebase);

export const ButtonContext = createContext();

export const ButtonProvider = ({ children }) => {
    // const [user, setUser] = useState([]);
    user = { id: 0, name: "admin", Password: "1234" }

    const [rooms, setRooms] = useState({});

    const [approved, setApproved] = useState(false);

    const loadUser = () => {
        const userRef = ref(db, 'users');
        onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            data.map(element => {
                setUser(element)
            });
        });
    };

    const loadRooms = () => {
        const roomRef = ref(db, `users/${user.id}/rooms`);
        onValue(roomRef, (snapshot) => {
            const data = snapshot.val();
            setTimeout(() => {
                setRooms(data)
            }, 1000);
        });
    };

    const toggleRoom = (nameRoom, bool = null) => {
        try {
            const updateRoom = { ...rooms, [nameRoom]: bool };
            const userRef = ref(db, 'users/' + user.id + '/rooms');

            update(userRef, updateRoom)
                .then(() => {
                    setRooms(updateRoom); // Actualiza el estado en el contexto
                })
                .catch((error) => {
                    console.log('Error al actualizar habitación: ', error);
                });

        } catch (error) {
            console.log('Error --> ', error);
        }
    };

    toggleRoom('room', true);

    return (
        <ButtonContext.Provider
            value={{
                approved,
                rooms,
                toggleRoom,
                setApproved,
                // setUser,
                loadUser,
                loadRooms,
            }}
        >
            {children}
        </ButtonContext.Provider>
    );
};
