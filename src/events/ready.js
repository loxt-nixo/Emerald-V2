const { ActivityType } = require("discord.js");
const mongoose = require("mongoose");
const mongodbURL = process.env.MONGODBURL;

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`${client.user.tag} is ready!`);

    setInterval(() => {

      const servers = client.guilds.cache.size;
      const users = client.users.cache.size;

      let status = [
        {
          name: `${servers} Servers || Emerald Os`,
          type: ActivityType.Playing,
        },
        {
          name: `${users} Users || Emerald Os`,
          type: ActivityType.Listening,
        },
        {
          name: `/help || Emerald Os`,
          type: ActivityType.Listening,
        },
      ];
      let random = Math.floor(Math.random() * status.length);
      client.user.setActivity(status[random]);
    }, `2500`);

    if (!mongodbURL) return;

    mongoose.set("strictQuery", false);

    await mongoose.connect(mongodbURL || "", {
      //keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (mongoose.connect) {
      mongoose.set("strictQuery", true);
      console.log("The database is running!");
    }
  },
};
