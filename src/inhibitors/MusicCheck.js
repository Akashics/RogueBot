const { Inhibitor } = require('klasa');

const channels = ['493547657487319080', '495402375469596675', '493934134754934795'];

module.exports = class extends Inhibitor {

	constructor(...args) {
		super(...args, {
			name: 'MusicCheck',
			enabled: true,
			spamProtection: true
		});
	}

	async run(msg, cmd) {
		if (!channels.includes(msg.channel.id)) throw true;
		if (cmd.category !== 'Music' || !msg.guild) return;
		if (msg.channel.id === '493547657487319080') throw true;
		if (!msg.member) await msg.guild.members.fetch(msg.author);

		const { voice } = msg.member;
		const { queue } = msg.guild.music;
		const { me } = msg.guild;
		if (cmd.name === 'music') return;
		if (cmd.name === 'play' || cmd.name === 'join') {
			if (!voice || !voice.channel) throw msg.send('｢ **Error** ｣ Y\'aint in any voice channels m8.');
			if (!voice.channel.joinable) throw msg.send('｢ **Error** ｣ That channel is not joinable, it may be too full for my mixtape. :fire:');
			if (!voice.channel.speakable) throw msg.send('｢ **Error** ｣ No point in playing if I can\'t drop a sick beat.');
			return;
		}
		if (!me.voice || !me.voice.channel) throw msg.send('｢ **Error** ｣ I do not currently reside in a voice channel, try to join me to one.');
		if (['queue', 'clearqueue', 'removsong', 'loop', 'shuffle'].includes(cmd.name)) {
			if (!queue.length) throw msg.send('｢ **Error** ｣ You need to add some songs to the queue.');
		}
		if (['skip', 'nowplaying', 'pause'].includes(cmd.name)) {
			if (!msg.guild.music.playing) throw msg.send('｢ **Error** ｣ There\'s nothing playing currently.');
		}
		if (cmd.name === 'resume') {
			if (!msg.guild.music.paused) throw msg.send('｢ **Error** ｣ You cannot resume a already playing song.');
		}
	}

};
