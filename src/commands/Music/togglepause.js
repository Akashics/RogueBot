const MusicCommand = require('../../library/Music/MusicCommand');

module.exports = class extends MusicCommand {

	constructor(...args) {
		super(...args, {
			requireDJ: true,
			requireMusic: true,
			cooldown: 8,
			aliases: ['pause', 'resume'],
			permissionLevel: 3,
			requiredPermissions: ['USE_EXTERNAL_EMOJIS'],
			description: language => language.get('COMMAND_PAUSE_DESCRIPTION'),
			extendedHelp: 'No extended help available.'
		});
	}

	async run(msg) {
		const { music } = msg.guild;
		if (!music.busy) return msg.send("｢ **Error** ｣ There's currently no music playing!");
		music.pause(!music.paused);
		return msg.send(`｢ **Toggle Pause** ｣ ${msg.author.username} has ${!music.paused ? 'paused' : 'resumed'} the music!`);
	}

};
