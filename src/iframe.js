import EventEmitter from "./eventEmitter";

class Iframe extends EventEmitter {
	constructor() {
		super();

		window.addEventListener("message", (event) => {
			this.trigger(event.data.message, ...event.data.vars);
		});
	}

	post(message, vars) {
		window.parent.postMessage({ message, vars }, "*");
	}
}

const iframe = new Iframe();

iframe.on("play", (songId) => {
	console.log(`play ${songId}`);
	iframe.post("songPlayed", songId);
});
