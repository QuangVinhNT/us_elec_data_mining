export default function DateFormat(date) {
	const dateOrigin = new Date(date)
	const year = dateOrigin.getFullYear()
	const month =
		dateOrigin.getMonth() + 1 < 10
			? `0${dateOrigin.getMonth() + 1}`
			: dateOrigin.getMonth() + 1
	const day =
		dateOrigin.getDate() < 10
			? `0${dateOrigin.getDate()}`
			: dateOrigin.getDate()
	const hour =
		dateOrigin.getHours() < 10
			? `0${dateOrigin.getHours()}`
			: dateOrigin.getHours()
	const minute =
		dateOrigin.getMinutes() < 10
			? `0${dateOrigin.getMinutes()}`
			: dateOrigin.getMinutes()
	const second =
		dateOrigin.getSeconds() < 10
			? `0${dateOrigin.getSeconds()}`
			: dateOrigin.getSeconds()
	return `${day}/${month}/${year} ${hour}:${minute}:${second}`
}
