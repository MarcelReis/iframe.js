import EventEmitter from "./eventEmitter";

class Proxy extends EventEmitter {
	constructor(id) {
		super();

		const iframe = document.createElement("iframe");
		iframe.src = `iframe.html`;
		iframe.frameBorder = 0;
		document.getElementById(id).append(iframe);
		this.iframe = iframe;

		window.addEventListener("message", (event) => {
			this.trigger(event.data.message, event.data.vars);
		});
	}
}

function createProxy(id) {
	const proxy = new Proxy(id);

	proxy.on("all", (message, vars) => {
		proxy.iframe.contentWindow.postMessage({ message, vars }, "*");
	});

	return proxy;
}

export default createProxy;
