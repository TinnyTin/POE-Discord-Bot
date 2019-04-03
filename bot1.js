const Discord = require('discord.js');
const client = new Discord.Client();
var NinjaAPI = require("poe-ninja-api-manager");


var ninjaAPI = new NinjaAPI({
  league: "Synthesis"
});

class CurrencyRow {
  constructor(name,buyvalue,sellvalue) {
    this.name = name;
    this.buyvalue = buyvalue;
    this.sellvalue = sellvalue;
  }
  //Returns name of the Currency
  name() {
    return this.name;
  }
  //Returns sell value of the Currency
  sell() {
    return this.sellvalue;
  }
  //Returns buy value of the Currency
  buy() {
    return this.buyvalue;
  }
}

// Contain all currency data
let currencyData = [];

// Dictionary with currency name to custom emoji id. CurrencyName:Emoji
var currDict = {
  "Mirror of Kalandra": "<:mirror:562221382394445845>",
  "Exalted Orb": "<:exa:562076209991647233>",
  "Orb of Annulment": "<:annul:562075957289287681>",
  "Divine Orb": "<:divine:562076191490703380>",
  "Harbinger's Orb": "<:harbinger:562626908047540225>",
  "Master Cartographer's Sextant": "<:redsextant:562076565773615116>",
  "Journeyman Cartographer's Sextant": "<:yellowsextant:562076541836722206>",
  "Splinter of Chayula": "<:splinter:562627892090109962>",
  "Apprentice Cartographer's Sextant": "<:whitesextant:562075981830160385>",
  "Vaal Orb": "<:vaal:562076451260858368>",
  "Regal Orb": "<:regal:562076374949691402>",
  "Gemcutter's Prism": "<:gcp:562076303658975242>",
  "Orb of Regret": "<:regret:562076401524801557>",
  "Cartographer's Chisel": "<:chisel:562076133391204361>",
  "Orb of Fusing": "<:fusing:562076245660008459>",
  "Orb of Alchemy": "<:alch:562075893900509195>",
  "Orb of Scouring": "<:scour:562076420134797326>",
  "Blessed Orb": "<:blessed:562076035253010442>",
  "Chaos Orb": "<:chaos:562076109865484289>"
};

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
          //console.log("Updated data, here are the results of the requests:", result[0].data.lines)
          populateCurrency(result);
          //sortCurrency();
          console.log(getTable());
          for (i=0; i<currencyData.length; i++) {
            console.log(currencyData[i]);
          }
          message.channel.send({embed});
          return ninjaAPI.save();

        
        })
    }
       });


function populateCurrency(result){
  var i;
  for (i = 0; i < result[0].data.lines.length; i++) {
    if (result[0].data.lines[i].pay && result[0].data.lines[i].receive) {
    var sellvalue = calcValue(result[0].data.lines[i].pay.value);
    var buyvalue = result[0].data.lines[i].receive.value;
    var name = result[0].data.lines[i].currencyTypeName;
    currencyData.push(new CurrencyRow(name,buyvalue,sellvalue));
    }
  }
}

function calcValue(value) {
  result = (1 / parseFloat(value)).toFixed(1);
  return result;
}


function getDate(){
  var d = new Date,
      dformat = [d.getMonth()+1,
                 d.getDate(),
                 d.getFullYear()].join('/')+' '+
                [d.getHours(),
                 d.getMinutes(),
                 d.getSeconds()].join(':');
  return d;
}

// This is a standin


function getTable(){
  var i;
  var result = "";
  for (i=0; i<currencyData.length; i++) {
    //result += currencyData[i].name + " : " + currencyData[i].buyvalue + "\n";
    var name = currencyData[i].name;
    if (currDict[name] != undefined) {
      var row = currencyData[i].buyvalue.toFixed(1) + " x <:chaos:562076109865484289>   => 1.0 x " + currDict[name] + "\n";
      //console.log(row);
      result += row;
    }
    i++;
  }
  return result;
}

const embed = new Discord.RichEmbed()
  .setColor('AQUA')
  .setAuthor("Currency Table")
  .setTitle("**poe.ninja's Buy column**")
  .setURL("https://poe.ninja/challenge/currency")
  .setFooter("Sourced from poe.ninja","https://poe.ninja/images/ninja-logo.png")
  .setThumbnail("https://gamepedia.cursecdn.com/pathofexile_gamepedia/9/9c/Chaos_Orb_inventory_icon.png")
  .setTimestamp(getDate())
  .setDescription(getTable());
