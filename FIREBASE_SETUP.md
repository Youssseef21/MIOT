# Configuration Firebase pour Node-RED

## 📋 Étapes d'installation

### 1. Installer firebase-admin sur Raspberry Pi

```bash
cd ~/.node-red
npm install firebase-admin
```

### 2. Créer un projet Firebase

1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Créez un nouveau projet ou sélectionnez un existant
3. Activez **Cloud Firestore** :
   - Console Firebase → Build → Firestore Database
   - Créer une base de données
   - Mode : **Production** (avec règles de sécurité)

### 3. Télécharger la clé de service

1. Console Firebase → ⚙️ Paramètres du projet → Comptes de service
2. Cliquez sur **Générer une nouvelle clé privée**
3. Téléchargez le fichier `serviceAccountKey.json`
4. Transférez-le sur votre Raspberry Pi :

```bash
# Sur votre PC (PowerShell)
scp serviceAccountKey.json pi@raspberrypi.local:/home/pi/

# OU copiez manuellement via WinSCP/FileZilla
```

### 4. Configurer les permissions

```bash
# Sur Raspberry Pi
chmod 600 /home/pi/serviceAccountKey.json
```

### 5. Mettre à jour le flow Node-RED

Dans le flow JSON, la ligne 372 contient :
```javascript
const serviceAccount = require('/home/pi/serviceAccountKey.json');
```

**Si vous placez le fichier ailleurs**, modifiez ce chemin.

### 6. Importer et déployer

1. Ouvrez Node-RED : `http://raspberrypi.local:1880`
2. Menu → Import → sélectionnez `node-red/miot-flow.json`
3. Cliquez sur **Deploy**

## ✅ Vérification

### Test d'écriture
```bash
curl -X POST http://raspberrypi.local:1880/api/control \
  -H "Content-Type: application/json" \
  -d '{"device":"led1","action":"ON"}'
```

Vérifiez dans **Firebase Console** → Firestore → collection `history`

### Test de lecture
```bash
curl http://raspberrypi.local:1880/api/history
```

## 🔍 Statuts des nœuds

- 🟢 **"Saved to Firebase"** → Écriture réussie
- 🟡 **"Memory only"** → Firebase non configuré, données en mémoire uniquement
- 🔴 **"Init failed"** → Erreur d'initialisation (vérifier le chemin du fichier JSON)

## 🔒 Règles de sécurité Firestore (production)

Dans Firebase Console → Firestore → Rules :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /history/{document=**} {
      // Lecture publique
      allow read: if true;
      
      // Écriture depuis serveur uniquement (via SDK Admin)
      allow write: if false;
    }
  }
}
```

## 🎯 Structure des données

**Collection** : `history`

**Document** :
```json
{
  "timestamp": "2025-12-26T14:30:00.000Z",
  "device": "led1",
  "action": "ON",
  "source": "Dashboard"
}
```

## 🛠️ Dépannage

### Erreur "Cannot find module firebase-admin"
```bash
cd ~/.node-red
npm install firebase-admin
# Redémarrez Node-RED
sudo systemctl restart nodered
```

### Erreur "serviceAccountKey.json not found"
Vérifiez le chemin dans la fonction `fn-firebase-log` (ligne 372 du flow JSON)

### Firebase fonctionne mais données non visibles
- Vérifiez les règles de sécurité Firestore
- Consultez les logs Node-RED : Menu → View → Debug messages
