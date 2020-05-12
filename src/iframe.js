import EventEmitter from "./eventEmitter";

class Iframe extends EventEmitter {
	constructor() {
		super();

		window.addEventListener("message", (event) => {
			this.trigger(event.data.message, event.data.vars);
		});

		this.player = null;
		this.initYT();
	}

	post(message, vars) {
		window.parent.postMessage({ message, vars }, "*");
	}

	initYT() {
		const tag = document.createElement("script");
		tag.src = "https://www.youtube.com/iframe_api";

		const firstScriptTag = document.getElementsByTagName("script")[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

		window.onYouTubeIframeAPIReady = () => {
			this.player = new YT.Player("player", {
				height: "100%",
				width: "100%",
				videoId: "hq1f9qq8YVY",
				events: {
					onReady: this.onPlayerReady,
					onStateChange: this.onStateChange,
				},
				playerVars: {
					controls: 0,
					playsinline: 1,
				},
			});
		};
	}

	onPlayerReady() {
		iframe.post("playerReady");
	}

	onStateChange(event) {
		iframe.post("stateChange", event.data);
	}

	play() {
		this.player.playVideo();
	}

	pause() {
		this.player.pauseVideo();
	}
}

const iframe = new Iframe();

iframe.on("play", () => {
	iframe.play();
});

iframe.on("pause", () => {
	iframe.pause();
});
