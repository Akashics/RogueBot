const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			cooldown: 10,
			aliases: ['savesong', 'dmcurrentsong'],
			permissionLevel: 0,
			requiredPermissions: ['USE_EXTERNAL_EMOJIS'],
			description: (language) => language.get('COMMAND_DMSONG_DESCRIPTION'),
			extendedHelp: 'No extended help available.'
		});
	}

	async run(msg) {
		const { music: { queue, playing } } = msg.guild;
		if (!playing || !queue.length) return msg.send("｢ **Error** ｣ There's currently no music playing!");

		const [song] = queue;
		if (!song) return msg.send('｢ **Error** ｣ Song not found, please try with a different one.');
		const embed = new MessageEmbed()
			.setColor('#5bc0de')
			.setTitle(`Song Information from ${msg.guild.name}`)
			.setTimestamp()
			.setFooter(this.client.user.tag)
			.setDescription(`• **Title:** ${song.title}
                             • **Author:** ${song.author}
                             • **Duration:** ${song.friendlyDuration}
                             • **Requested By:** ${song.requester}
                             • **Link:** ${song.url}`);
		return msg.author.send({ embed });
	}

};
