# Configuration Mosquitto sur PC Windows

## 📍 Architecture actuelle

```
PC Windows (Mosquitto Broker)
    ↕ MQTT
ESP32 (capteurs + actionneurs)
    ↕ MQTT
Node-RED (APIs REST) ← React Dashboard
```

## ⚙️ Configuration du flow Node-RED

### 1. Obtenir l'adresse IP de votre PC

```powershell
ipconfig
```

Cherchez l'adresse IPv4 (ex: `192.168.1.100`)

### 2. Mettre à jour le broker MQTT dans le flow

Dans [node-red/miot-flow.json](node-red/miot-flow.json), ligne ~680 :

```json
"broker": "YOUR_PC_IP_ADDRESS"
```

Remplacez par votre IP, exemple :
```json
"broker": "192.168.1.100"
```

### 3. Vérifier Mosquitto (sur votre PC)

```powershell
# Vérifier que Mosquitto écoute
netstat -an | findstr 1883

# Tester la connexion
mosquitto_sub -h localhost -t "miot/#" -v
```

### 4. Configuration Firewall Windows

Assurez-vous que le port 1883 est ouvert :

```powershell
# Ouvrir le port MQTT (si pas déjà fait)
New-NetFirewallRule -DisplayName "Mosquitto MQTT" -Direction Inbound -LocalPort 1883 -Protocol TCP -Action Allow
```

## 🔧 Configuration ESP32

Vos ESP32 doivent pointer vers l'IP du PC :

```cpp
const char* mqtt_server = "192.168.1.100"; // IP de votre PC
const int mqtt_port = 1883;
```

## 🌐 Configuration Node-RED

Si Node-RED tourne **sur Raspberry Pi** :
- Le broker MQTT dans le flow doit utiliser l'IP du PC Windows
- Node-RED expose les APIs REST sur port 1880

Si Node-RED tourne **sur le PC Windows** :
- Changez `broker: "localhost"` dans le flow
- Les APIs seront sur `http://localhost:1880`
- Mettez à jour [src/services/api.js](src/services/api.js) :
  ```javascript
  baseURL: 'http://localhost:1880'
  ```

## 📊 Topics MQTT déjà configurés

D'après votre setup :
- `miot/dht22/temperature`
- `miot/dht22/humidity`
- `miot/ldr/raw`
- `miot/ir/code`
- `miot/ir/led1`
- `miot/ir/led2`
- `miot/ir/servo`

## ✅ Test de bout en bout

### 1. Publier depuis ESP32 → PC
```cpp
client.publish("miot/dht22/temperature", "22.5");
```

### 2. Vérifier réception sur PC
```powershell
mosquitto_sub -h localhost -t "miot/#" -v
```

### 3. Tester l'API Node-RED
```bash
curl http://NODE_RED_IP:1880/api/sensors
```

### 4. Tester depuis Dashboard React
Le dashboard devrait afficher les données en temps réel (polling toutes les 5s)

## 🚨 Où tourne Node-RED ?

**Option A : Node-RED sur Raspberry Pi**
```
PC (Mosquitto) ← MQTT → ESP32
       ↓ MQTT
Raspberry Pi (Node-RED) ← HTTP → Dashboard React (PC)
```

**Option B : Node-RED sur PC (même machine que Mosquitto)**
```
PC (Mosquitto + Node-RED) ← MQTT → ESP32
              ↓ HTTP (localhost)
     Dashboard React (PC)
```

Dites-moi où tourne Node-RED pour que j'adapte la config exacte !
