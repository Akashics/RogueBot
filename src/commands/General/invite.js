const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			guarded: true,
			description: language => language.get('COMMAND_INVITE_DESCRIPTION')
		});
	}

	async run(msg) {
		return msg.send(`Why would you invite me somewhere else? I love it here. :(`);
	}

	async init() {
		if (this.client.application && !this.client.application.botPublic) this.permissionLevel = 10;
	}

};
