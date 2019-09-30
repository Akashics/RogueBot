const MusicCommand = require('../../library/Music/MusicCommand');

module.exports = class extends MusicCommand {

	constructor(...args) {
		super(...args, {
			requireDJ: true,
			cooldown: 10,
			requiredPermissions: ['USE_EXTERNAL_EMOJIS'],
			description: language => language.get('COMMAND_LEAVE_DESCRIPTION'),
			extendedHelp: 'No extended help available.'
		});
	}

	async run(msg) {
		if (!msg.member.voice.channelID) return msg.send("｢ **Error** ｣ You're currently not in a voice channel or there was an error, try again.");

		const threshold = Math.ceil(msg.guild.me.voice.channel.members.size / 3);
		const force = threshold <= 1 || msg.guild.me.voice.channel < threshold || await msg.hasAtLeastPermissionLevel(3);

		if (!force) return msg.send('｢ **Error** ｣ There are too many people in this chat to force leave the channel.');

		return msg.guild.music.join(msg.member.voice.channelID);
	}

};
