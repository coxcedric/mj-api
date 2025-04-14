# MJ API - Assistant Integration

Ce module expose des fonctions utilisables par un Assistant MJ Discord connecté à Foundry VTT (WFRP4e).

## Fonctions disponibles

- `getActorData(actorName)`
- `getSkillValue(actorName, skillName)`
- `rollSkill(actorName, skillName)`
- `getInventory(actorName)`
- `updateActorField(actorName, path, value)`
- `getJournals()`
- `sendToChat(message)`

## Installation

Dans Foundry VTT :
1. Aller dans **Setup > Add-on Modules**
2. Choisir **Install Module**
3. Coller l'URL suivante dans le champ **Manifest** :

```
https://raw.githubusercontent.com/coxcedric/mj-api/main/module.json
```