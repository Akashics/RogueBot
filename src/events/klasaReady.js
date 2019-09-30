const { Event } = require('klasa');
const { Cluster } = require('lavalink');
const { nodes, defaultRegions } = require('../../settings');

module.exports = class KlasaReady extends Event {

	async run() {
		const { client } = this;

		this.client.lavalink = new Cluster({
			nodes: nodes.map(node => {
				node.userID = this.client.user.id;
				node.shardCount = this.client.shard ? this.client.shard.count : 1;
				return node;
			}),
			send(guildID, packet) {
				if (client.guilds.has(guildID)) return client.ws.broadcast(packet);
				throw new Error('attempted to send a packet on the wrong shard');
			},
			filter(node, guildID) {
				return true;
			}
		});
		this.client.user.setPresence({ activity: { name: 'Pagey\'s Guild', type: 'WATCHING' } });
	}


};
