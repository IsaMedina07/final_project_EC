import socket
import threading
import time
import firebase_admin
from firebase_admin import credentials, db
import asyncio

# Variables globales
cambio_en_la_base_de_datos = ''
cambio_detectado = False
cambio_iniciado_desde_yat = False  # Nueva variable de control

# Inicializar la conexión con Firebase
cred = credentials.Certificate("../../script_conection/inluminationec-firebase-adminsdk-zvl6z-50bdc72b06.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://inluminationec-default-rtdb.firebaseio.com/'
})

client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client_socket.connect(('192.168.254.184', 2323))

# Envío del mensaje "dummy" para sincronización
print('------- ------- ------- -------')
print("Preparando el socket, enviando mensaje de sincronización inicial...")
print('------- ------- ------- -------\n')

cambio_inicial = False
client_socket.sendall(b"ready\n")  # Mensaje "dummy" inicial

async def get_data_from_firebase():
    ref = db.reference('users/1/rooms/')
    data = ref.get()    # función para obtener los datos
    return data

async def listen_for_changes():
    ref = db.reference('users/1/rooms/')

    def listener(event):
        global cambio_en_la_base_de_datos, cambio_detectado, cambio_iniciado_desde_yat
        value = str(event.data)

        init = value.find(':')

        # print(f'Clave --> {value[2:init-1]} Valor --> {value[init+2:-1]}')

        if cambio_iniciado_desde_yat:
            # Si el cambio proviene del microcontrolador (YAT), lo ignoramos
            cambio_iniciado_desde_yat = False  # Reseteamos la variable
            # print("Cambio iniciado desde YAT, no se procesará en Firebase.")
            return

        if(cambio_inicial):
            cambio_en_la_base_de_datos = (str(f'{value[2:init-1]}:{value[init+2:-1]}'))
            cambio_detectado = True
            # print(f"Evento detectado en Firebase: {cambio_en_la_base_de_datos}")

    ref.listen(listener)

async def update_data_in_firebase(room, status):
    global cambio_iniciado_desde_yat
    ref = db.reference(f'users/1/rooms/')
    updated_data = {f"{room}": status}
    cambio_iniciado_desde_yat = True  # Activamos la bandera cuando hacemos un cambio desde YAT
    ref.update(updated_data)
    print(f"Datos actualizados desde el Huart:\n        {updated_data}\n")

async def main(key='', value=''):
    if key and value is not None:
        await update_data_in_firebase(key, value)

# Datos que recibe la consola del Huart [ HUART ----> CONSOLE ]
def receive_data():
    variable = ''
    while True:
        variable = client_socket.recv(1024).decode()
        cont = variable.find(":")
        name = variable[0:cont]
        # status = bool((variable[cont + 1:]))
        status = bool(int(variable[cont + 1:]))

        print(f"-- VARIABLE -- : {variable}")

        # print(f"NAME --> {name} \nSTATUS --> {status}")
        asyncio.run(main(name, status))

# Función principal para controlar el listener y actualización
async def run_firebase_listener():
    global cambio_inicial
    initial_data = await get_data_from_firebase()
    print(f"Datos iniciales: {initial_data}\n")
    await listen_for_changes()
    time.sleep(1)
    cambio_inicial = True

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
        print(f"Cambio desde la App:\n          {cambio_en_la_base_de_datos}\n")

        # Datos que recibe la el huart del parámetro a enviar [ Change ----> HUART ]
        client_socket.sendall(str(cambio_en_la_base_de_datos).encode()+ b'\n')
        cambio_detectado = False  # Reseteamos la variable para esperar nuevos cambios
    
    # Añadimos un pequeño retraso para evitar sobrecargar la CPU
    time.sleep(1)
