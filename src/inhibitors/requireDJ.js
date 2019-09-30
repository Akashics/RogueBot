const { Inhibitor } = require('klasa');

module.exports = class extends Inhibitor {

	constructor(...args) {
		super(...args, { spamProtection: true });
	}

	async run(msg, cmd) {
		if (cmd.requireDJ !== true) return;
		if (msg.channel.type !== 'text') throw msg.send('｢ **Error** ｣ This command can only be executed in a guild.');

		if (!msg.guild.settings.djOnly) return;
		if (await msg.hasAtLeastPermissionLevel(3)) return;
		throw msg.send('｢ **DJ Only** ｣ The guild currently only allows Moderator-selected DJ Members to operate these commands.');
	}

};
