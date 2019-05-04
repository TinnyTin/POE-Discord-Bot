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
let sextants = [];
let splinters = [];
let dataReady = false;

var minTimer = 1000 * 60 * (1/20); //15 min
// Dictionary with currency name to custom emoji id. CurrencyName:Emoji
var currDict = {
  "Mirror of Kalandra": "<:mirror:562221382394445845>",
  "Exalted Orb": "<:exa:562076209991647233>",
  "Orb of Annulment": "<:annul:562075957289287681>",
  "Divine Orb": "<:divine:562076191490703380>",
  "Harbinger's Orb": "<:harbinger:562626908047540225>",
  "Master Cartographer's Sextant": "<:redsextant:562076565773615116>",
  "Journeyman Cartographer's Sextant": "<:yellowsextant:562076541836722206>",
  "Apprentice Cartographer's Sextant": "<:whitesextant:562075981830160385>",
  "Splinter of Chayula": "<:chayula:562627892090109962>",
  "Splinter of Tul": "<:tul:565040808927952917>",
  "Splinter of Xoph": "<:xoph:565040999437565952>",
  "Splinter of Uul-Netol": "<:uul:565041217650425856>",
  "Splinter of Esh": "<:esh:565041104978706432>",
  "Vaal Orb": "<:vaal:562076451260858368>",
  "Regal Orb": "<:regal:562076374949691402>",
  "Gemcutter's Prism": "<:gcp:562076303658975242>",
  "Orb of Regret": "<:regret:562076401524801557>",
  "Cartographer's Chisel": "<:chisel:562076133391204361>",
  "Orb of Fusing": "<:fusing:562076245660008459>",
  "Orb of Alchemy": "<:alch:562075893900509195>",
  "Orb of Scouring": "<:scour:562076420134797326>",
  "Blessed Orb": "<:blescmdsed:562076035253010442>",
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
    if (message.content.trim() == ("!hideouts")){
        message.channel.send("```css\n" + "Celestial Hideout : The Shaper's Realm [T17] \n" +
        "Alpline Hideout : Summit Map [T13] : Very Rare \n" +
        "Divided Hideout : The Twilight Temple [Unique] : Rare \n" +
        "Haunted Hideout : Haunted Mansion Map [T2] : Extremely Rare \n" +
        "Sanguine Hideout : Crimson Temple Map [T13] : Extremely Rare \n" + "```");
              // Just add any case commands if you want to..
           }
    else if (message.content.trim() == "!mobcount") {
       message.channel.send("**MAP MOB COUNT**: \n" +
"https://docs.google.com/spreadsheets/d/10ssi9lOJvDOo3G8Iq5xRyDv6-nbCJSxJhB5ANtaUn6w/htmlview?usp=sharing&sle=true")
    }
    else if (message.content.trim() == "!poggairs") {
      message.channel.send("***Poggairs sucks. ZeProtoge sucks.***");
    }
    else if (message.content.trim() == "!streamers") {
      message.channel.send("_ _ \n**TinnyJu**: *<https://www.twitch.tv/tinnyju>*\n",{files: ["https://i.imgur.com/T7sMSLM.png"]}).then(
        message.channel.send("_ _ \n**Tenkiei**: *<https://www.twitch.tv/tenkiei>*\n",{files: ["https://i.imgur.com/vXtDNyE.png"]})
      )
      ;
    }
    else if (message.content.trim() == "!commands" || message.content.trim() == "!help") {
      message.channel.send(commandEmbed());
    }
    else if (message.content.trim() == "!buy") {
      ninjaAPI.update()
        .then((result) => {
          //console.log("Updated data, here are the results of the requests:", result[0].data.lines)
          populateCurrency(result);
          message.channel.send(updateBuyEmbed()).then((msg)=>{
          setInterval(function(){
            msg.edit(updateBuyEmbed());
          }, minTimer);
        })
          return ninjaAPI.save();
        })
    }
    else if (message.content.trim() == "!sell") {
      ninjaAPI.update()
        .then((result) => {
          //console.log("Updated data, here are the results of the requests:", result[0].data.lines)
          populateCurrency(result);
          message.channel.send(updateSellEmbed()).then((msg)=>{
          setInterval(function(){
            msg.edit(updateSellEmbed("sell"));
          }, minTimer);
        })
          return ninjaAPI.save();
        })
    }
       });

function commandEmbed(){
  embed = new Discord.RichEmbed()
  .setColor('RED')
  .setTitle("Welcome to TinnyJu's Server")
  .setFooter('created by TinnyJu')
  .setThumbnail("https://i.ibb.co/2hqcXh4/Kaito-Symbol.png")
  //.setTimestamp(getDate())
  .setDescription("")
  .addField("Tools We Use", "PAL2 Multi-addon launcher : [*Downloading this lets you get the rest below*](https://github.com/POE-Addon-Launcher/PAL2)\n"
    +"PoE Trade Companion \n"
    +"TradeMacro + Lutbot (logout)\n"
    +"Path of Leveling\n"
    +"Official Trade Site : *https://www.pathofexile.com/trade*\n"
    +"PoE Services & Trading Discord : [***Invite***](https://discord.gg/FdJWs5)\n",false)
  .addField("Commands", "**!hideouts** \n *A list of highly desired hideouts, their rarity, and which maps to obtain them.*\n" +
  "**!streamers** \n *A list of partner streamers.*\n",false)
  .addField("MS Paint", "Map Rolling : [*Imgur*](https://i.imgur.com/Jje4H3A.png) \n"
    + "Who can drop maps? : [*Imgur*](https://i.imgur.com/WqMWZc1.png) \n"
    + "Global vs Local modifiers : [*Imgur*](https://i.imgur.com/UF7uRWU.png)",false)
  .addField("Spreadsheets",
  "Mob Count of Maps: [*Google Spreadsheet*](https://docs.google.com/spreadsheets/d/10ssi9lOJvDOo3G8Iq5xRyDv6-nbCJSxJhB5ANtaUn6w/htmlview?usp=sharing&sle=true) \n" +
  "E.Eternity: Layouts for Story Acts : [*Google Spreadsheet*](https://docs.google.com/document/d/1sExA-AnTbroJ-HN2neZiij5G4X9u2ENlC7m_zf1tqP8/edit) \n" +
  "Turi's Delve Cheat Sheet : [*Google Spreadsheet*](https://docs.google.com/spreadsheets/d/14-VBdK4Izh9lU9_BP1eqyht2JXL17wFfF8TAz24Ls0g/edit#gid=788135518) \n" +
  "Lab Enchant Statistics : [*Google Spreadsheet*](https://docs.google.com/spreadsheets/d/1QolNQHAzQ44NHzYB8W1cjN6Cf7JPeNsEUJKY1Y02Sf8/edit?usp=sharing)",false)

  return embed;
}

function updateBuyEmbed(){
      embed = new Discord.RichEmbed()
      .setColor('AQUA')
      .setAuthor("Currency Table")
      .setTitle("**poe.ninja's Buy column**")
      .setURL("https://poe.ninja/challenge/currency")
      .setFooter("Sourced from poe.ninja, Created by Tinny & Judy","https://poe.ninja/images/ninja-logo.png")
      .setThumbnail("https://gamepedia.cursecdn.com/pathofexile_gamepedia/9/9c/Chaos_Orb_inventory_icon.png")
      .setTimestamp(getDate())
      .setDescription(getBuyTable())
      .addField("Sextants",getSextants(),false);
      //.addField("Splinters",getSplinters(),false);
      return embed;
}

function updateSellEmbed(str){
      embed = new Discord.RichEmbed()
      .setColor('AQUA')
      .setAuthor("Currency Table")
      .setTitle("**poe.ninja's Buy column**")
      .setURL("https://poe.ninja/challenge/currency")
      .setFooter("Sourced from poe.ninja, Created by Tinny & Judy","https://poe.ninja/images/ninja-logo.png")
      .setThumbnail("https://gamepedia.cursecdn.com/pathofexile_gamepedia/9/9c/Chaos_Orb_inventory_icon.png")
      .setTimestamp(getDate())
      .setDescription(getSellTable())
      .addField("Sextants",getSextants(),false);
      //.addField("Splinters",getSplinters(),false);
      return embed;
}

function populateCurrency(result) {
  var i;
  for (i = 0; i < result[0].data.lines.length; i++) {
    if (result[0].data.lines[i].pay && result[0].data.lines[i].receive) {
      var sellvalue = calcValue(result[0].data.lines[i].pay.value);
      if (i == 0) {
        var receive = (parseFloat(result[0].data.lines[i].receive.value)/100)*100/ 1.0e+3;
        var buyvalue = receive.toFixed(1) + "k";
      }
      else {
      var buyvalue = result[0].data.lines[i].receive.value.toFixed(1);
      }
      var name = result[0].data.lines[i].currencyTypeName;
      pushCurrency(name,buyvalue,sellvalue);
    }
  }
}

function pushCurrency(name,buyvalue,sellvalue){
  switch(name) {
    case "Splinter of Chayula":
    case "Splinter of Tul":
    case "Splinter of Xoph":
    case "Splinter of Uul-Netol":
    case "Splinter of Esh":
      splinters.push(new CurrencyRow(name,buyvalue,sellvalue));
      break;
    case "Master Cartographer's Sextant":
    case "Journeyman Cartographer's Sextant":
    case "Apprentice Cartographer's Sextant":
      sextants.push(new CurrencyRow(name,buyvalue,sellvalue));
      break;
    default:
      currencyData.push(new CurrencyRow(name,buyvalue,sellvalue));
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



function getBuyTable(){
  result = "";
  for (row of currencyData) {
    var name = row.name;
    if (currDict[name] != undefined) {
      var paddedline =
        row.buyvalue
        + padString(row.buyvalue)
        + "× <:chaos:562076109865484289>\u2001→\u20011.0\u2001× "
        + currDict[name] + "\n";
      result += paddedline;
    }
  }
  return result;
}

function getSellTable(){
  result = "";
  for (row of currencyData) {
    var name = row.name;
    if (currDict[name] != undefined) {
      var paddedline =
        "1.0\u2001"
        + "× <:chaos:562076109865484289>\u2001→ " + padString(row.sellvalue) +
        row.sellvalue + "\u2001× "+ currDict[name] + "\n";
      result += paddedline;
    }
  }
  return result;
}

function getSextants(){
  result = "";
  for (row of sextants) {
    var name = row.name;
    if (currDict[name] != undefined) {
      var paddedline =
        row.buyvalue
        + padString(row.buyvalue)
        + "× <:chaos:562076109865484289>\u2001→\u20011.0\u2001× "
        + currDict[name] + "\n";
      result += paddedline;
    }
  }
  return result;
}

function getSplinters(){
  result = "";
  for (row of splinters) {
    var name = row.name;
    if (currDict[name] != undefined) {
      var paddedline =
        row.buyvalue
        + padString(row.buyvalue)
        + "× <:chaos:562076109865484289>\u2001→\u20011.0\u2001× "
        + currDict[name] + "\n";
      result += paddedline;
    }
  }
  return result;
}

function padString(str){
  // Count digits
  var digits = countDigits(str);
  var counts = countWidth(str);
  var numWhitespace = 7-digits;
  // Pad according to number of digits and differing widths.
  console.log(numWhitespace);
  var result = "\u2009".repeat(parseFloat(numWhitespace)*5); // Whitespace
  result += "\u2002\u2009\u200a".repeat(parseFloat(counts[0])); // Zeros
  result += "\u200a".repeat(parseFloat(counts[1])); // LargeWidth
  result += "\u2009".repeat(parseFloat(counts[2]+counts[3])); // Twos and SmallWidth
  result += "\u2009\u200a".repeat(parseFloat(counts[4])); // K's
  result += "\u200a".repeat(parseFloat(counts[5])*4); // Ones
  return result;
}

function countWidth(str){
  // [Largest -> Smallest]
  // [Zeros,LargeWidth,Twos,SmallWidth,K,Ones]
  var counts = [0,0,0,0,0,0];
  for (i = 0; i < 7; i++) {
    if (str.charAt(i)){
      switch(str.charAt(i)) {
        case '0':
          counts[0]++;
          break;
        case '4':
        case '6':
        case '8':
        case '9':
          counts[1]++;
          break;
        case '2':
          counts[2]++;
          break;
        case '3':
        case '5':
        case '7':
          counts[3]++;
          break;
        case 'k':
          counts[4]++;
          break;
        default:
          counts[5]++;
      };
    }
  }
  return counts;
}

function countDigits(str){
  var count = 0;
  for (i = 0; i < 7; i++) {
    if (!isNaN(parseFloat(str.charAt(i)))
    || str.charAt(i) == 'k'){
      if(str.charAt(i) == '0') count++;
        count++;
    }
  }
  return count;
}
