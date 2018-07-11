export function on(elems, events, handler) {
	events = Array.isArray(events) ? events : events.split(",");
	elems = Array.isArray(elems) ? elems : [elems];

	elems.forEach(el => {
		events.forEach(evt => {
			el.addEventListener(evt, handler);
		});
	});
}

export function off(elems, events, fn) {
	events = Array.isArray(events) ? events : events.split(",");
	elems = Array.isArray(elems) ? elems : [elems];

	elems.forEach(el => {
		events.forEach(evt => {
			el.removeEventListener(evt, fn);
		});
	});
}
