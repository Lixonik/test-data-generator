import { Trie } from './trie/trie'
import { PREFIXES as EN_PREFIXES, SUFFIXES as EN_SUFFIXES, WORDS as EN_WORDS } from './locales/en/constants'
import { PREFIXES as RUS_PREFIXES, SUFFIXES as RUS_SUFFIXES, WORDS as RUS_WORDS } from './locales/ru/constants'
import { Nil } from './types'

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

    trie.insertDictionary(RUS_PREFIXES, RUS_WORDS, RUS_SUFFIXES)

    return trie
}
export const isEmpty = (obj: any) =>
    [Object, Array].includes((obj || {}).constructor) && !Object.entries(obj || {}).length

export const isNil = (value: unknown): value is Nil => value === undefined || value === null

export const isDefined = <T>(value: T | Nil): value is T => !isNil(value)

export const mergeInitValueWithPartialOpts = <T extends object>(partialOpts: Partial<T>, initOpts: T): T => Object.assign(Object.create(initOpts.constructor.prototype), { ...initOpts, ...partialOpts })
