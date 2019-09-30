const ClientOptions = {
	disableEveryone: true,
	messageCacheMaxSize: 100,
	messageCacheLifetime: 240,
	messageSweepInterval: 300,
	commandEditing: true,
	commandLogging: true,
	regexPrefix: /^((?:Hey |Ok )?Rogue(?:,|!| ))/i,
	console: { useColor: true, timestamps: 'MM-DD-YYYY hh:mm:ss A' },
	prefixCaseInsensitive: true,
	noPrefixDM: true,
	prefix: 'p!',
	pieceDefaults: {
		commands: { deletable: true, cooldown: 3, quotedStringSupport: true, bucket: 2 }
	}
};

module.exports = ClientOptions;
