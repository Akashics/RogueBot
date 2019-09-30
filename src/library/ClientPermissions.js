const { PermissionLevels } = require('klasa');

const permissionLevels = new PermissionLevels()
	.add(0, () => true)
	.add(3, ({guild, member}) => guild && guild.settings.permissions.dj.includes(member.id), { fetch: true })
	.add(6, ({guild, member}) => {
		if (!guild || guild.available || !member) return false;
		return member.permissions.has('MANAGE_GUILD');
	}, { fetch: true })
	.add(7, ({guild, member}) => {
		if (!guild || !guild.available || !member) return false;
		return member.id === guild.owner.id;
	})
	.add(9, ({author, client}) => author.id === client.options.ownerID, { break: true })
	.add(10, ({author, client}) => author.id === client.options.ownerID);

module.exports = permissionLevels;

