const Discord = require('discord.js')
const client = new Discord.Client()
var NinjaAPI = require("poe-ninja-api-manager");

var ninjaAPI = new NinjaAPI({
  league: "Synthesis"
});


client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
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
    else if (message.content.trim() == "!ninja") {
      ninjaAPI.update()
        .then((result) => {
          console.log("Updated data, here are the results of the requests:", result[0].data.lines)
          var i;
          for (i = 0; i < result[0].data.lines.length; i++) {
            if (result[0].data.lines[i].pay && result[0].data.lines[i].receive) {
            var payvalue = calcRatio(result[0].data.lines[i].pay.value);
            name = result[0].data.lines[i].currencyTypeName
            receivevalue = result[0].data.lines[i].receive.value;
            console.log('Sell: ' + name + " : " + payvalue);
            console.log('Buy: ' + name + " : " + receivevalue);

            }
          }
          message.channel.send({embed});
          // console.log(ninjaAPI.getCurrencyDetails("Mirror of Kalandra"));
          // console.log(ninjaAPI.getCurrencyDetails("blessing-of-chayula"));
          // console.log(ninjaAPI.getCurrencyDetails("Orb of Alchemy"));
          return ninjaAPI.save();
        })
    }
       });

function calcRatio(value) {
  return (1 / parseFloat(value)).toFixed(1);
}

const embed = new Discord.RichEmbed()
  .setDescription("? x <:chaos:562076109865484289>   => 1.0 x <:mirror:562221382394445845>  \n" +
                  "? x <:chaos:562076109865484289>   => 1.0 x <:exa:562076209991647233> \n" +
                  "? x <:chaos:562076109865484289>   => 1.0 x <:annul:562075957289287681> \n" +
                  "? x <:chaos:562076109865484289>   => 1.0 x <:ancient:562627051065049107> \n" +
                  "? x <:chaos:562076109865484289>   => 1.0 x <:divine:562076191490703380> \n" +
                  "? x <:chaos:562076109865484289>   => 1.0 x <:harbinger:562626908047540225>  \n" +
                  "? x <:chaos:562076109865484289>   => 1.0 x <:redsextant:562076565773615116>  \n" +
                  "? x <:chaos:562076109865484289>   => 1.0 x <:yellowsextant:562076541836722206>   \n" +
                  "? x <:chaos:562076109865484289>   => 1.0 x <:splinter:562627892090109962> \n" +
                  "? x <:chaos:562076109865484289>   => 1.0 x <:vaal:562076451260858368> \n" +
                  "? x <:chaos:562076109865484289>   => 1.0 x <:whitesextant:562075981830160385>  \n" +
                  "? x <:chaos:562076109865484289>   => 1.0 x <:regal:562076374949691402>  \n" +
                  "? x <:chaos:562076109865484289>   => 1.0 x <:gcp:562076303658975242> \n" +
                  "? x <:chaos:562076109865484289>   => 1.0 x <:regret:562076401524801557> \n" +
                  "? x <:chaos:562076109865484289>   => 1.0 x <:chisel:562076133391204361>  \n" +
                  "? x <:chaos:562076109865484289>   => 1.0 x <:fusing:562076245660008459>  \n" +
                  "? x <:chaos:562076109865484289>   => 1.0 x <:alch:562075893900509195>  \n" +
                  "? x <:chaos:562076109865484289>   => 1.0 x :<:scour:562076420134797326> \n"  +
                  "? x <:chaos:562076109865484289>   => 1.0 x <:blessed:562076035253010442>");
