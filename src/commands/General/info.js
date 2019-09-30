const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['details', 'what'],
			guarded: true,
			description: language => language.get('COMMAND_INFO_DESCRIPTION')
		});
	}

	async run(msg) {
		const embed = new MessageEmbed()
			.setColor('random')
			.setAuthor(msg.author.tag, msg.author.displayAvatarURL())
			.setTitle('Who created Rogue the Discord Bot?')
			.setDescription('Kashall did. On 9/24/2018. You\'re welcome.');

		return msg.sendEmbed(embed);
	}

};
