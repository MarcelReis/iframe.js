import createProxy from "./proxy";

const Proxy = createProxy("player");

document.querySelector(".btn-play").addEventListener("click", () => {
	Proxy.trigger("play");
});

document.querySelector(".btn-pause").addEventListener("click", () => {
	Proxy.trigger("pause");
});

Proxy.on("playerReady", () => {
	console.log("playerReady");
});

Proxy.on("stateChange", (state) => {
	console.log(`stateChange ${state}`);
});
