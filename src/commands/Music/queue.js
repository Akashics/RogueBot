const MusicCommand = require('../../library/Music/MusicCommand');
const { RichDisplay } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends MusicCommand {

	constructor(...args) {
		super(...args, {
			cooldown: 10,
			aliases: ['stopmusic', 'leave'],
			requiredPermissions: ['USE_EXTERNAL_EMOJIS', 'EMBED_LINKS', 'MANAGE_MESSAGES'],
			description: language => language.get('COMMAND_QUEUE_DESCRIPTION'),
			extendedHelp: 'No extended help available.'
		});
	}

	async run(msg) {
		const { music } = msg.guild;
		const { queue } = music;
		if (!queue || !queue.length >= 1) return msg.send('｢ **Error** ｣ There is nothing in the music queue.');

		let totalTime = 0;
		for (const song of queue) {
			totalTime += song.duration;
		}

		const pages = new RichDisplay(new MessageEmbed()
			.setTitle('Use the reactions to change pages, select a page, or stop viewing the queue.')
			.setAuthor(`${msg.guild.name} – ${this.client.methods.friendlyDuration(totalTime)} Total`, msg.guild.iconURL())
			.setDescription('Scroll between pages to see the song queue.')
			.setColor('#2C2F33')
		);

		for (let i = 0; i < queue.length; i += 5) {
			const curr = queue.slice(i, i + 5);
			pages.addPage(table => table.setDescription(curr.map(yurt => `🢚 [${yurt.title.replace(/\*/g, '\\*')}](${yurt.url}) (${yurt.friendlyDuration})`).join('\n')));
		}
		return pages.run(await msg.send('｢ **Loading the Music Queue...** ｣'), {
			time: 120000,
			filter: (reaction, user) => user === msg.author
		});
	}

};
