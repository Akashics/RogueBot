const MusicCommand = require('../../library/Music/MusicCommand');
const { MessageEmbed } = require('discord.js');

module.exports = class extends MusicCommand {

	constructor(...args) {
		super(...args, {
			cooldown: 30,
			aliases: ['np', 'currentsong', 'song'],
			requiredPermissions: ['USE_EXTERNAL_EMOJIS', 'EMBED_LINKS'],
			description: language => language.get('COMMAND_MUSIC_DESCRIPTION'),
			extendedHelp: 'No extended help available.'
		});
	}

	async run(msg) {
		const prefix = msg.guild.settings.get('prefix');
		const embed = new MessageEmbed()
			.setColor('#91c3d2')
			.setTitle('🎵 Music Help')
			.setTimestamp()
			.setFooter(this.client.user.tag)
			.setDescription('Enjoy quality music right in your Discord! No shortcuts are made to bring you the best to offer.')
			.addField(`• ${prefix}play`, `For Song Selector Use: \`${prefix}play <Song Name>\`, For Playlists, YouTube Video URLs, Soundcloud URLs, Live Streams, etc. use \`${prefix}play <URL>\`, for SoundCloud Search or YouTube Search use: \`${prefix}play <ytsearch|scsearch>:<song name>\`.`) // eslint-disable-line max-len
			.addField(`• ${prefix}stop`, 'Stops the music and clears the queue. Requires `DJ` permissions or better.')
			.addField(`• ${prefix}skip`, 'Skip the current song instantly if there are 3 or less people in the voice channel. It does a vote skip if there are more people. Requires `DJ` or above.')
			.addField(`• ${prefix}pause`, 'Pause the music. Requires `DJ` permissions or better.')
			.addField(`• ${prefix}resume`, 'Resume the paused music. Requires `DJ` permissions or better.')
			.addField(`• ${prefix}queue`, 'Tells you which all songs are in the queue with more information.')
			.addField(`• ${prefix}lyrics [Disabled]`, 'Enter a song name and get lyrics for it on the go easily.')
			.addField(`• ${prefix}nowplaying`, 'Get information about the currently playing song.')
			.addField(`• ${prefix}dmsong`, 'Direct Messages you the information about the currently playing song.')
			.addField(`• ${prefix}loop`, 'Loop a song to repeat everytime it finishes.')
			.addField(`• ${prefix}toggledj`, 'Allow a `Mod` and above to make music commands `DJ` mode only.')
			.addField(`• ${prefix}shuffle`, 'Shuffle the song queue to randomize it.')
			.addField(`• ${prefix}volume`, 'Change the playing song\'s volume in a voice channel.')
			.addField('\u200B', `\n**Note:** This feature does go through constant development most of the time. If you notice any bugs in the bot, please report it to Kashall.`); // eslint-disable-line max-len

		return msg.sendEmbed(embed);
	}

};
