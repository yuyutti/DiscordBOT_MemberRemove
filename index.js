const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

const TOKEN = 'BOT_TOKEN';
const exe_id = '実行者のDiscordID'
const targetRoleId = ['除外するロールID','除外するロールID']
const kick_reason = "KICK理由"

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.content === '!kick') {
        if (message.author.id === exe_id) {
            const guild = message.guild;
            try {
                await guild.members.fetch();
        
                guild.members.cache.forEach((member) => {
                    const memberRoles = member.roles.cache;
                    
                    if (!targetRoleId.some(roleId => memberRoles.has(roleId))) {
                        member.kick(kick_reason)
                            .then((kickedMember) => {
                                console.log(`Kicked user: ${kickedMember.user.tag}`);
                            })
                            .catch(console.error);
                    }
                });
            } catch (error) {
                console.error('メンバーの取得中にエラーが発生しました:', error);
            }
        }
    }
});

client.login(TOKEN);