const { Structures } = require('discord.js');

module.exports = Structures.extend('Guild', (Guild) => {
	class ClientGuild extends Guild {

		get music() {
			return this.client.music.get(this.id) || this.client.music.add(this);
		}

		get lavalink() {
			return this.client.lavalink.get(this.id) || this.client.music.add(this);
		}

	}
	return ClientGuild;
});
