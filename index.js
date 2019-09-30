const ShardingManager = require('./src/library/ClientSharder');
const settings = require('./settings');

const Manager = new ShardingManager('./src/Client.js', {
	totalShards: 'auto',
	token: settings.token,
	respawn: true
});

Manager.on('shardCreate', (shard) => {
	console.log(`｢ Client ｣ Shard ${shard.id + 1} is being created.`);
});

Manager.spawn();
