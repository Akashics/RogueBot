const MusicCommand = require('../../library/Music/MusicCommand');

module.exports = class extends MusicCommand {

	constructor(...args) {
		super(...args, {
			requireDJ: true,
			requireMusic: true,
			cooldown: 8,
			aliases: ['forceleave', 'stopmusic', 'musicstop', 'stop'],
			requiredPermissions: ['USE_EXTERNAL_EMOJIS'],
			description: language => language.get('COMMAND_STOP_DESCRIPTION'),
			extendedHelp: 'No extended help available.'
		});
	}

	async run(msg) {
		const { music } = msg.guild;
		// if (!music.playing) return msg.send("｢ **Error** ｣ There's currently no music playing!");

		if (await msg.hasAtLeastPermissionLevel(3) || (music.voice && music.voice.channel.members.size <= 3)) {
			await music.destroy();
			return msg.send('｢ **Stop** ｣ Queue cleared, leaving voice channel.');
		} else {
			return msg.send('｢ **Error** ｣ There are valueable people in the Voice Channel right now, use skip instead!');
		}
	}

};
