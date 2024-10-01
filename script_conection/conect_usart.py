import socket, threading, time
import firebase_admin
from firebase_admin import credentials, db
import asyncio
import json

cambio_en_la_base_de_datos = {}

# Inicializar la conexión con Firebase
cred = credentials.Certificate("./inluminationec-firebase-adminsdk-zvl6z-50bdc72b06.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://inluminationec-default-rtdb.firebaseio.com/'
})

client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client_socket.connect(('192.168.254.184', 2323))

async def get_data_from_firebase():
    ref = db.reference('users/1/rooms')
    data = ref.get()
    return data

async def listen_for_changes():
    ref = db.reference('users/1/rooms')
    response = {}

    def listener(event):
        # print(f"Tipo de evento: {event.event_type}")  # Tipo de evento (put, patch, etc.)
        # print(f"Ruta del cambio: {event.path}")  # Ruta exacta donde ocurrió el cambio
        # print(f"Datos actualizados: {event.data}")  # Datos nuevos o modificados

        # Si quieres obtener la clave exacta del objeto modificado
        key = event.path.split('/')[-1]  # La clave es la última parte de la ruta
        # print(f"Clave del objeto cambiado: {key}")

        value = event.data

        if(key != ''):
            # cambio_en_la_base_de_datos = {key: value}
            cambio_en_la_base_de_datos = str(f'{key}:{value}')
            print(f'CAMBIO EN LA DB --> {cambio_en_la_base_de_datos}')
            
    print('------- ------- // ------- ------- // ------------')
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

async def main(key = '', value = ''):
    initial_data = await get_data_from_firebase()
    print(f"Datos iniciales: {initial_data}")
    # Escucha los cambios en la base de datos
    await listen_for_changes()
    
    # Realiza una actualización de los datos
    if(key != '' and value != ''):
        await update_data_in_firebase(key, value)

def receive_data():
    # Del UART2 a la consola
    variable = ''
    while True:
        # print(client_socket.recv(1024).decode())
        variable = (client_socket.recv(1024).decode())
        cont = variable.find(":")
        name = variable[0:cont]
        status = bool(int(variable[cont+1:]))

        print(f"NAME --> {name} \nSTATUS --> {status}")
        asyncio.run(main(name, status))


# Start the receiving thread
threading.Thread(target=receive_data, daemon=True).start()

# Small delay to ensure the connection is ready
# time.sleep(1)

# Main loop for sending commands
while True:
    # De la consola al UART2

    asyncio.run(main())

    print(cambio_en_la_base_de_datos)

    # client_socket.sendall(input().encode() + b'\n')
    # clave = input('Ingrese el nombre del cuarto --> ')
    # valor = bool(int(input('Ingrese el estado del cuarto --> ')))
    # asyncio.run(main(clave, valor))
    


