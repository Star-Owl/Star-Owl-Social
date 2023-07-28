export default function formatNumber(num: number): string {
	let formattedNum: string | number = num
	if (num > 10000) {
		const x = Math.round(num)
		const xNumberFormat = x.toLocaleString()
		const xArray = xNumberFormat.split(',')
		const xParts = ['K', 'M', 'B', 'T', 'P']
		const xCountParts = xArray.length - 1
		if (xCountParts > xParts.length) {
			return 'out of range'
		}
		let xDisplay =
			xArray[0] + (parseInt(xArray[1][0]) !== 0 ? '.' + xArray[1][0] : '')
		xDisplay += xParts[xCountParts - 1]
		formattedNum = xDisplay
	} else if (num > 1000 && num < 10000) {
		const x = Math.round(num)
		formattedNum = x.toLocaleString()
	}
	return formattedNum.toString()
}
