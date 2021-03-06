const Discord = require('discord.js');
const client = new Discord.Client();
var NinjaAPI = require("poe-ninja-api-manager");


var ninjaAPI = new NinjaAPI({
  league: "Legion"
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
let toDelete = [];
var minTimer = 1000 * 60 * 30; //15 min


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
    var kaitosWorld = client.channels.get("568269774728069140");
    kaitosWorld.fetchMessage("577804534298968064")
    .then(message => message.clearReactions());
    ninjaAPI.update()
      .then((result) => {
        updateTable(result,"BUY");
        return ninjaAPI.save();
      })


})

// Get your bot's secret token from:
// https://discordapp.com/developers/applications/
// Click on your application -> Bot -> Token -> "Click to Reveal Token"
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
    var command = message.content.split(" ");

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
      message.channel.send("_ _ \n**Tenkiei**: *<https://www.twitch.tv/tenkiei>*\n",{files: ["https://i.imgur.com/vXtDNyE.png"]}).then(
      message.channel.send("_ _ \n**AllThingsKai**: *<https://www.twitch.tv/AllThingsKai>*\n",{files: ["https://imgur.com/a/ZM0ydHi"]})));
    }
    else if (message.content.trim() == "!commands" || message.content.trim() == "!help") {
      message.channel.send(commandEmbed());
    }
    //else if (message.content.split() == ("!prune " +)
    else if (command[0] == "!prune" && (typeof command[1] === 'string') && !isNaN(command[2])){
      //if variable 2 is an int, general channel purge. else, purge based on user
      const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2]);
      message.channel.fetchMessages({limit:100}).then(messages => {
            const user = message.mentions.users.first(); //first user mentioned (@) in the message
            const filterBy = user ? user.id : client.user.id;
             messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount).reverse();
             message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
     });
  }
});

function updateTable(result,col){
      populateCurrency(result);
      var kaitosWorld = client.channels.get("568269774728069140");
      kaitosWorld.fetchMessage("577804534298968064")
      .then(message =>
        message.edit(updateEmbed(col)).then((msg)=>{
        message.react('????').then(() => message.react('????')).then(() => message.react('????'));
        const filter = (reaction, user) => {
          return ['????', '????','????'].includes(reaction.emoji.name) && user.id != message.author.id;
        };
        message.awaitReactions(filter, { max: 1})
          .then(collected => {
            const reaction = collected.first();
            var u = reaction.users.find(element => element.bot == false);
            if (reaction.emoji.name === '????') {
                msg.reactions.find(element => element._emoji.name === '????').remove(u);
                updateTable(result,"BUY");
            }
            else if (reaction.emoji.name === '????') {
                msg.reactions.find(element => element._emoji.name === '????').remove(u);
                updateTable(result,"SELL");
            }
            else if (reaction.emoji.name === '????'){
                msg.reactions.find(element => element._emoji.name === '????').remove(u);
                updateTable(result,col);
            }
          })
          .catch(collected => {
            console.log('ERROR: AwaitReactions failed.')
          });
      })
      )
}

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

function updateEmbed(str){
      embed = new Discord.RichEmbed()
      .setColor('AQUA')
      .setAuthor("Currency Table")
      .setTitle("**poe.ninja's " + str + " column**")
      .setURL("https://poe.ninja/challenge/currency")
      .setFooter("Sourced from poe.ninja, Created by Tinny & Judy","https://poe.ninja/images/ninja-logo.png")
      .setThumbnail("https://gamepedia.cursecdn.com/pathofexile_gamepedia/9/9c/Chaos_Orb_inventory_icon.png")
      .setTimestamp(getDate())
      .setDescription(getTable(str.toUpperCase()))
      .addField("Sextants", getSextants(str.toUpperCase()),false)
      .addField("Splinters", getSplinters(str.toUpperCase()),false);
      return embed;
}

function populateCurrency(result) {
  var i;
  for (i = 0; i < result[0].data.lines.length; i++) {
    if (result[0].data.lines[i].pay && result[0].data.lines[i].receive) {

      if (i == 0) {
        var buyvalue = kFormatter(result[0].data.lines[i].receive.value);
        var sellvalue = kFormatter(calcValue(result[0].data.lines[i].pay.value));
      }
      else {
      var buyvalue = result[0].data.lines[i].receive.value.toFixed(1);
      var sellvalue = calcValue(result[0].data.lines[i].pay.value);
      }
      var name = result[0].data.lines[i].currencyTypeName;
      pushCurrency(name,buyvalue,sellvalue);
    }
  }
}

// Sift and Push CurrencyRow objects to their appropriate data tables
function pushCurrency(name,buyvalue,sellvalue){
  switch(name) {
    case "Splinter of Chayula":
    case "Splinter of Tul":
    case "Splinter of Xoph":
    case "Splinter of Uul-Netol":
    case "Splinter of Esh":
      updateCurrency(name,buyvalue,sellvalue,splinters);
      break;
    case "Master Cartographer's Sextant":
    case "Journeyman Cartographer's Sextant":
    case "Apprentice Cartographer's Sextant":
      updateCurrency(name,buyvalue,sellvalue,sextants);
      break;
    default:
      updateCurrency(name,buyvalue,sellvalue,currencyData);
  }
}

// Update CurrencyRow if duplicate exists, else push new CurrencyRow to data
function updateCurrency(name,buyvalue,sellvalue,data){
  var found = data.find(row => row.name == name);
  if(found === undefined){
    data.push(new CurrencyRow(name,buyvalue,sellvalue));
  }
  else{
    row.buyvalue = buyvalue;
    row.sellvalue = sellvalue;
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



function getTable(str){
  result = "";
  for (row of currencyData) {
    var name = row.name;
    var value = row.buyvalue;
    if(str.toUpperCase() == "SELL") value = row.sellvalue;
    if (currDict[name] != undefined) {
      var paddedline =
        value
        + padString(value)
        + "?? <:chaos:562076109865484289>\u2001???\u20011.0\u2001?? "
        + currDict[name] + "\n";
      if(str.toUpperCase() == "SELL"){
        paddedline =
          "1.0\u2001"
          + "??  " + currDict[name] + " \u2001??? " + padString(value) +
          value + "\u2001?? "+ "<:chaos:562076109865484289>" + "\n";
      }
      result += paddedline;
    }
  }
  return result;
}

function getSextants(str){
  result = "";
    for (row of sextants) {
      var value = row.buyvalue;
      if(str.toUpperCase() == "SELL") value = row.sellvalue;
      var name = row.name;
      if (currDict[name] != undefined) {
        var paddedline =
          value
          + padString(value)
          + "?? <:chaos:562076109865484289>\u2001???\u20011.0\u2001?? "
          + currDict[name] + "\n";
          if(str.toUpperCase() == "SELL"){
            paddedline =
            "1.0\u2001"
            + "??  " + currDict[name] + " \u2001??? " + padString(value) +
            value + "\u2001?? "+ "<:chaos:562076109865484289>" + "\n";

          }
        result += paddedline;
      }
    }
    return result;
  }


function getSplinters(str){
  result = "";
  for (row of splinters) {
    var value = row.buyvalue;
    if(str.toUpperCase() == "SELL") value = row.sellvalue;
    var name = row.name;
    if (currDict[name] != undefined) {
      var paddedline =
        value
        + padString(value)
        + "?? <:chaos:562076109865484289>\u2001???\u20011.0\u2001?? "
        + currDict[name] + "\n";
      if(str.toUpperCase() == "SELL"){
          paddedline =
          "1.0\u2001"
          + "??  " + currDict[name] + " \u2001??? " + padString(value) +
          value + "\u2001?? "+ "<:chaos:562076109865484289>" + "\n";

      }
      result += paddedline;
    }
  }
  return result;
}

function kFormatter(num){
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}

function padString(str){
  // Count digits
  var digits = countDigits(str);
  var counts = countWidth(str);
  var numWhitespace = 7-digits;
  // Pad according to number of digits and differing widths.
  var result = "\u2009".repeat(parseFloat(numWhitespace)*5); // Whitespace
  result += "\u2002\u2009\u200a".repeat(parseFloat(counts[0])); // Zeros
  result += "\u200a".repeat(parseFloat(counts[1])); // LargeWidth
  result += "\u2009".repeat(parseFloat(counts[2]+counts[3])); // Twos and SmallWidth
  result += "\u2009\u200a".repeat(parseFloat(counts[4])); // K's
  result += "\u200a".repeat(parseFloat(counts[5])*4); // Ones
  return result;
}

function countWidth(string){
  // [Largest -> Smallest]
  // [Zeros,LargeWidth,Twos,SmallWidth,K,Ones]
  var counts = [0,0,0,0,0,0];
  var str = string.toString();
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
  var string = str.toString();
  var count = 0;
  for (i = 0; i < 7; i++) {
    if (!isNaN(parseFloat(string.charAt(i)))
    || string.charAt(i) == 'k'){
      if(string.charAt(i) == '0') count++;
        count++;
    }
  }
  return count;
}
