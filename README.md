# MJ API - Assistant Integration

Module Foundry pour assistant MJ Discord.

## Routes REST disponibles

GET:
- /mj-api/ping
- /mj-api/getActorData?name=NomPerso
- /mj-api/getSkillValue?actor=Nom&skill=Compétence
- /mj-api/getInventory?name=NomPerso
- /mj-api/getJournals

POST:
- /mj-api/sendToChat — { "message": "..." }
- /mj-api/updateActorField — { "actor": "...", "path": "...", "value": ... }