export function load(key) {
	const jsonIn = localStorage.getItem(key);
	if (jsonIn) {
		const chats = JSON.parse(jsonIn);
		return chats;
	}
	return null;
}

export function save(key, object) {
	const out = JSON.stringify(object);
	localStorage.setItem(key, out);
}