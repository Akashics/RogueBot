const { Client } = require('klasa');
const { WebhookClient } = require('discord.js');

const ClientOptions = require('./ClientOptions');
const permissionLevels = require('./ClientPermissions');
const defaultGuildSchema = require('./Schematics/guildSchema');
const MusicManager = require('./Music/MusicManager');

const settings = require('../../settings');

class Bot extends Client {

	constructor() {
		super({ ...ClientOptions, permissionLevels, defaultGuildSchema });

		Object.defineProperty(this, 'settings', { value: settings });
		this.methods = require('./ClientMethods');

		this.lavalink = null;
		this.music = new MusicManager();

		this.hidden = { sam: false };

		this.logging = new WebhookClient(this.settings.webhook.id, this.settings.webhook.secret);
	}

}

Bot.token = settings.token;
module.exports = Bot;
