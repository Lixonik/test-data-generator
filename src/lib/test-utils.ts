import { v4 as uuidGenerator } from 'uuid'
import {
    generatePreparedRuTrie,
    generatePreparedTrie, CPartNameOpts, CStringOpts, CNumberOpts,
} from './utils'
import {
    Case,
    NumberOpts,
    PartNameOpts,
    StringOpts,
    UUID,
} from './types'
import { PERSONS as PERSONS_RU } from './persons/ru/persons'
import { PERSONS as PERSONS_EN } from './persons/en/persons'


const tries = {
    ru: generatePreparedRuTrie(),
    en: generatePreparedTrie(),
}

let uuidCounter = 0
const personsListRu = PERSONS_RU
const personsListEn = PERSONS_EN

export const generateUUID = (strictRandom: boolean = false): UUID => {
    if (strictRandom) return uuidGenerator() as UUID

    let currentUuidCounter = uuidCounter.toString(16)

    uuidCounter++

    if (uuidCounter === 4096) {
        uuidCounter = 0
    }

    const counterString = currentUuidCounter.padStart(3, '0')

    const baseUUID: UUID = 'f-ffff-ffff-ffff-ffffffffffff'

    const customUUID: UUID = `${counterString}${baseUUID}` as UUID

    return customUUID
}

export const generateMeaningfulString = (length: number, separator?: string): string => {
    return tries.en.getRandomFullString(length, separator)
}

export const generateMeaningfulRuString = (length: number, separator?: string): string => {
    return tries.ru.getRandomFullString(length, separator)
}

export const generateRandomString = (opts: Partial<StringOpts> = {}): string => {
    const { charSet, length }: StringOpts = new CStringOpts(opts)

    const charSetLength = charSet.length
    const buffer = new Uint8Array(length)
    crypto.getRandomValues(buffer)

    let result = ''
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(buffer[i] / 256 * charSetLength)
        result += charSet[randomIndex]
    }

    return result
}

export const generateRandomNumber = (opts: Partial<NumberOpts> = {}): number => {
    const { min, max }: NumberOpts = new CNumberOpts(opts)

    if (max < min) {
        throw new Error('the maximum limit must be greater than the minimum!')
    }

    const range = max - min + 1
    return Math.floor(Math.random() * range) + min
}

/**
 * Declines the given Russian word based on its type and case.
 */
const declineWord = (word: string, type: 'name' | 'surname' | 'patronymic', gender: 'male' | 'female', padej: Case): string => {
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

        // Names ending with a consonant need to be softened in some cases
        return word + suffix
    }

    return word
}

/**
 * @param opts - Options object for length, gender, and type of name component
 * @param padej - The grammatical case in Russian
 */
export const generatePerson = (opts: Partial<PartNameOpts> = {}): string => {
    const { type, length, gender, padej, language } = new CPartNameOpts(opts)

    let lengthList: string[]

    switch (language) {
        case 'ru':
            lengthList = personsListRu[type][gender][length]
            break
        case 'en':
            lengthList = personsListEn[type][gender][length]
            break
        default:
            throw new Error('undefined language')
    }
    // Choose a random name, surname or patronymic based on length and gender
    const chosenWord = lengthList[Math.floor(Math.random() * lengthList.length)]

    // Decline the chosen word according to the specified case.
    return language === 'ru' ? declineWord(chosenWord, type, gender, padej) : chosenWord
}
