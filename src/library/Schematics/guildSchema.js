const { KlasaClient } = require('klasa');

module.exports = KlasaClient.defaultGuildSchema
// Permissions
	.add('permissions', folder => folder
		.add('dj', 'user', { array: true }))

	// Automod
	.add('automod', folder => folder
		.add('invites', 'boolean', { default: false }))

	// Self Roles
	.add('selfroles', folder => folder
		.add('roles', 'role', { array: true })
		.add('enabled', 'boolean', { default: true }))

	// Misc
	.add('musicVolume', 'integer', { default: 25, max: 100, min: 0 })
	.add('djOnly', 'boolean', { default: false });
