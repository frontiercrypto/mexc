import json
import subprocess

try:
    # Intentar cargar statusclose.json y obtener 'symbol' y 'direction' del primer objeto de la lista
    with open('statusclose.json', 'r') as file:
        statusclose = json.load(file)
        
        # Asegurarse de que statusclose sea una lista y tenga al menos un elemento
        if isinstance(statusclose, list) and statusclose:
            first_object = statusclose[0]
            symbol = first_object.get("symbol")
            direction = first_object.get("direction")
        else:
            raise ValueError("El archivo no contiene una lista válida o está vacío.")

except (FileNotFoundError, json.JSONDecodeError, ValueError) as e:
    print(f"Error al cargar o procesar statusopen.json: {e}")

else:
    # Crear la variable symbolok añadiendo "_USDT" a symbol si es válido,
    # y eliminando la primera "k" si existe.
    if symbol:
        if symbol.startswith('k'):
            symbol = symbol[1:]  # Elimina la primera letra si es "k"
        symbolok = f"{symbol}_USDT"
    else:
        symbolok = None

    # Verificar si symbolok es válido y ejecutar close.js
    if symbolok:
        try:
            print(f"Ejecutando close.js con el símbolo {symbolok}...")
        except subprocess.TimeoutExpired:
            print("Error: close.js superó el tiempo de espera de 400 segundos.")
        except subprocess.CalledProcessError as e:
            print(f"Error: close.js falló con un código de error {e.returncode}.")
        except Exception as e:
            print(f"Error inesperado al ejecutar close.js: {e}")
    else:
        print("Error: 'symbol' es inválido o no está presente en statusclose.json.")
