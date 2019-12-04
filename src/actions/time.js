export function getTime() {
	const now = new Date();
	const h = now.getHours();
	const m = now.getMinutes();
	const strh = h < 10 ? `0${h}` : h;
	const strm = m < 10 ? `0${m}` : m;
	return `${strh}:${strm}`;
}
