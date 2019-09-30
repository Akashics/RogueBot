const { Command, util: { isFunction } } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['mc', 'mine', 'craft'],
			guarded: true
		});
	}

	async run(message) {
		return message.reply(`I now host a minecraft server available to everyone here at Pagey's Discord Chat!\nPlease note that this a unofficial server and is not supported by the moderators.\n\nThere are a couple rules.\n - Anything goes.\n - Don't be a dick.\n\nReady to get started? \`\`\`Join Now! 66.206.8.146:25765\`\`\``);
if (command) {
			const info = [
				`= ${command.name} = `,
				isFunction(command.description) ? command.description(message.language) : command.description,
				message.language.get('COMMAND_HELP_USAGE', command.usage.fullUsage(message)),
				message.language.get('COMMAND_HELP_EXTENDED'),
				isFunction(command.extendedHelp) ? command.extendedHelp(message.language) : command.extendedHelp
			].join('\n');
			return message.sendMessage(info, { code: 'asciidoc' });
		}
		const help = await this.buildHelp(message);
		const categories = Object.keys(help);
		const helpMessage = [];
		for (let cat = 0; cat < categories.length; cat++) {
			helpMessage.push('```asciidoc');
			const subCategories = Object.keys(help[categories[cat]]);
			for (let subCat = 0; subCat < subCategories.length; subCat++) helpMessage.push(`= ${categories[cat]} Commands =`, `${help[categories[cat]][subCategories[subCat]].join('\n')}\n`);
			helpMessage.push('```', '\u200b');
		}

		return message.author.send(helpMessage, { split: { char: '\u200b' } })
			.then(() => { if (message.channel.type !== 'dm') message.sendLocale('COMMAND_HELP_DM'); })
			.catch(() => { if (message.channel.type !== 'dm') message.sendLocale('COMMAND_HELP_NODM'); });
	}

	async buildHelp(message) {
		const help = {};

		const { prefix } = message.guildSettings;
		const commandNames = [...this.client.commands.keys()];
		const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

		await Promise.all(this.client.commands.map((command) =>
			this.client.inhibitors.run(message, command, true)
				.then(() => {
					if (!help.hasOwnProperty(command.category)) help[command.category] = {};
					if (!help[command.category].hasOwnProperty(command.subCategory)) help[command.category][command.subCategory] = [];
					const description = isFunction(command.description) ? command.description(message.language) : command.description;
					help[command.category][command.subCategory].push(`${prefix}${command.name.padEnd(longest)} :: ${description}`);
				})
				.catch(() => {
					// noop
				})
		));

		return help;
	}

};
