import json
import subprocess

try:
    # Intentar cargar statusopen.json y obtener 'symbol' y 'direction' del primer objeto de la lista
    with open('statusopen.json', 'r') as file:
        statusopen = json.load(file)
        
        # Asegurarse de que statusopen sea una lista y tenga al menos un elemento
        if isinstance(statusopen, list) and statusopen:
            first_object = statusopen[0]
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

    # Definir un tiempo de espera para los comandos de subprocess
    timeout_seconds = 180  # Ajusta el tiempo de espera según sea necesario

    if symbolok:
        # Ejecutar el script adecuado según el valor de 'direction'
        try:
            if direction == 'Open Long':
                print(f"Ejecutando long.js con el símbolo {symbolok}...")
                subprocess.run(["node", "long.js", symbolok], timeout=timeout_seconds, check=True)
            elif direction == 'Open Short':
                print(f"Ejecutando short.js con el símbolo {symbolok}...")
                subprocess.run(["node", "short.js", symbolok], timeout=timeout_seconds, check=True)
            else:
                # Manejo para cuando el valor de 'direction' no es válido
                print("Error: Valor de dirección no reconocido. Se esperaba 'Open Long' o 'Open Short'.")
        except subprocess.TimeoutExpired:
            print(f"Error: El script tomó más de {timeout_seconds} segundos y fue detenido.")
        except subprocess.CalledProcessError as e:
            print(f"Error: El script falló con un código de error {e.returncode}.")
        except Exception as e:
            print(f"Error inesperado al ejecutar el script: {e}")
    else:
        print("Error: 'symbol' es inválido o no está presente en statusopen.json.")
