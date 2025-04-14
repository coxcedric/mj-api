Hooks.once("socketlib.ready", () => {
  const socket = socketlib.registerModule("mj-api");

  socket.register("getActorData", actorName => {
    const actor = game.actors.getName(actorName);
    return actor?.toObject() || null;
  });

  socket.register("getSkillValue", (actorName, skillName) => {
    const actor = game.actors.getName(actorName);
    const skill = actor?.items.find(i => i.type === "skill" && i.name === skillName);
    return skill?.system?.total || null;
  });

  socket.register("rollSkill", (actorName, skillName) => {
    const actor = game.actors.getName(actorName);
    const skill = actor?.items.find(i => i.type === "skill" && i.name === skillName);
    return skill?.rollSkill() || null;
  });

  socket.register("getInventory", actorName => {
    const actor = game.actors.getName(actorName);
    return actor?.items.filter(i => ["weapon", "armor", "equipment"].includes(i.type)).map(i => i.toObject()) || [];
  });

  socket.register("updateActorField", (actorName, path, value) => {
    const actor = game.actors.getName(actorName);
    if (!actor) return false;
    const data = {};
    data[path] = value;
    actor.update(data);
    return true;
  });

  socket.register("getJournals", () => {
    return game.journal.contents.map(j => ({
      name: j.name,
      content: j.pages.map(p => ({ name: p.name, text: p.text.content }))
    }));
  });

  socket.register("sendToChat", message => {
    ChatMessage.create({ content: message });
  });
});