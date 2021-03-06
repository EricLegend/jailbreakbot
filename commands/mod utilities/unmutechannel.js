const { Command } = require('discord.js-commando');
const config = require("../../config")

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'unmutechannel',
            group: 'mod utilities',
            memberName: 'unmutechannel',
            description: 'Grants everyone permissions to send message and add reactions in the channel the command was executed.',
            examples: ['!unmutechannel'],
            args: [{
                key: 'member',
                prompt: 'Insert a member to unmute.',
                type: 'member',
                default: ''
            }]
        });    
    }
hasPermission(msg) {
        return msg.member.roles.exists("id", config.administrator || msg.author.id === config.owner)
    }
	
async run(msg,{member}) {
await msg.delete(); 
if (!member || member === '') member = msg.guild.defaultRole
msg.channel.overwritePermissions(member,{
 'SEND_MESSAGES': null,
'ADD_REACTIONS': null
}).catch(console.error);

};
}
