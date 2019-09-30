module.exports = class ClientMethods {

	static friendlyDuration(ms) {
		const sec = Math.floor((ms / 1000) % 60).toString();
		const min = Math.floor((ms / (1000 * 60)) % 60).toString();
		const hrs = Math.floor(ms / (1000 * 60 * 60)).toString();
		return `${hrs.padStart(2, '0')}h ${min.padStart(2, '0')}m ${sec.padStart(2, '0')}s`;
	}


};
