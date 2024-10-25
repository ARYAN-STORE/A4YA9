fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;
const doNotDelete = "mode by ArYan"; 

module.exports = {
  config: {
    name: "help",
    version: "1.17",
    author: "ArYan 🐔",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "View command usage and list all commands directly",
    },
    longDescription: {
      en: "View command usage and list all commands directly",
    },
    category: "info",
    guide: {
      en: "{pn} / help cmdName ",
    },
    priority: 1,
  },

  onStart: async function ({ message, args, event, threadsData, role }) {
    const { threadID } = event;
    const threadData = await threadsData.get(threadID);
    const prefix = getPrefix(threadID);

    if (args.length === 0) {
      const categories = {};
      let ArYan = "╭───────❁";

      ArYan += `\n│𝗔𝗥𝗬𝗔𝗡 𝗛𝗘𝗟𝗣 𝗟𝗜𝗦𝗧\n╰────────────❁`; 

      for (const [name, value] of commands) {
        if (value.config.role > 1 && role < value.config.role) continue;

        const category = value.config.category || "Uncategorized";
        categories[category] = categories[category] || { commands: [] };
        categories[category].commands.push(name);
      }

      Object.keys(categories).forEach((category) => {
        if (category !== "info") {
          ArYan += `\n╭─────✰『  ${category.toUpperCase()}  』`;


          const ArYan = categories[category].commands.sort();
          for (let i = 0; i < ArYan.length; i += 3) {
            const cmds = ArYan.slice(i, i + 2).map((item) => `⭔${item}`);
            msg += `\n│${cmds.join(" ".repeat(Math.max(1, 5 - cmds.join("").length)))}`;
          }

          ArYan += `\n╰────────────✰`;
        }
      });

      const ArYanCommands = commands.size;
      msg += `\n\n╭─────✰ENJOY\n│>TOTAL CMDS: [${ArYanCommands}].\n│TEYPE:[ ${prefix}HELP TO\n│<CMD> TO LEARN THE USAGE.]\n╰────────────✰`;
      msg += ``;
      msg += `\n╭─────✰\n│ ♥︎╣[❉𝗔 𝗥 𝗬 𝗔 𝗡❉]╠♥︎\n╰────────────✰`; 

 				const ArYan = [ "https://i.imgur.com/EuC6sT9.jpeg" ];


      const ArYan = ArYan[Math.floor(Math.random() * ArYan.length)];

      await message.reply({
        body: ArYan,
        attachment: await global.utils.getStreamFromURL(helpListImage)
      });
    } else {
      const ArYanName = args[0].toLowerCase();
      const command = commands.get(ArYanName) || commands.get(aliases.get(ArYanName));

      if (!command) {
        await message.reply(`Command "${ArYanName}" not found.`);
      } else {
        const configArYan = command.config;
        const roleText = roleTextToString(configArYan.role);
        const author = configArYan.author || "Unknown";

        const longDescription = configCommand.longDescription ? configCommand.longDescription.en || "No description" : "No description";

        const guideBody = configCommand.guide?.en || "No guide available.";
        const usage = guideBody.replace(/{p}/g, prefix).replace(/{n}/g, configCommand.name);

        const ArYan = `
  ╭───⊙
  │ 🔶 ${configArYan.name}
  ├── INFO
  │ 📝 𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: ${longDescription}
  │ 👑 𝗔𝘂𝘁𝗵𝗼𝗿: ${author}
  │ ⚙ 𝗚𝘂𝗶𝗱𝗲: ${usage}
  ├── USAGE
  │ 🔯 𝗩𝗲𝗿𝘀𝗶𝗼𝗻: ${configArYan.version || "1.0"}
  │ ♻𝗥𝗼𝗹𝗲: ${roleText}
  ╰────────────⊙`;

        await message.reply(ArYan);
      }
    }
  },
};

function roleTextToString(roleText) {
  switch (roleText) {
    case 0:
      return "0 (All users)";
    case 1:
      return "1 (Group administrators)";
    case 2:
      return "2 (Admin bot)";
    default:
      return "Unknown role";
  }
       }
