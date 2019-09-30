const { Inhibitor } = require('klasa');

module.exports = class extends Inhibitor {

	constructor(...args) {
		super(...args, { spamProtection: true });
	}

	async run(msg, cmd) {
		if (cmd.requireMusic !== true) return;
		if (msg.channel.type !== 'text') throw msg.send('｢ **Error** ｣ This command can only be executed in a guild.');

		const force = 'force' in msg.flags;

		await msg.guild.members.fetch(msg.author);

		if (!msg.member.voice.channel && !force) throw msg.send('｢ **Error** ｣ Y\'aint in any voice channels m8.');
		// if (!msg.guild.me.voice.channel) throw msg.send('｢ **Error** ｣ I do not currently reside in a voice channel, try to join me to one.');
		if (msg.member.voice.channel !== msg.guild.me.voice.channel && !force) throw msg.send('｢ **Error** ｣ You need to be in my voice channel to use that command.');
	}

};
