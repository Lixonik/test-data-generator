import { declineWord, generatePreparedRuTrie, generatePreparedTrie } from './utils'
import { MeaningfulStringOpts, NumberOpts, PartNameOpts, StringOpts, UUID } from './types'
import { PERSONS as PERSONS_RU } from './persons/ru/persons'
import { PERSONS as PERSONS_EN } from './persons/en/persons'
import { CMeaningfulStringOpts, CNumberOpts, CPartNameOpts, CStringOpts } from './init-classes'

const tries = {
    ru: generatePreparedRuTrie(),
    en: generatePreparedTrie(),
}


const personsListRu = PERSONS_RU
const personsListEn = PERSONS_EN

let uuidCounter = 0
export const generateUUID = (strictRandom: boolean = false): UUID => {
    if (strictRandom) return crypto.randomUUID()

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

export const generateNumber = (opts: Partial<NumberOpts> = {}): number => {
    const { min, max }: NumberOpts = new CNumberOpts(opts)

    if (max < min) {
        throw new Error('the maximum limit must be greater than the minimum!')
    }

    const range = max - min + 1
    return Math.floor(Math.random() * range) + min
}

export const generateString = (opts: Partial<StringOpts> = {}): string => {
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

export const generateMeaningfulString = (opts: Partial<MeaningfulStringOpts> = {}): string => {
    const { length, separator, language } = new CMeaningfulStringOpts(opts)

    switch (language) {
        case 'en':
            return tries.en.getRandomFullString(length, separator)
        case 'ru':
            return tries.ru.getRandomFullString(length, separator)
        default:
            throw new Error(`Unsupported language: ${language}`)
    }
}
