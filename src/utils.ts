import { Trie } from './trie/trie'
import { PREFIXES as EN_PREFIXES, SUFFIXES as EN_SUFFIXES, WORDS as EN_WORDS } from './locales/en/dictionary'
import { PREFIXES as RU_PREFIXES, SUFFIXES as RU_SUFFIXES, WORDS as RU_WORDS } from './locales/ru/dictionary'
import { ClassFields, Nil, NumberOpts, PartNameOpts, StringOpts } from './types'
import { ENGLISH_ALPHABET } from './constants'

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

export const generatePreparedRusTrie: () => Trie = () => {
    let trie = new Trie()

    trie.insertDictionary(RU_PREFIXES, RU_WORDS, RU_SUFFIXES)

    return trie
}
export const isEmpty = (obj: any) =>
    [Object, Array].includes((obj || {}).constructor) && !Object.entries(obj || {}).length

export const isNil = (value: unknown): value is Nil => value === undefined || value === null

export const isDefined = <T>(value: T | Nil): value is T => !isNil(value)

export const mergeInitValueWithPartialOpts = <T extends object>(partialOpts: Partial<T>, initOpts: T): T => Object.assign(Object.create(initOpts.constructor.prototype), { ...initOpts, ...partialOpts })

export class CPartNameOpts {
    gender: PartNameOpts['gender'] = 'male'
    type: PartNameOpts['type'] = 'surname'
    length: PartNameOpts['length'] = 'medium'
    language: PartNameOpts['language'] = 'en'
    padej: PartNameOpts['padej'] = 'nominative'

    constructor(opts: Partial<ClassFields<CPartNameOpts>>) {
        Object.assign(this, opts)
    }
}

export class CStringOpts {
    charSet: StringOpts['charSet']= ENGLISH_ALPHABET
    length: StringOpts['length']= 5

    constructor(opts: Partial<ClassFields<CStringOpts>>) {
        Object.assign(this, opts)
    }
}

export class CNumberOpts {
    min: NumberOpts['min'] = 0
    max: NumberOpts['max'] = 100

    constructor(opts: Partial<ClassFields<CNumberOpts>>) {
        Object.assign(this, opts)
    }
}