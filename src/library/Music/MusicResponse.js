const { MessageEmbed } = require('discord.js');

module.exports = class MusicResponse {

	static playEmbed(song) {
		return new MessageEmbed()
			.setTitle('Now Playing!')
			.setTimestamp()
			.setFooter('Rogue#1878')
			.setColor('#5cb85c')
			.setDescription([`• **Title:** ${song.title}`,
				`• **Author:** ${song.author}`,
				`• **Length:** ${song.friendlyDuration}`,
				`• **Requested By:** ${song.requester}`,
				`• **Link:** ${song.url}`].join('\n'));
	}

	static queueEmbed(song) {
		return new MessageEmbed()
			.setTitle('Added Song to Queue!')
			.setTimestamp()
			.setFooter('Rogue#1878')
			.setColor('#eedc2f')
			.setDescription([`• **Title:** ${song.title}`,
				`• **Author:** ${song.author}`,
				`• **Length:** ${song.friendlyDuration}`,
				`• **Requested By:** ${song.requester}`,
				`• **Link:** ${song.url}`].join('\n'));
	}

	static stopEmbed() {
		return new MessageEmbed()
			.setTitle('Party\'s Over :(')
			.setTimestamp()
			.setFooter('Rogue#1878')
			.setColor('#d9534f')
			.setDescription(`• **Partys Over:** All the songs from the queue have finished playing.`);
	}

	static loopingSongs(state) {
		return new MessageEmbed()
			.setTitle(`${state ? 'Now' : 'No-Longer'} Looping Indefinitely`)
			.setTimestamp()
			.setFooter('Rogue#1878')
			.setColor('yellow')
			.setDescription(`• **Looping:** All songs will ${state ? 'forever' : 'no longer'} loop indefinitely.`);
	}

	static loadFailed() {
		return new MessageEmbed()
			.setTitle(':warning: Load Failed')
			.setTimestamp()
			.setFooter('Rogue#1878')
			.setColor('yellow')
			.setDescription(`• **Load Failed:** Music playback failed to load due to a few possible issues.
			\nThe song may be claimed or privated and is unabled to be played at this time.`);
	}

	static noMatches() {
		return new MessageEmbed()
			.setTitle(':x: Nothing Was Found')
			.setTimestamp()
			.setFooter('Rogue#1878')
			.setColor('grey')
			.setDescription([`• **No Songs Were Found:** I searched *Youtube, Bandcamp, vimeo and possibly Soundcloud* and found no songs.`,
				`Try removing any non-UTF characters changing your search to match the exact song name.`].join('\n'));
	}

	static trackException() {
		return new MessageEmbed()
			.setTitle('An Error Was Generated')
			.setTimestamp()
			.setFooter('Rogue#1878')
			.setColor('red')
			.setDescription(`• **An Error Was Generated**\nPlease report this error to a developer if this issue continuely exists.`);
	}

};
