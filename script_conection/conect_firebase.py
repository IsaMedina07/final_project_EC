import firebase_admin
from firebase_admin import credentials, db
import asyncio

# Inicializar la conexión con Firebase
cred = credentials.Certificate("./inluminationec-firebase-adminsdk-zvl6z-50bdc72b06.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://inluminationec-default-rtdb.firebaseio.com/'
})

async def get_data_from_firebase():
    ref = db.reference('users/1/rooms')
    data = ref.get()
    return data

async def listen_for_changes():
    ref = db.reference('users/1/rooms')
    response = {}

    def listener(event):
        print(f"Tipo de evento: {event.event_type}")  # Tipo de evento (put, patch, etc.)
        print(f"Ruta del cambio: {event.path}")  # Ruta exacta donde ocurrió el cambio
        print(f"Datos actualizados: {event.data}")  # Datos nuevos o modificados

        # Si quieres obtener la clave exacta del objeto modificado
        key = event.path.split('/')[-1]  # La clave es la última parte de la ruta
        print(f"Clave del objeto cambiado: {key}")

        value = event.data

        response = {key: value}
        print(f'Respuesta --> {response}')
    print('------- ------- // ------- ------- // ------- -------')
    ref.listen(listener)

async def update_data_in_firebase(room, status):
    ref = db.reference(f'users/1/rooms')  # Cambia la habitación por la clave que desees modificar
    
    # Datos que deseas actualizar
    updated_data = {
        f"{room}": status  # Solo cambiar el campo 'room' a el estado deseado
    }

    # Actualiza parcialmente los datos en la habitación sin reemplazar el objeto completo
    ref.update(updated_data)
    print(f"Datos en la habitación actualizados parcialmente: {updated_data}")

async def main():
    initial_data = await get_data_from_firebase()
    print(f"Datos iniciales: {initial_data}")
    # Escucha los cambios en la base de datos
    await listen_for_changes()
    
    # Realiza una actualización de los datos
    await update_data_in_firebase('room', bool(0))
    

# if __name__ == "__main__":
#     asyncio.run(main())
asyncio.run(main())

