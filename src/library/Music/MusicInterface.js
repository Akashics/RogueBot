const Song = require('./Song');
const MusicResponse = require('./MusicResponse');

class MusicInterface {

	constructor(guild) {
		Object.defineProperty(this, 'client', { value: guild.client });
		Object.defineProperty(this, 'guild', { value: guild });

		this.player.on('event', this.handleEvent.bind(this));
		this.textChannel = null;
		this.queue = [];
		this.looping = false;
		this.preparing = false;
	}

	async addSong(track, requestor, playlist = false) {
		const song = new Song(track, requestor);
		this.queue.push(song);
		if (this.textChannel && this.queue.length > 1 && !playlist) {
			const embed = MusicResponse.queueEmbed(song);
			this.client.channels.get(this.textChannel.id).send({ embed });
		}
		return this._play();
	}

	async _play() {
		if (this.busy || !this.queue.length) return;
		this.preparing = true;
		if (this.textChannel) {
			const embed = MusicResponse.playEmbed(this.queue[0]);
			this.client.channels.get(this.textChannel.id).send({ embed });
		}

		await this.player.setVolume(this.volume);
		await this.player.play(this.queue[0].track);
		this.preparing = false;
	}

	/**
     * Joins the voice channel which the bot will play tracks in
     * @param {VoiceChannel} voiceChannel The voice channel the bot is connected to
     * @returns {string}
     */
	join(voiceChannel) {
		return this.player.join(voiceChannel, { deaf: true });
	}

	/**
     * Leaves the voice channel the bot is connected to
     * @param {boolean} force Force leave option
     * @returns {MusicInterface}
     */
	async leave(force = true) {
		if (this.player && (this.playing || force)) this.player.stop();
		await this.player.leave(this.guild.id);
		return this;
	}

	/**
     * Pause/Resume the player
     * @returns {Promise<boolean>}
     */
	async pause() {
		await this.player.pause(!this.paused);
		return this.paused;
	}

	/**
     * Skips the current song in the queue
     * @param {boolean} force Force skip option
     * @returns {MusicInterface}
     */
	skip(force = true) {
		if (this.player && force) this.player.stop();
		else this.queue.shift();
		return this;
	}

	/**
     * Clears the current queue
     * @returns {MusicInterface}
     */
	clearQueue() {
		this.queue = [];
		return this;
	}

	/**
     * Destroys the current interface
     * @returns {void}
     */
	async destroy() {
		this.queue = null;
		this.textChannel = null;
		this.looping = null;

		await this.leave();
		await new Promise(res => setTimeout(() => res(), 500));
		if (this.player) this.player.destroy();
		this.client.music.delete(this.guild.id);
	}

	handleEvent(event) {
		if (event.type === 'TrackEndEvent') {
			if (this.looping) {
				this.queue.push(this.queue.shift());
			} else if (this.queue && this.queue.length >= 1) {
				this.queue.shift();
			}
			return this._play();
		}
		if (event.type === 'TrackExceptionEvent' || event.type === 'TrackStuckEvent') {
			this.queue.shift();
			this._play();
			return this.client.channels.get(this.textChannel.id).send({ embed: MusicResponse.trackException() });
		}
		this.destroy();
		return this.client.emit('warn', `Unexpected EventType: ${event.type}`);
	}

	get voiceChannel() {
		return this.guild.me.voice.channel;
	}

	get player() {
		return this.client.lavalink.get(this.guild.id) || null;
	}

	get volume() {
		return this.guild.settings.musicVolume;
	}

	get playing() {
		return this.player.playing;
	}

	get paused() {
		return this.player.paused;
	}

	get busy() {
		return this.player.playing || this.player.paused || this.preparing;
	}

	/**
     * Check if a guild member is listening to music
     * @param {GuildMember} member The member you want to check
     * @returns {boolean}
     */
	isListening(member) {
		return !member.voice.deaf && member.voice.channel.id === this.voice.channel.id;
	}

}

module.exports = MusicInterface;
