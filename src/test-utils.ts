import { v4 as uuidGenerator } from 'uuid'
import {
    generatePreparedRusTrie,
    generatePreparedTrie,
} from './utils'
import { Case, CashedValues, PartNameOpts, UUID } from './types'

export default class TestUtils {
    private static tries = {
        rus: generatePreparedRusTrie(),
        en: generatePreparedTrie(),
    }

    private static uuidCounter = 0

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


    static generateFIO({ type, length, gender }: PartNameOpts): string {
        const names = {
            male: {
                small: ['Tom', 'Max', 'Ian'],
                medium: ['James', 'Robert', 'Edward'],
                large: ['Christopher', 'Alexander', 'Benjamin'],
                extra_large: ['Alexander', 'Maximilian', 'Nathaniel'],
            },
            female: {
                small: ['Eve', 'Ada', 'Mia'],
                medium: ['Emma', 'Olivia', 'Sophia'],
                large: ['Charlotte', 'Margaret', 'Elizabeth'],
                extra_large: ['Alexandria', 'Theodora', 'Florentina'],
            },
        }

        const surnames = {
            male: {
                small: ['Fox', 'Shaw', 'Day'],
                medium: ['Johnson', 'Thompson', 'Hamilton'],
                large: ['Montgomery', 'Wellington', 'Underwood'],
                extra_large: ['Cunningham', 'Blackwood', 'Fitzgerald'],
            },
            female: {
                small: ['May', 'Rose', 'Wu'],
                medium: ['Miller', 'Stevens', 'Adams'],
                large: ['Chamberlain', 'Middleton', 'Windsor'],
                extra_large: ['Cunningham', 'Blackwood', 'Fitzgerald'],
            },
        }

        // In English tradition, patronymic-like names can be middle names often passed down from a family member.
        const middleNames = {
            male: {
                small: ['Jay', 'Lee', 'Kai'],
                medium: ['Michael', 'William', 'Thomas'],
                large: ['Alexander', 'Jeremiah', 'Nathaniel'],
                extra_large: ['Christopher', 'Maximilian', 'Theodore'],
            },
            female: {
                small: ['Lynn', 'Ann', 'Jade'],
                medium: ['Marie', 'Grace', 'Jane'],
                large: ['Elizabeth', 'Joanna', 'Catherine'],
                extra_large: ['Alexandra', 'Victoria', 'Josephine'],
            },
        }

        // Choose the correct list based on the type and gender
        let chosenList
        switch (type) {
            case 'name':
                chosenList = names[gender][length]
                break
            case 'surname':
                chosenList = surnames[gender][length]
                break
            case 'patronymic': // English doesn't have true patronymics, so using middle names instead
                chosenList = middleNames[gender][length]
                break
        }

        // Get a random index to pick an item from the list
        const randomIndex = Math.floor(Math.random() * chosenList.length)
        return chosenList[randomIndex]
    }

    static dataLists = {
        name: {
            male: {
                small: ['Иван', 'Алексей', 'Борис'],
                medium: ['Михаил', 'Сергей'],
                large: ['Владимир', 'Александр'],
                extra_large: ['Артемий', 'Анатолий']
            },
            female: {
                small: ['Мария', 'Екатерина', 'Дарья'],
                medium: ['Анастасия', 'Ирина'],
                large: ['Виктория', 'Евгения'],
                extra_large: ['Светлана', 'Людмила']
            },
        },
        surname: {
            male: {
                small: ['Смирнов', 'Иванов', 'Кузнецов'],
                medium: ['Попов', 'Соколов'],
                large: ['Лебедев', 'Новиков'],
                extra_large: ['Морозов', 'Васильев']
            },
            female: {
                small: ['Смирнова', 'Иванова', 'Кузнецова'],
                medium: ['Попова', 'Соколова'],
                large: ['Лебедева', 'Новикова'],
                extra_large: ['Морозова', 'Васильева']
            },
        },
        patronymic: {
            male: {
                small: ['Петрович', 'Иванович'],
                medium: ['Алексеевич', 'Сергеевич'],
                large: ['Владимирович', 'Дмитриевич'],
                extra_large: ['Николаевич', 'Тимофеевич']
            },
            female: {
                small: ['Петровна', 'Ивановна'],
                medium: ['Алексеевна', 'Сергеевна'],
                large: ['Владимировна', 'Дмитриевна'],
                extra_large: ['Николаевна', 'Тимофеевна']
            },
        },
    }

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
    static generateRuFIO({ type, length, gender }: PartNameOpts, padej: Case): string {
        // Access the appropriate list based on the provided opts
        const lengthList = this.dataLists[type][gender][length] || this.dataLists[type][gender]['medium'];

        // Choose a random name, surname or patronymic based on length and gender
        const chosenWord = lengthList[Math.floor(Math.random() * lengthList.length)];

        // Decline the chosen word according to the specified case.
        return this.declineWord(chosenWord, type, gender, padej);
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