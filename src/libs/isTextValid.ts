import bannedWordsObject from 'naughty-words'
import cipher from './cipher.json'
import { z } from 'zod'

type Cipher = Record<string, string>

function decode(word: string, cipher: Cipher): string {
	let decodedWord = ''
	for (let char of word) {
		decodedWord += char in cipher ? cipher[char] : char
	}
	return decodedWord
}

function censorWord(word: string): string {
	if (word.length <= 2) return '*'.repeat(word.length)
	return word[0] + '*'.repeat(word.length - 2) + word[word.length - 1]
}

export function isTextValid(text: string): {
	valid: boolean
	text: string
	message: string
} {
	let censoredText = text
	const processedText = text.replace(/[_\.]/g, '').toLowerCase()
	const decodedText = decode(processedText, cipher)
	const reversedDecodedText = decodedText.split('').reverse().join('')

	const bannedWordsInEnglish = bannedWordsObject['en']
	let containsBannedWords = false

	let bannedWordsFound: string[] = []

	for (let word of bannedWordsInEnglish) {
		const decodedWord = decode(word, cipher)
		if (
			decodedText.includes(decodedWord) ||
			reversedDecodedText.includes(decodedWord)
		) {
			containsBannedWords = true
			const censoredWord = censorWord(word)
			censoredText = censoredText.replace(
				new RegExp(word, 'gi'),
				censoredWord,
			)

			if (!bannedWordsFound.includes(censoredWord)) {
				bannedWordsFound.push(censoredWord)
			}
		}
	}

	let message = ''
	if (containsBannedWords) {
		let bannedWordsList = bannedWordsFound.join(', ')
		message = `contains banned words: ${bannedWordsList}`
	}

	return {
		valid: !containsBannedWords,
		text: censoredText,
		message,
	}
}
