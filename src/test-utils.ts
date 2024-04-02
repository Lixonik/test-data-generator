import { v4 as uuidGenerator } from 'uuid'
import {
    generatePreparedRusTrie,
    generatePreparedTrie,
} from './utils'
import { Case, CashedValues, PartNameOpts, PersonsList, UUID } from './types'
import PERSONS_RU from './persons/rus/persons.json'
import PERSONS_EN from './persons/en/persons.json'

export default class TestUtils {
    private static tries = {
        rus: generatePreparedRusTrie(),
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
        return this.tries.rus.getRandomFullString(length, separator)
    }

    /**
     * opts = { gender, middle,  }
     */


    /**
     * Declines the given Russian word based on its type and case.
     * Important: This is a simplified example; real declension uses complex rules and exceptions.
     * @param word The word to decline.
     * @param type The type of the word (name, surname, or patronymic).
     * @param gender The gender of the person (male or female).
     * @param padej The grammatical case to decline into.
     */
    private static declineWord(word: string, type: 'name' | 'surname' | 'patronymic', gender: 'male' | 'female', padej: Case): string {
        // Simplified declension rules. Needs to be expanded with appropriate logic.
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

        // Decline based on the identified rules.
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

        return word // No declension rule applicable, return the word as is (e.g., for foreign or neutral names).
    }

    /**
     * @param opts - Options object for length, gender, and type of name component
     * @param padej - The grammatical case in Russian
     */
    static generatePerson({ type, length, gender, padej, language }: PartNameOpts): string {
        padej ??= 'nominative'
        length ??= 'medium'
        language ??= 'en'

        let lengthList: string[]
        // Access the appropriate list based on the provided opts

        switch (language) {
            case 'rus':
                lengthList = this.personsListRu[type][gender][length] || this.personsListRu[type][gender]['medium'];
                break
            case 'en':
                lengthList = this.personsListEn[type][gender][length] || this.personsListEn[type][gender]['medium'];
                break
            default:
                throw new Error('undefined language')
        }
        // Choose a random name, surname or patronymic based on length and gender
        const chosenWord = lengthList[Math.floor(Math.random() * lengthList.length)];

        // Decline the chosen word according to the specified case.
        return language === 'rus' ? this.declineWord(chosenWord, type, gender, padej) : chosenWord
    }

}

type StringOpts = {
    charSet: string[] // char set
    length: number
}

type NumberOpts = {
    min: number
    max: number
}

type ComparedResult = {
    averageOpSpeed: number
    hash: number
    functionName: string
    // 1) median, mode, (?) minDispersion, maxDispersion
    // 2) (?) measurementError (погрешность абсолютная/относительная)
}