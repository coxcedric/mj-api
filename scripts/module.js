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

Hooks.once('init', () => {
  if (!globalThis.foundryExpressRoutes) {
    globalThis.foundryExpressRoutes = {};
  }

  globalThis.foundryExpressRoutes["mj-api"] = {
    get: {
      "/ping": async (req, res) => {
        res.json({ status: "ok", message: "MJ API is alive" });
      },
      "/getActorData": async (req, res) => {
        const actor = game.actors.getName(req.query.name);
        res.json(actor?.toObject() || {});
      },
      "/getSkillValue": async (req, res) => {
        const actor = game.actors.getName(req.query.actor);
        const skill = actor?.items.find(i => i.type === "skill" && i.name === req.query.skill);
        res.json({ value: skill?.system?.total || null });
      },
      "/getInventory": async (req, res) => {
        const actor = game.actors.getName(req.query.name);
        const inv = actor?.items.filter(i => ["weapon", "armor", "equipment"].includes(i.type)).map(i => i.toObject()) || [];
        res.json(inv);
      },
      "/getJournals": async (req, res) => {
        res.json(game.journal.contents.map(j => ({
          name: j.name,
          content: j.pages.map(p => ({ name: p.name, text: p.text.content }))
        })));
      }
    },
    post: {
      "/sendToChat": async (req, res) => {
        ChatMessage.create({ content: req.body.message });
        res.json({ status: "ok" });
      },
      "/updateActorField": async (req, res) => {
        const actor = game.actors.getName(req.body.actor);
        const data = {};
        data[req.body.path] = req.body.value;
        await actor.update(data);
        res.json({ updated: true });
      }
    }
  };
});