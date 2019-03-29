const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
    console.log("```css " + "Celestial Hideout : The Shaper's Realm [T17] \n" +
    "Celestial Hideout : The Shaper's Realm [T17] \n" +
    "Alpline Hideout : Summit Map [T13] : Very Rare \n" +
    "Divided Hideout : The Twilight Temple : Rare \n" +
    "Haunted Hideout : Haunted Mansion Map [T2] : Extremely Rare \n" +
    "Sanguine Hideout : Crimson Temple Map [T13] : Extremely Rare \n" + "```")
})
//\n \ Alpline Hideout : Summit Map [T13] : Very Rare \n \ Divided Hideout : The Twilight Temple : Rare \n \ ```"


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

  client.on("message", message => {
    if (message.content.trim() == ("!hideout")){
        message.channel.send("```" + "Celestial Hideout : The Shaper's Realm [T17] \n" +
        "Alpline Hideout : Summit Map [T13] : Very Rare \n" +
        "Divided Hideout : The Twilight Temple : Rare \n" +
        "Haunted Hideout : Haunted Mansion Map [T2] : Extremely Rare \n" +
        "Sanguine Hideout : Crimson Temple Map [T13] : Extremely Rare \n" + "```");
              // Just add any case commands if you want to..
           }
    else if (message.content.trim() == "!mobcount") {
       message.channel.send("**MAP MOB COUNT**: \n" +
"https://docs.google.com/spreadsheets/d/10ssi9lOJvDOo3G8Iq5xRyDv6-nbCJSxJhB5ANtaUn6w/htmlview?usp=sharing&sle=true")
    }
    else if (message.content.trim() == "!maprolling") {
      message.channel.send("https://i.imgur.com/Jje4H3A.png \n https://i.imgur.com/WqMWZc1.png");
    }
    else if (message.content.trim() == "!maplayouts") {
      message.channel.send("https://docs.google.com/document/d/1sExA-AnTbroJ-HN2neZiij5G4X9u2ENlC7m_zf1tqP8/edit");
    }
       });
