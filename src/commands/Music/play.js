const MusicCommand = require('../../library/Music/MusicCommand');
const MusicResponse = require('../../library/Music/MusicResponse');
const { friendlyDuration } = require('../../library/ClientMethods');

/* eslint-disable no-useless-escape */

module.exports = class extends MusicCommand {

	constructor(...args) {
		super(...args, {
			requireDJ: true,
			cooldown: 5,
			aliases: ['musicplay'],
			requiredPermissions: ['USE_EXTERNAL_EMOJIS', 'EMBED_LINKS', 'ATTACH_FILES'],
			description: language => language.get('COMMAND_PLAY_DESCRIPTION'),
			usage: '<song:string>',
			extendedHelp: 'No extended help available.'
		});
		this.delayer = time => new Promise(res => setTimeout(() => res(), time));
	}

	async run(msg, [songs]) {
		if (!msg.guild.me.voice.channelID && msg.member.voice.channelID) await msg.guild.music.join(msg.member.voice.channelID);
		let response;
		if (this.isLink(songs)) {
			response = await msg.guild.lavalink.node.load(songs);
		} else {
			const seachQuery = songs.split(' ').map(str => encodeURIComponent(str)).join(' ');
			response = await msg.guild.lavalink.node.load(`ytsearch: ${seachQuery}`);
		}
		msg.guild.music.textChannel = msg.channel;
		const { loadType, playlistInfo, tracks } = response;

		if (loadType === 'TRACK_LOADED') {
			return this._addSong(msg, tracks);
		} else if (loadType === 'PLAYLIST_LOADED') {
			return this._addPlaylist(msg, tracks, playlistInfo.name);
		} else if (loadType === 'SEARCH_RESULT') {
			return this._search(msg, tracks);
		} else if (loadType === 'NO_MATCHES') {
			return msg.channel.send({ embed: MusicResponse.noMatches(songs) });
		} else {
			return msg.channel.send({ embed: MusicResponse.loadFailed(songs) });
		}
	}

	isLink(arg) {
		return /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g.test(arg);
	}

	async _addSong(msg, tracks) {
		if (!tracks) throw '｢ **Error** ｣ MusicManager provided an empty track to play.';
		return msg.guild.music.addSong(tracks[0], msg.author);
	}

	_addPlaylist(msg, tracks, playlistName = 'Youtube Playlist') {
		if (!tracks) throw '｢ **Error** ｣ MusicManager provided an empty list of tracks to play.';
		const limitedSongs = tracks.slice(0, 5);
		msg.channel.send(`｢ **Now Queueing** ｣  Adding **${limitedSongs.length}** songs from **${playlistName}** to this music queue.`);
		return limitedSongs.map((track) => msg.guild.music.addSong(track, msg.author, true));
	}

	async _search(msg, tracks) {
		if (!tracks) throw '｢ **Error** ｣ MusicManager provided an empty list of tracks to play.';
		const { content } = await msg.prompt([
			`:musical_note: **Select a Song Entry**\n`,
			`${tracks.slice(0, 5).map((option, index) => `**｢${++index}｣** _${option.info.title}_  by __${option.info.author}__ (~${friendlyDuration(option.info.length)})`).join('\n')}`,
			`\n${msg.author}, Reply with a number from a range of \`1-5\` to add it's song to the queue.`], 20000).catch(() => null);

		if (!content) throw ':x: Invalid Option Selected. Cancelled song selection.';
		const selectedNo = Number(content);
		if (selectedNo <= 0 || selectedNo > 5 || selectedNo !== Number(selectedNo)) throw ':x: Invalid Option Selected. Cancelled song selection.';

		return msg.guild.music.addSong(tracks[selectedNo - 1], msg.author, false);
	}

};
