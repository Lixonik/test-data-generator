import { Trie } from './trie/trie'
import { PREFIXES as EN_PREFIXES, SUFFIXES as EN_SUFFIXES, WORDS as EN_WORDS } from './locales/en/dictionary'
import { PREFIXES as RU_PREFIXES, SUFFIXES as RU_SUFFIXES, WORDS as RU_WORDS } from './locales/ru/dictionary'
import { Nil, PartNameOpts } from './types'

/**
 * Fisher-Yates Sorting Algorithm
 * https://www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/
 * @param array
 */
export function shuffleArray<T>(array: T[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

export const generatePreparedTrie: () => Trie = () => {
    let trie = new Trie()

    trie.insertDictionary(EN_PREFIXES, EN_WORDS, EN_SUFFIXES)

    return trie
}

export const generatePreparedRuTrie: () => Trie = () => {
    let trie = new Trie()

    trie.insertDictionary(RU_PREFIXES, RU_WORDS, RU_SUFFIXES)

    return trie
}

/**
 * Declines the given Russian word based on its type and case.
 */
export const declineWord = (word: string, type: PartNameOpts['type'], gender: PartNameOpts['gender'], padej: PartNameOpts['padej']): string => {
    const declensionRules = {
        name: {
            'male': {
                nominative: '',   // Иван
                genitive: 'а',    // Ивана
                dative: 'у',      // Ивану
                accusative: 'а',  // Ивана
                instrumental: 'ом', // Иваном
                prepositional: 'е', // Иване
            },
            'female': {
                nominative: '',    // Мария
                genitive: 'и',     // Марии
                dative: 'и',       // Марии
                accusative: 'ю',   // Марию
                instrumental: 'ей', // Марией
                prepositional: 'и', // Марии
            },
        },
        surname: {
            'male': {
                nominative: '',   // Смирнов
                genitive: 'а',    // Смирнова
                dative: 'у',      // Смирнову
                accusative: 'а',  // Смирнова
                instrumental: 'ом', // Смирновым
                prepositional: 'е', // Смирнове
            },
            'female': {
                nominative: '',    // Смирнова
                genitive: 'ой',    // Смирновой
                dative: 'ой',      // Смирновой
                accusative: 'у',   // Смирнову
                instrumental: 'ой', // Смирновой
                prepositional: 'ой', // Смирновой
            },
        },
        patronymic: {
            'male': {
                nominative: '',   // Петрович
                genitive: 'а',    // Петровича
                dative: 'у',      // Петровичу
                accusative: 'а',  // Петровича
                instrumental: 'ем', // Петровичем
                prepositional: 'е', // Петровиче
            },
            'female': {
                nominative: '',    // Петровна
                genitive: 'ы',     // Петровны
                dative: 'е',       // Петровне
                accusative: 'у',   // Петровну
                instrumental: 'ой', // Петровной
                prepositional: 'е', // Петровне
            },
        },
    }

    if (declensionRules[type][gender][padej]) {
        let suffix = declensionRules[type][gender][padej]

        if (type === 'name') {
            if (['ий', 'ия'].includes(word.slice(-2)) && gender === 'male' && padej !== 'nominative') {
                return `${word.slice(0, -2)}и${suffix}`
            }
            if (['ия'].includes(word.slice(-2)) && gender === 'female' && padej !== 'nominative') {
                return `${word.slice(0, -1)}${suffix}`
            }
            if (['genitive', 'dative', 'instrumental', 'prepositional'].includes(padej) && ['й', 'ь'].includes(word.slice(-1))) {
                return `${word.slice(0, -1)}${suffix}`
            }
        }
        else if (type === 'surname') {
            if (gender === 'female' && padej !== 'nominative') {
                return word.slice(0, -1) + suffix
            }
        }

        return word + suffix
    }

    return word
}


export const isNil = (value: unknown): value is Nil => value === undefined || value === null
