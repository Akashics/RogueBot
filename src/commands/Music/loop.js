const MusicCommand = require('../../library/Music/MusicCommand');
const MusicResponse = require('../../library/Music/MusicResponse');

module.exports = class extends MusicCommand {

	constructor(...args) {
		super(...args, {
			requireDJ: true,
			requireMusic: true,
			cooldown: 10,
			aliases: ['loopsong', 'repeat'],
			requiredPermissions: ['USE_EXTERNAL_EMOJIS'],
			description: language => language.get('COMMAND_LOOP_DESCRIPTION'),
			extendedHelp: 'No extended help available.'
		});
	}

	async run(msg) {
		const { music } = msg.guild;
		if (!music.playing) return msg.send("｢ **Error** ｣ There's currently no music playing!");
		if (msg.member.voice.channelID !== msg.guild.me.voice.channelID) return msg.send("｢ **Error** ｣ You're currently not in a voice channel or there was an error, try again.");

		music.looping = !music.looping;
		const embed = await MusicResponse.loopingSongs(music.looping);
		return msg.send({ embed });
	}

};
