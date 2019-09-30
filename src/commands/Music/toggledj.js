const MusicCommand = require('../../library/Music/MusicCommand');

module.exports = class extends MusicCommand {

	constructor(...args) {
		super(...args, {
			requireDJ: true,
			requireMusic: true,
			cooldown: 8,
			aliases: ['djonly', 'enabledjonly', 'disabledjonly'],
			requiredPermissions: ['USE_EXTERNAL_EMOJIS'],
			description: language => language.get('COMMAND_DJONLY_DESCRIPTION'),
			extendedHelp: 'No extended help available.'
		});
	}

	async run(msg) {
		if (!msg.hasAtLeastPermissionLevel(3)) return msg.send('｢ **Error** ｣ You need to be a **DJ** to change the volume.');
		if (msg.guild.settings.djOnly) {
			await msg.guild.settings.update('djOnly', false);
			return msg.send(`｢ **DJ Only** ｣ ***DJ only Mode has been disabled.***`);
		} else {
			await msg.guild.settings.update('djOnly', true);
			return msg.send(`｢ **DJ Only** ｣ ***DJ only Mode has been enabled.***`);
		}
	}

};
