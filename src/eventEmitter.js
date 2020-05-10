export default class EventEmitter {
	events = {
		all: [],
	};

	on(eventName, func, context, once) {
		if (!this.events[eventName]) {
			this.events[eventName] = [];
		}

		this.events[eventName].push({ func, context, once });

		return func;
	}

	off(eventName, func) {
		if (!this.events[eventName]) {
			return;
		}

		if (!func) {
			delete this.events[eventName];
			return;
		}

		this.events[eventName] = this.events[eventName].filter(
			(eventObject) => eventObject.func !== func
		);
	}

	once(eventName, func, context) {
		this.on(eventName, func, context, true);
	}

	subscribe(adapter) {
		return this.on(
			"all",
			(...args) => {
				const [eventName, vars] = args;
				adapter.trigger(eventName, ...vars);
			},
			adapter
		);
	}

	trigger(eventName, ...vars) {
		const event = this.events[eventName];

		const callEvent = (eventObject, eventName, vars) => {
			eventObject.func.call(eventObject.context, ...vars);

			if (eventObject.once === true) {
				this.off(eventName, eventObject.func);
			}
		};

		if (event) {
			event.forEach((eventObject) =>
				callEvent(eventObject, eventName, vars)
			);
		}

		this.events.all.forEach((eventObject) =>
			callEvent(eventObject, eventName, [eventName, vars])
		);
	}
}
