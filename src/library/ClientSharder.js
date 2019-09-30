const numberCores = require('os').cpus().length;
const { ShardingManager, Util } = require('discord.js');

class LoadBalancedSharder extends ShardingManager {

	constructor(file, options) {
		super(file, options);

		this.shardsPerCore = options.shardsPerCore || 1;
	}

	async spawn(amount = this.totalShards, ...rest) {
		// if amount = string or 'auto' \/
		if (typeof amount === 'string') amount = await Util.fetchRecommendedShards(this.token);
		console.log(`｢ Load Balancer ｣ Spawning ${amount} shard(s) with ${numberCores} core(s).`);
		// amount = shards recommended, core count and how many shards should be placed for each core (sooner or later this will be auto)
		amount = Math.min(amount, numberCores * this.shardsPerCore);
		this.shardsPerProcess = Math.ceil(amount / this.totalShards);
		return super.spawn(amount, ...rest);
	}

}

module.exports = LoadBalancedSharder;
