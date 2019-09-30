const MusicCommand = require('../../library/Music/MusicCommand');

module.exports = class extends MusicCommand {

	constructor(...args) {
		super(...args, {
			requireDJ: true,
			requireMusic: true,
			cooldown: 8,
			aliases: ['changevol', 'setvolume'],
			requiredPermissions: ['USE_EXTERNAL_EMOJIS'],
			description: language => language.get('COMMAND_VOLUME_DESCRIPTION'),
			extendedHelp: 'No extended help available.',
			usage: '[volume:integer]'
		});
	}

	async run(msg, [volume]) {
		if (!volume) return msg.send(`｢ **Volume** ｣ The current volume is at ${msg.guild.settings.musicVolume}%.`);
		if (!await msg.hasAtLeastPermissionLevel(3)) return msg.send('｢ **Error** ｣ You need to be a **DJ** to change the volume.');
		if (volume < 0 || volume > 100) return msg.send(`｢ **Error** ｣ Volume can not be lower than 0 or higher than 100.`);
		await msg.guild.settings.update('musicVolume', volume);
		if (msg.guild.music.playing) msg.guild.music.player.setVolume(volume);
		return msg.send(`｢ **Volume** ｣ Volume has been set to: ${volume}%`);
	}

};
