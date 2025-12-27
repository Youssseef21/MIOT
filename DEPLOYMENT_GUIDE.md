# 🚀 Guide de déploiement Node-RED

## ✅ firebase-admin installé !

## 📋 Étapes pour déployer le flow

### 1️⃣ **Arrêter Node-RED**
Si Node-RED tourne, appuyez sur **Ctrl+C** dans le terminal.

### 2️⃣ **Supprimer les flows existants**

**Option A : Via l'interface Node-RED**
1. Ouvrez http://localhost:1880
2. Onglet **"MIoT REST API"** (ou tout autre onglet existant)
3. Clic droit sur l'onglet → **Delete**
4. Cliquez **Deploy**

**Option B : Supprimer le fichier flows**
```powershell
Remove-Item C:\Users\Youssefh\.node-red\flows.json
```

### 3️⃣ **Redémarrer Node-RED**
```powershell
node-red
```

### 4️⃣ **Importer le flow**
1. Ouvrez http://localhost:1880
2. Menu (☰ en haut à droite) → **Import**
3. Cliquez **select a file to import**
4. Naviguez vers : `C:\Users\Youssefh\Desktop\MIOT\node-red\miot-flow.json`
5. Cliquez **Import**
6. Cliquez **Deploy** (bouton rouge)

### 5️⃣ **Vérifier les statuts**

Dans l'éditeur Node-RED, vérifiez les nœuds :
- **Broker MQTT** : doit être connecté (point vert sous les nœuds MQTT)
- **Save to Firestore** : 
  - 🟢 "Firebase initialized" = OK
  - 🔴 "Init failed" = Problème avec le fichier JSON
  - 🟡 "Memory only" = Firebase non configuré (mais ça fonctionne quand même)

## 🧪 Tester les APIs

### Test 1 : Sensors
```powershell
curl http://localhost:1880/api/sensors
```

**Résultat attendu** :
```json
{"temperature":null,"humidity":null,"luminosity":null}
```

### Test 2 : Devices
```powershell
curl http://localhost:1880/api/devices
```

**Résultat attendu** :
```json
{"led1":"OFF","led2":"OFF","servo":90}
```

### Test 3 : Control (publier sur MQTT)
```powershell
curl -X POST http://localhost:1880/api/control `
  -H "Content-Type: application/json" `
  -d '{\"device\":\"led1\",\"action\":\"ON\"}'
```

**Résultat attendu** :
```json
{"ok":true,"device":"led1","action":"ON","timestamp":"2025-12-26T..."}
```

### Test 4 : History
```powershell
curl http://localhost:1880/api/history
```

## 🔍 Debug des erreurs courantes

### Erreur : "Circular config node dependency"
**Cause** : Il y a déjà un flow avec un broker MQTT qui entre en conflit.

**Solution** : Supprimez tous les flows existants avant d'importer.

### Erreur : "missing broker configuration"
**Cause** : Le broker MQTT n'est pas configuré correctement.

**Solution** :
1. Dans Node-RED, double-cliquez sur un nœud MQTT (ex: "Temperature")
2. Cliquez sur l'icône crayon à côté de "Server"
3. Vérifiez : `localhost:1883`
4. Cliquez **Update** puis **Deploy**

### Erreur : "Firebase init failed"
**Causes possibles** :
- Le fichier JSON n'existe pas au bon endroit
- Le chemin dans le code est incorrect

**Solution** :
Vérifiez le fichier :
```powershell
Test-Path C:\Users\Youssefh\dnje-40900-firebase-adminsdk-fbsvc-2401d4a4be.json
```

Si `False`, déplacez le fichier :
```powershell
Move-Item "C:\Users\Youssefh\Downloads\dnje-40900-*.json" "C:\Users\Youssefh\"
```

### Warning TypeScript dans l'éditeur
**Le warning `.json extension.(2732)` est normal** dans VSCode. Node-RED peut `require()` des fichiers JSON sans problème en runtime.

## 🔥 Vérifier Firebase

1. Ouvrez [Firebase Console](https://console.firebase.google.com/)
2. Sélectionnez votre projet **dnje-40900**
3. Allez dans **Firestore Database**
4. Après avoir testé `/api/control`, vous devriez voir la collection **history** avec des documents

## 📊 Dashboard React

Une fois Node-RED fonctionnel, le dashboard React (déjà en cours d'exécution sur http://localhost:3000) devrait afficher les données en temps réel !

## 🎯 Checklist finale

- [ ] Node-RED démarre sans erreur circulaire
- [ ] Broker MQTT connecté (vérifier dans Node-RED)
- [ ] `/api/sensors` retourne JSON
- [ ] `/api/devices` retourne JSON
- [ ] `/api/control` publie sur MQTT
- [ ] `/api/history` retourne les actions
- [ ] Firebase affiche "initialized" ou fonctionne en mode mémoire
- [ ] Dashboard React affiche les données
- [ ] ESP32 envoie/reçoit via MQTT

---

**En cas de problème**, consultez les logs Node-RED dans le terminal pour plus de détails sur l'erreur.
