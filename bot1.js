const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
})

// Get your bot's secret token from:
// https://discordapp.com/developers/applications/
// Click on your application -> Bot -> Token -> "Click to Reveal Token"
bot_secret_token = "NTU5MTc0NTQ5MDk5MjQ5Njcw.D3zyuA.UVCn4Pres3j0BG8_Za4Fqv7-_BE"
client.login(bot_secret_token)

client.on('guildMemberAdd', member => {
	console.log('Still sane, @' + member.user + '?');
	console.log('```Join us over in #general chat! ```');
	console.log(member);
	var role = member.guild.roles.find('name', 'Member'); 
	member.addRole(role);
	member.guild.channels.get('547919750550781967').send('Still sane, ' + member.user + '?' 
		+ '\n' + '```css' + '\n' + 'Join us over in #general chat! ```');

	});
