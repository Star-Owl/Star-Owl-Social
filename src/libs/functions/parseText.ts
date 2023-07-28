export const parseBodyText = (
	text: string,
	renderUsername: (username: string) => JSX.Element,
	renderHashtag: (hashtag: string) => JSX.Element,
	renderURL: (url: string) => JSX.Element,
) => {
	let parsedText: (string | JSX.Element)[] = [text]

	parsedText = parsedText.flatMap((part) => {
		if (typeof part === 'string') {
			return part
				.split(/#(\w+)/g)
				.map((subpart, i) =>
					i % 2 === 0 ? subpart : renderHashtag(subpart),
				)
		}
		return part
	})

	parsedText = parsedText.flatMap((part) => {
		if (typeof part === 'string') {
			return part
				.split(/@(\w+)/g)
				.map((subpart, i) =>
					i % 2 === 0 ? subpart : renderUsername(subpart),
				)
		}
		return part
	})

	parsedText = parsedText.flatMap((part) => {
		if (typeof part === 'string') {
			return part
				.split(/(\b\S+\.\S+\b)/g) // użycie grupy przechwytującej
				.map((subpart, i) =>
					i % 2 === 0 ? subpart : renderURL(subpart),
				)
		}
		return part
	})

	return parsedText
}
