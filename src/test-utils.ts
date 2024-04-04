import { v4 as uuidGenerator } from 'uuid'
import {
    mergeInitValueWithPartialOpts,
    generatePreparedRusTrie,
    generatePreparedTrie,
} from './utils'
import { Case, NumberOpts, PartNameOpts, PersonsList, StringOpts, UUID } from './types'
import PERSONS_RU from './persons/ru/persons.json'
import PERSONS_EN from './persons/en/persons.json'
import { initGenNumberOpts, initGenPartNameOpts, initGenStringOpts } from './constants'

export default class TestUtils {
    private static tries = {
        ru: generatePreparedRusTrie(),
        en: generatePreparedTrie(),
    }

    private static uuidCounter = 0
    private static personsListRu: PersonsList = PERSONS_RU
    private static personsListEn: PersonsList = PERSONS_EN

    static comparePerformance(...functions: Function[]) {
        functions.forEach(fn => TestUtils.measurePerformance(fn))
    }


    /**
     * 1) макс дисперсия, мин дисперсия
     * 2) ? указание дельт
     * 3) на каждой итерации создавать rnd hash value, чтобы заставлять движок выполнять эту операцию (не оптимизировать)
     *
     * @return ComparedResult
     * @param fn
     * @param loopCount
     * @private
     */
    private static measurePerformance(fn: Function, loopCount?: 1000 | 5000 | 10_000, dispersionLoop?: 10 | 50 | 100) {
        const count = loopCount ?? 1000

        let all = []
        let hash = 0

        // outer loop = dispersionLoop
        for (let i = 0; i < count; i++) {
            hash += Math.random()
            performance.mark(`start ${fn.name}`)
            fn()
            performance.mark(`end ${fn.name}`)
            performance.measure(`${fn.name}`, `start ${fn.name}`, `end ${fn.name}`)
            all.push(performance.getEntriesByName(`${fn.name}`)[0].duration)
        }

        console.log('Measurement hash = ', hash)
        console.log(`${fn.name}: avg ${count} loops = ${all.reduce((acc, v) => acc + v, 0) / all.length} ms`)
    }

    static generateUUID(strictRandom: boolean = false): UUID {
        if (strictRandom) return uuidGenerator() as UUID

        let currentUuidCounter = this.uuidCounter.toString(16)

        this.uuidCounter++

        if (this.uuidCounter === 4096) {
            this.uuidCounter = 0
        }

        const counterString = currentUuidCounter.padStart(3, '0')

        const baseUUID: UUID = '00000-0000-4000-8000-000000000000'

        const customUUID: UUID = `${counterString}${baseUUID.substring(3)}` as UUID

        return customUUID
    }

    static generateMeaningfulString(length: number, separator?: string): string {
        return this.tries.en.getRandomFullString(length, separator)
    }

    static generateMeaningfulRusString(length: number, separator?: string): string {
        return this.tries.ru.getRandomFullString(length, separator)
    }

    /**
     * opts = { gender, middle,  }
     */


    /**
     * Declines the given Russian word based on its type and case.
     * @param word The word to decline.
     * @param type The type of the word (name, surname, or patronymic).
     * @param gender The gender of the person (male or female).
     * @param padej The grammatical case to decline into.
     */
    private static declineWord(word: string, type: 'name' | 'surname' | 'patronymic', gender: 'male' | 'female', padej: Case): string {
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
    static generatePerson(opts: Partial<PartNameOpts> = {}): string {
        const { type, length, gender, padej, language } = mergeInitValueWithPartialOpts(opts, initGenPartNameOpts)

        let lengthList: string[]

        switch (language) {
            case 'ru':
                lengthList = this.personsListRu[type][gender][length]
                break
            case 'en':
                lengthList = this.personsListEn[type][gender][length]
                break
            default:
                throw new Error('undefined language')
        }
        // Choose a random name, surname or patronymic based on length and gender
        const chosenWord = lengthList[Math.floor(Math.random() * lengthList.length)]

        // Decline the chosen word according to the specified case.
        return language === 'ru' ? this.declineWord(chosenWord, type, gender, padej) : chosenWord
    }

    static generateRandomString(opts: Partial<StringOpts> = {}): string {
        const { charSet, length }: StringOpts = mergeInitValueWithPartialOpts(opts, initGenStringOpts)


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

    static generateRandomNumber(opts: Partial<NumberOpts> = {}): number {
        const { min, max }: NumberOpts = mergeInitValueWithPartialOpts(opts, initGenNumberOpts)

        if (max < min) {
            throw new Error('the maximum limit must be greater than the minimum!')
        }

        const range = max - min + 1
        return Math.floor(Math.random() * range) + min
    }

}

type ComparedResult = {
    averageOpSpeed: number
    hash: number
    functionName: string
    // 1) median, mode, (?) minDispersion, maxDispersion
    // 2) (?) measurementError (погрешность абсолютная/относительная)
}