import asyncio
import websockets
import json
import os
import time
import subprocess

def save_webhook_data(data):
    """Save only the first entry from fills array in data.json."""
    if "data" in data and "fills" in data["data"] and isinstance(data["data"]["fills"], list) and data["data"]["fills"]:
        # Keep only the first item in fills
        data["data"]["fills"] = [data["data"]["fills"][0]]
    else:
        raise ValueError("Expected data structure not found in input")

    with open("data.json", "w") as f:
        json.dump(data, f, indent=4)
    print("First entry of fills array saved to data.json")


def run_data_script():
    """Run data.py as a subprocess."""
    subprocess.run(["python", "data.py"])
    print("Executed data.py")

def check_for_file_update(file_path, last_modified_time):
    """Check if the file has been updated by comparing its last modified time."""
    try:
        current_modified_time = os.path.getmtime(file_path)
        if current_modified_time != last_modified_time:
            return current_modified_time  # Return new modified time if file was updated
    except FileNotFoundError:
        print(f"File {file_path} not found.")
    return last_modified_time

async def subscribe_and_listen():
    uri = "wss://api.hyperliquid.xyz/ws"
    user_address = "0x399965e15d4e61ec3529cc98b7f7ebb93b733336"
    data_file = "data.json"
    last_modified_time = 0  # Initial timestamp

    subscription_message = {
        "method": "subscribe",
        "subscription": {
            "type": "userFills",
            "user": user_address
        }
    }
    ping_message = {"method": "ping"}

    while True:  # Retry loop for reconnection attempts
        try:
            async with websockets.connect(uri) as websocket:
                await websocket.send(json.dumps(subscription_message))
                print("Subscribed to userFills for user:", user_address)

                # Establecer el tiempo de inicio para el período de cuenta atrás
                ignore_until = time.time() + 10  # Ignorar mensajes durante los próximos 10 segundos

                async def send_heartbeat():
                    """Send a heartbeat (ping) message every 55 seconds."""
                    while True:
                        await asyncio.sleep(55)
                        await websocket.send(json.dumps(ping_message))
                        print("Sent ping")

                # Start the heartbeat task
                heartbeat_task = asyncio.create_task(send_heartbeat())

                # Listen for incoming messages
                while True:
                    response = await websocket.recv()
                    data = json.loads(response)

                    # Ignorar mensajes durante los primeros 10 segundos
                    if time.time() < ignore_until:
                        print("Ignoring message due to countdown:", data)
                        continue

                    if data.get("channel") == "userFills":
                        print("Received userFills update:", data)
                        save_webhook_data(data)  # Save the incoming data to data.json
                        # Check if data.json has been modified
                        last_modified_time = check_for_file_update(data_file, last_modified_time)
                        if last_modified_time:
                            run_data_script()  # Run data.py if data.json was updated

        except websockets.exceptions.ConnectionClosed as e:
            print(f"Connection closed with error: {e}. Retrying in 5 seconds...")
            await asyncio.sleep(3)  # Wait before reconnecting
        except Exception as e:
            print(f"An unexpected error occurred: {e}. Retrying in 5 seconds...")
            await asyncio.sleep(3)  # Handle other exceptions and retry

# Run the main function
asyncio.run(subscribe_and_listen())
