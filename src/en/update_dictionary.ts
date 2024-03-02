import axios from 'axios'
import * as fs from 'fs'

function isValidWord(word: string): boolean {
    const regex = /^[a-zA-Z]+$/; // наличия только латинских букв
    const noDuplicatesRegex = new RegExp(`([a-zA-Z]).*\\1`, 'g'); // отсутствие дубликатов

    return regex.test(word) && !noDuplicatesRegex.test(word);
}


async function getShortEngWords(): Promise<string[]> {
    const response = await axios.get('https://raw.githubusercontent.com/meetDeveloper/freeDictionaryAPI/master/meta/wordList/english.txt')
    if (!response || !response.data) return []

    const shortWords = response.data.split('\n').filter((word: string) => {
        return word.length === 5 && isValidWord(word)
    })

    return shortWords
}

(async () => {
    try {
        const shortWords = await getShortEngWords()
        fs.writeFileSync('./src/en/dictionary.json', JSON.stringify(shortWords))


        console.log('Список коротких английских слов:', shortWords)
    } catch (error) {
        console.error('Ошибка при работе с API:', error)
    }
})()