import json
import subprocess

try:
    # Intentar cargar data.json y obtener los valores de 'direction' y 'symbol'
    with open('data.json', 'r') as data_file:
        data = json.load(data_file)
        direction = data["data"]["fills"][0]["dir"]
        symbol = data["data"]["fills"][0]["coin"]
except (FileNotFoundError, json.JSONDecodeError, KeyError, IndexError) as e:
    print(f"Error al cargar o procesar data.json: {e}")
else:
    # Condición para Close Long / Close Short
    if direction in ["Close Long", "Close Short"]: 
        try:
            # Cargar statusclose.json y verificar si el símbolo ya existe
            with open('statusclose.json', 'r+') as statusclose_file:
                try:
                    statusclose = json.load(statusclose_file)
                except json.JSONDecodeError:
                    statusclose = []

                # Verificar si el símbolo ya está en el archivo
                if not any(entry["symbol"] == symbol for entry in statusclose):
                    # Añadir nuevo objeto al inicio de la lista
                    new_entry = {"symbol": symbol, "direction": direction}
                    statusclose.insert(0, new_entry)

                    # Eliminar el último objeto si la lista excede su límite
                    if len(statusclose) > 4:  # Cambiar este número según el límite deseado
                        statusclose.pop()

                    # Escribir las actualizaciones en statusclose.json 
                    statusclose_file.seek(0)
                    json.dump(statusclose, statusclose_file, indent=4)
                    statusclose_file.truncate()
                    print("Actualización en statusclose.json completada.")

                    # Inicializar el booleano
                    symbol_updated = False

                    # Verificar y actualizar statusopen.json si es necesario
                    try:
                        with open('statusopen.json', 'r+') as statusopen_file:
                            try:
                                statusopen = json.load(statusopen_file)
                            except json.JSONDecodeError:
                                statusopen = []

                            # Buscar y actualizar el valor de symbol si coincide
                            for entry in statusopen:
                                if entry["symbol"] == symbol:
                                    entry["symbol"] = 'WWW'
                                    symbol_updated = True  # Marcar como encontrado y actualizado

                            # Escribir las actualizaciones en statusopen.json si hubo cambios
                            if symbol_updated:
                                statusopen_file.seek(0)
                                json.dump(statusopen, statusopen_file, indent=4)
                                statusopen_file.truncate()
                                print("Actualización en statusopen.json completada.")
                            else:
                                print("El símbolo no se encontró en statusopen.json.")

                    except FileNotFoundError:
                        print("El archivo statusopen.json no existe.")

                    # Ejecutar paramsclose.py si hubo un cambio
                    try:
                        print("Ejecutando paramsclose.py...")
                        subprocess.run(['python', 'paramsclose.py'], check=True)
                    except subprocess.CalledProcessError:
                        print("Error al ejecutar paramsclose.py.")

                    if symbol_updated:

                        # Verificar y actualizar statusclose.json si es necesario
                        try:
                            with open('statusclose.json', 'r+') as statusclose_file:
                                try:
                                    statusclose = json.load(statusclose_file)
                                except json.JSONDecodeError:
                                    statusclose = []

                                # Buscar y actualizar el valor de symbol si coincide
                                for entry in statusclose:
                                    if entry["symbol"] == symbol:
                                        entry["symbol"] = 'WWW'

                                # Escribir las actualizaciones en statusclose.json
                                statusclose_file.seek(0)
                                json.dump(statusclose, statusclose_file, indent=4)
                                statusclose_file.truncate()
                                print("Actualización en statusclose.json completada.")

                                # Restablecer el valor de symbol_updated a False
                                symbol_updated = False
                        except FileNotFoundError:
                            print("El archivo statusclose.json no existe.")

        except FileNotFoundError:
            print("El archivo statusclose.json no existe.")  
        

    # Condición para Open Long / Open Short
    elif direction in ["Open Long", "Open Short"]:
        try:
            # Cargar statusopen.json y verificar si el símbolo ya existe
            with open('statusopen.json', 'r+') as statusopen_file:
                try:
                    statusopen = json.load(statusopen_file)
                except json.JSONDecodeError:
                    statusopen = []

                # Verificar si el símbolo ya está en el archivo
                if not any(entry["symbol"] == symbol for entry in statusopen):
                    # Añadir nuevo objeto al inicio de la lista
                    new_entry = {"symbol": symbol, "direction": direction}
                    statusopen.insert(0, new_entry)

                    # Eliminar el último objeto si la lista excede su límite
                    if len(statusopen) > 4:  # Cambiar este número según el límite deseado
                        statusopen.pop()

                    # Escribir las actualizaciones en statusopen.json
                    statusopen_file.seek(0)
                    json.dump(statusopen, statusopen_file, indent=4)
                    statusopen_file.truncate()
                    print("Actualización en statusopen.json completada.")

                    # Ejecutar paramsopen.py si hubo un cambio
                    try:
                        print("Ejecutando paramsopen.py...")
                        subprocess.run(['python', 'paramsopen.py'], check=True)
                    except subprocess.CalledProcessError:
                        print("Error al ejecutar paramsopen.py.")
        except FileNotFoundError:
            print("El archivo statusopen.json no existe.")

        # Verificar y actualizar statusclose.json si es necesario
        try:
            with open('statusclose.json', 'r+') as statusclose_file:
                try:
                    statusclose = json.load(statusclose_file)
                except json.JSONDecodeError:
                    statusclose = []

                # Buscar y actualizar el valor de symbol si coincide
                for entry in statusclose:
                    if entry["symbol"] == symbol:
                        entry["symbol"] = 'WWW'

                # Escribir las actualizaciones en statusclose.json
                statusclose_file.seek(0)
                json.dump(statusclose, statusclose_file, indent=4)
                statusclose_file.truncate()
                print("Actualización en statusclose.json completada.")

                # Restablecer el valor de symbol_updated a False
                symbol_updated = False
        except FileNotFoundError:
            print("El archivo statusclose.json no existe.")    
