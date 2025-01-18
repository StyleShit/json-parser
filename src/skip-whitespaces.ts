export function skipWhitespaces(json: string, index: number) {
	while (/\s/.test(json[index])) {
		index++;
	}

	return index;
}
