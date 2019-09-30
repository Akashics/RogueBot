const MusicCommand = require('../../library/Music/MusicCommand');
const { MessageEmbed } = require('discord.js');

module.exports = class extends MusicCommand {

	constructor(...args) {
		super(...args, {
			cooldown: 8,
			aliases: ['np', 'currentsong', 'song'],
			requiredPermissions: ['USE_EXTERNAL_EMOJIS'],
			description: language => language.get('COMMAND_NOWPLAYING_DESCRIPTION'),
			extendedHelp: 'No extended help available.'
		});
	}

	async run(msg) {
		const { music: { playing, queue: [song] } } = msg.guild;
		if (!playing) return msg.send("｢ **Error** ｣ There's currently no music playing!");
		if (!song) return msg.send('｢ **Error** ｣ Song not found, please try with a different one.');
		const embed = new MessageEmbed()
			.setColor('#5bc0de')
			.setTitle(`Now Playing in ${msg.guild.name}`)
			.setTimestamp()
			.setFooter(this.client.user.tag)
			.setDescription(`• **Title:** ${song.title}
                             • **Author:** ${song.author}
                             • **Duration:** ${song.friendlyDuration}
                             • **Requested By:** ${song.requester}
                             • **Link:** ${song.url}`);
		return msg.send({ embed });
	}

};
