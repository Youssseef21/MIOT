# Guide Firebase pour Windows + Node-RED

## 🔥 Configuration Firebase (étape par étape)

### 1️⃣ Créer un projet Firebase

1. Allez sur **[Firebase Console](https://console.firebase.google.com/)**
2. Cliquez sur **"Ajouter un projet"** ou sélectionnez un existant
3. Nommez-le : `miot-control-system`

### 2️⃣ Activer Firestore Database

1. Dans Firebase Console → Menu **"Build"** → **"Firestore Database"**
2. Cliquez **"Créer une base de données"**
3. Sélectionnez le mode :
   - **Production** (recommandé) - avec règles de sécurité
   - Région : `europe-west1` (plus proche)
4. Cliquez **"Activer"**

### 3️⃣ Télécharger la clé de service (Service Account)

1. Dans Firebase Console → **⚙️ Paramètres du projet** (roue dentée en haut)
2. Onglet **"Comptes de service"**
3. Cliquez sur **"Générer une nouvelle clé privée"**
4. Un fichier JSON sera téléchargé : `miot-control-system-xxxxx-firebase-adminsdk-xxxxx.json`
5. **Renommez-le** en `serviceAccountKey.json`

### 4️⃣ Placer le fichier sur Windows

**Option A : Dans votre dossier utilisateur (recommandé)**
```
C:\Users\Youssefh\serviceAccountKey.json
```

**Option B : Avec le projet**
```
C:\Users\Youssefh\Desktop\MIOT\serviceAccountKey.json
```

### 5️⃣ Mettre à jour le chemin dans le flow Node-RED

Ouvrez [node-red/miot-flow.json](node-red/miot-flow.json) et modifiez la ligne 341 :

**Remplacez :**
```javascript
const serviceAccount = require('/home/pi/serviceAccountKey.json');
```

**Par (Option A) :**
```javascript
const serviceAccount = require('C:/Users/Youssefh/serviceAccountKey.json');
```

**Ou (Option B) :**
```javascript
const serviceAccount = require('C:/Users/Youssefh/Desktop/MIOT/serviceAccountKey.json');
```

⚠️ **Important** : Utilisez des slashes `/` (pas `\\`) même sur Windows dans le code JavaScript !

### 6️⃣ Installer firebase-admin dans Node-RED

Si Node-RED est installé **globalement** :
```powershell
cd C:\Users\Youssefh\.node-red
npm install firebase-admin
```

Si Node-RED est installé **localement** dans le projet :
```powershell
cd C:\Users\Youssefh\Desktop\MIOT
npm install firebase-admin
```

### 7️⃣ Redémarrer Node-RED

```powershell
# Si Node-RED tourne en service
net stop node-red
net start node-red

# Si Node-RED tourne en terminal
# Appuyez sur Ctrl+C puis relancez
node-red
```

### 8️⃣ Importer le flow et déployer

1. Ouvrez Node-RED : `http://localhost:1880`
2. Menu (☰) → **Import** → **select a file to import**
3. Sélectionnez `C:\Users\Youssefh\Desktop\MIOT\node-red\miot-flow.json`
4. Cliquez **Import**
5. Cliquez **Deploy** (bouton rouge en haut à droite)

## ✅ Vérifier que Firebase fonctionne

### Dans Node-RED (Debug sidebar)

Après avoir cliqué Deploy, regardez les messages de debug :
- 🟢 **"Firebase initialized"** → Firebase connecté ✅
- 🔴 **"Init failed"** → Problème avec le chemin ou le fichier JSON
- 🟡 **"Memory only"** → Firebase désactivé, mode mémoire

### Tester l'écriture

```powershell
curl -X POST http://localhost:1880/api/control `
  -H "Content-Type: application/json" `
  -d '{"device":"led1","action":"ON"}'
```

### Vérifier dans Firebase Console

1. Firebase Console → **Firestore Database**
2. Vous devriez voir une collection **`history`**
3. Avec des documents contenant :
   ```json
   {
     "timestamp": "2025-12-26T...",
     "device": "led1",
     "action": "ON",
     "source": "Dashboard"
   }
   ```

### Tester la lecture

```powershell
curl http://localhost:1880/api/history
```

Devrait retourner les 20 dernières actions.

## 🔒 Règles de sécurité Firestore

Dans Firebase Console → **Firestore Database** → **Règles** :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /history/{document=**} {
      // Lecture publique (pour le dashboard)
      allow read: if true;
      
      // Écriture uniquement via Firebase Admin SDK
      allow write: if false;
    }
  }
}
```

Cliquez **"Publier"** pour appliquer les règles.

## 🛠️ Dépannage

### Erreur : "Cannot find module 'firebase-admin'"
```powershell
cd C:\Users\Youssefh\.node-red
npm install firebase-admin
# Redémarrer Node-RED
```

### Erreur : "Cannot find module 'C:/Users/.../serviceAccountKey.json'"
- Vérifiez le chemin exact du fichier
- Assurez-vous d'utiliser des `/` et non des `\`
- Le fichier doit être `serviceAccountKey.json` (pas un autre nom)

### Firebase ne s'initialise pas
1. Vérifiez les logs Node-RED (Debug sidebar)
2. Vérifiez que le fichier JSON est valide
3. Assurez-vous que le projet Firebase existe et Firestore est activé

### Les données n'apparaissent pas dans Firestore
- Vérifiez que le nœud affiche "Saved to Firebase" (vert)
- Consultez les règles de sécurité Firestore
- Vérifiez la console Debug dans Node-RED pour les erreurs

## 📊 Structure des données dans Firestore

**Collection** : `history`

**Exemple de document** :
```
history/
  └─ aB3dEf9GhI2jK  (auto-generated ID)
     ├─ timestamp: December 26, 2025 at 2:30:00 PM UTC+1
     ├─ device: "led1"
     ├─ action: "ON"
     └─ source: "Dashboard"
```

**Indexation** : Firestore créera automatiquement un index sur `timestamp` pour la requête `orderBy`.

---

## 🎯 Résumé des chemins

**Fichier clé Firebase :**
```
C:\Users\Youssefh\serviceAccountKey.json
```

**Flow Node-RED :**
```
C:\Users\Youssefh\Desktop\MIOT\node-red\miot-flow.json
```

**Ligne à modifier dans le flow :**
Ligne 341, remplacer `/home/pi/...` par le chemin Windows.

**Commande d'installation :**
```powershell
cd C:\Users\Youssefh\.node-red
npm install firebase-admin
```
