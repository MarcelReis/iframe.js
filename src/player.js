import createProxy from "./proxy";

const Proxy = createProxy("player");

document.querySelector("button").addEventListener("click", () => {
	Proxy.trigger("play", "dQw4w9WgXcQ");
});

Proxy.on("songPlayed", (songId) => {
	console.log(`songPlayed ${songId}`);
});
