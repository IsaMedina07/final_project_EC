import socket, threading, time
import firebase_admin
from firebase_admin import credentials, db
import asyncio
import json

# Variables globales
cambio_en_la_base_de_datos = {}
cambio_detectado = False  # Variable para indicar si hubo un cambio

# Inicializar la conexión con Firebase
cred = credentials.Certificate("./inluminationec-firebase-adminsdk-zvl6z-50bdc72b06.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://inluminationec-default-rtdb.firebaseio.com/'
})

client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client_socket.connect(('192.168.254.184', 2323))

# Envío del mensaje "dummy" para sincronización
print("Preparando el socket, enviando mensaje de sincronización inicial...")
client_socket.sendall(b"ready\n")  # Mensaje "dummy" inicial

async def get_data_from_firebase():
    ref = db.reference('users/1/rooms')
    data = ref.get()    # función para obtener los datos
    return data

async def listen_for_changes():
    ref = db.reference('users/1/rooms')

    def listener(event):
        global cambio_en_la_base_de_datos, cambio_detectado
        key = event.path.split('/')[-1]
        value = event.data

        if key != '' and value is not None:
            # Reemplazar el diccionario completo con la nueva clave-valor
            # cambio_en_la_base_de_datos = {key: value} # Formato json (dict)
            cambio_en_la_base_de_datos = str(f'{key}:{value}')  # Formato str
            cambio_detectado = True  # Indicar que ha habido un cambio

    ref.listen(listener)

async def update_data_in_firebase(room, status):
    ref = db.reference(f'users/1/rooms')
    updated_data = {f"{room}": status}
    ref.update(updated_data)
    print(f"Datos en la habitación actualizados: {updated_data}")

async def main(key='', value=''):
    if key and value is not None:
        await update_data_in_firebase(key, value)

def receive_data():
    variable = ''
    while True:
        variable = client_socket.recv(1024).decode()
        cont = variable.find(":")
        name = variable[0:cont]
        status = bool(int(variable[cont + 1:]))

        print(f"NAME --> {name} \nSTATUS --> {status}")
        asyncio.run(main(name, status))

# Función principal para controlar el listener y actualización
async def run_firebase_listener():
    initial_data = await get_data_from_firebase()
    print(f"Datos iniciales: {initial_data}")
    await listen_for_changes()

# Ejecutar el listener en un hilo separado
threading.Thread(target=lambda: asyncio.run(run_firebase_listener()), daemon=True).start()

# Start the receiving thread
threading.Thread(target=receive_data, daemon=True).start()

# Pequeña pausa para asegurar que la conexión esté lista
time.sleep(1)

# Bucle principal para imprimir solo cuando hay un cambio
while True:
    # Solo imprimimos cuando se detecta un cambio
    if cambio_detectado:
        print(f"Cambio detectado: {cambio_en_la_base_de_datos}")

        client_socket.sendall(str(cambio_en_la_base_de_datos).encode() + b'\n')
        cambio_detectado = False  # Reseteamos la variable para esperar nuevos cambios
    
    # Añadimos un pequeño retraso para evitar sobrecargar la CPU
    time.sleep(1)
