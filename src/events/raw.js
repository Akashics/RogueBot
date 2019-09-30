const { Event } = require('klasa');

module.exports = class Raw extends Event {

	run(packet) {
		if (packet.t === 'VOICE_STATE_UPDATE') this.client.lavalink.voiceStateUpdate(packet.d);
		if (packet.t === 'VOICE_SERVER_UPDATE') this.client.lavalink.voiceServerUpdate(packet.d);
	}

};
