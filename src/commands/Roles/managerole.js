const { Command } = require('klasa');
const perms = ['ADMINISTRATOR', 'KICK_MEMBERS', 'BAN_MEMBERS', 'MANAGE_CHANNELS', 'MANAGE_GUILD', 'MANAGE_MESSAGES', 'MANAGE_EMOJIS', 'MANAGE_WEBHOOKS', 'MANAGE_ROLES', 'MANAGE_NICKNAMES', 'VIEW_AUDIT_LOG'];
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			requiredPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'USE_EXTERNAL_EMOJIS', 'MANAGE_ROLES'],
			aliases: ['addselfrole', 'addselfroles', 'removeselfrole', 'removeselfroles', 'manageroles'],
			cooldown: 5,
			permissionLevel: 6,
			description: language => language.get('COMMAND_SELFROLES_MANAGE'),
			extendedHelp: 'No extended help available.',
			usage: '<role:rolename>'
		});
	}

	async run(msg, [role]) {
		const { roles } = msg.guild.settings.selfroles;
		if (!roles) return msg.send(`｢ **Error** ｣ This guild does not have any self assignable roles.`);

		const myRole = msg.guild.me.roles.highest;
		if (role.position > myRole.position) return msg.send(`｢ **Error** ｣ That role is higher in position than I am, therefore it overranks me.`);

		const permissions = perms.some(permission => role.permissions.has(permission));
		console.log(permissions);
		if (permissions) return msg.send(`｢ **Managing Role** ｣ This role contains an moderator permission that could cause chaos if given to the wrong person. The role cannot be assigned to others.`);

		if (!roles.includes(role.id)) {
			await msg.guild.settings.update('selfroles.roles', role, msg.guild);
			return msg.send(`｢ **Managing Role** ｣ ${role.name} can now be assigned to other users!`);
		} else {
			await msg.guild.settings.update('selfroles.roles', role, msg.guild);
			return msg.send(`｢ **Managing Role** ｣ ${role.name} can no longer be assigned to other users.`);
		}
	}

};
