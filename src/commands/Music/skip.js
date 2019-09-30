const MusicCommand = require('../../library/Music/MusicCommand');

module.exports = class extends MusicCommand {

	constructor(...args) {
		super(...args, {
			requireDJ: true,
			requireMusic: true,
			cooldown: 8,
			aliases: ['loopsong', 'repeat'],
			requiredPermissions: ['USE_EXTERNAL_EMOJIS'],
			description: language => language.get('COMMAND_SKIP_DESCRIPTION'),
			extendedHelp: 'No extended help available.'
		});
		this.votes = new Map();
	}

	async run(msg) {
		if (!msg.guild.me.voice.channel || !msg.guild.music.playing) return msg.send('｢ **Error** ｣ I am not playing anything, so I can\'t really do anything.');
		const { music } = msg.guild;
		const { queue } = music;
		const threshold = Math.ceil(msg.guild.me.voice.channel.members.size / 3);
		const force = threshold <= 1 || msg.guild.me.voice.channel < threshold || await msg.hasAtLeastPermissionLevel(3);

		if (force) return msg.send(this.skip(msg.guild));

		const vote = this.votes.get(msg.guild.id);
		if (vote && vote.count >= 1) {
			if (vote.users.some(user => user === msg.author.id)) return msg.send("｢ **Error** ｣ You've already voted to skip this song.");

			vote.count++;
			vote.users.push(msg.author.id);
			if (vote.count >= threshold) return msg.send(this.skip(msg.guild));

			const time = this.setTimeout(msg.channel, vote);
			const remaining = threshold - vote.count;

			return msg.send(`${vote.count} vote${vote.count > 1 ? 's' : ''} received so far, ${remaining} more ${remaining > 1 ? 'are' : 'is'} needed to skip this song. Five more seconds on the :clock1:! The vote will end in ${time} seconds.`); // eslint-disable-line max-len
		} else {
			const newVote = {
				count: 1,
				users: [msg.author.id],
				queue: queue,
				guild: msg.guild.id,
				start: Date.now(),
				timeout: null
			};

			const time = this.setTimeout(msg.channel, newVote);
			this.votes.set(msg.guild.id, newVote);
			const remaining = threshold - 1;

			return msg.send(`｢ **Starting a Vote Skip:** ｣ ${remaining} more vote${remaining > 1 ? 's are' : ' is'} required for this song to be skipped. The vote will end in ${time} seconds.`);
		}
	}

	skip(guild) {
		if (this.votes.has(guild.id)) {
			clearTimeout(this.votes.get(guild.id).timeout);
			this.votes.delete(guild.id);
		}

		const [song] = guild.music.queue;
		guild.music.skip();
		return `｢ **Skip** ｣ Skipped: **${song ? song.title : 'N/A'}**`;
	}

	setTimeout(textChannel, vote) {
		const time = vote.start + 15000 - Date.now() + ((vote.count - 1) * 5000);
		clearTimeout(vote.timeout);
		vote.timeout = setTimeout(() => {
			this.votes.delete(vote.guild);
			textChannel.send('｢ **Skip Song** ｣ The vote to skip the current song has ended.');
		}, time);

		return Math.round(time / 1000);
	}

};
