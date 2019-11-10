export function load(key) {
	const jsonIn = localStorage.getItem(key);
	if (jsonIn === null) {
		return null;
	}
	const chats = JSON.parse(jsonIn);
	return chats;
}

export function save(key, object) {
	const out = JSON.stringify(object);
	localStorage.setItem(key, out);
}
