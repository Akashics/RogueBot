const MusicCommand = require('../../library/Music/MusicCommand');
const { MessageEmbed } = require('discord.js');
const Lyrics = require('../../library/Music/Lyrics');

module.exports = class extends MusicCommand {

	constructor(...args) {
		super(...args, {
			cooldown: 10,
			enabled: false,
			aliases: ['songlyrics', 'lyric'],
			requiredPermissions: ['USE_EXTERNAL_EMOJIS'],
			description: language => language.get('COMMAND_LYRICS_DESCRIPTION'),
			extendedHelp: 'No extended help available.',
			usage: '[song:string]'
		});
	}

	async run(msg, [song]) {
		if (!song) {
			const { queue } = msg.guild.music;
			if (!queue.length || !queue[0].title) return msg.send('｢ **Error** ｣ There isn\'t anything playing right now, please enter a song name you want lyrics for.');
			song = queue[0].title;
		}

		const req = await Lyrics.request(`search?q=${encodeURIComponent(song)}`);
		const lyricdata = req.response.hits[0];
		if (!lyricdata) return msg.send('｢ **Error** ｣ The provided song could not be found. Please try again with a different one.');

		const picture = lyricdata.result.song_art_image_thumbnail_url;
		const extendedsong = lyricdata.result.title_with_featured;
		const artist = lyricdata.result.primary_artist.name;

		const lyricsbody = await Lyrics.scrape(lyricdata.result.url);
		if (!lyricsbody) return msg.send("｢ **Error** ｣ The provided song's lyrics could not be found. Please try again with a different one.");

		const embed = new MessageEmbed()
			.setColor('#2C2F33')
			.setAuthor(`${extendedsong} - ${artist} | Lyrics`, this.client.user.avatarURL, `http://genius.com/${encodeURIComponent(lyricdata.result.path)}`)
			.setTimestamp()
			.setFooter(this.client.user.tag)
			.setDescription(lyricsbody.length >= 1900 ? `${lyricsbody.substr(0, 1900)}...` : lyricsbody)
			.setThumbnail(picture);
		return msg.sendEmbed(embed);
	}

};
