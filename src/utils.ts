import crypto from 'crypto'
import { UUID } from 'node:crypto'
import { Trie } from './trie/trie'
import { PREFIXES as EN_PREFIXES, SUFFIXES as EN_SUFFIXES, WORDS as EN_WORDS } from './en/constants'
import { PREFIXES as RUS_PREFIXES, SUFFIXES as RUS_SUFFIXES, WORDS as RUS_WORDS } from './rus/constants'
import { Nil } from './types'

export const randomArray16bytes = (): Uint8Array => {
    const rnd8Pool = new Uint8Array(256)
    crypto.randomFillSync(rnd8Pool)

    return rnd8Pool.slice(0, 16)
}

const byteToHex: string[] = []

for (let i = 0; i < 256; ++i) {
    byteToHex.push((i + 0x100).toString(16).slice(1))
}

export const arrayToUUID = (array: Uint8Array): UUID => (
    byteToHex[array[0]] +
    byteToHex[array[1]] +
    byteToHex[array[2]] +
    byteToHex[array[3]] +
    '-' +
    byteToHex[array[4]] +
    byteToHex[array[5]] +
    '-' +
    byteToHex[array[6]] +
    byteToHex[array[7]] +
    '-' +
    byteToHex[array[8]] +
    byteToHex[array[9]] +
    '-' +
    byteToHex[array[10]] +
    byteToHex[array[11]] +
    byteToHex[array[12]] +
    byteToHex[array[13]] +
    byteToHex[array[14]] +
    byteToHex[array[15]]
).toLowerCase() as UUID


/**
 * Fisher-Yates Sorting Algorithm
 * https://www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/
 * @param array
 */
export const shuffleUint8Array = (array: Uint8Array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
}

export function shuffleArray<T>(array: T[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

export const generatePreparedTrie: () => Trie = () => {
    let trie = new Trie();

    trie.insertDictionary(EN_PREFIXES, EN_WORDS, EN_SUFFIXES)

    return trie
}

export const generatePreparedRusTrie: () => Trie = () => {
    let trie = new Trie();

    trie.insertDictionary(RUS_PREFIXES, RUS_WORDS, RUS_SUFFIXES)

    return trie
}

export const isNil = (value: unknown): value is Nil => value === undefined || value === null

export const isEmpty = (obj: any) =>
    [Object, Array].includes((obj || {}).constructor) && !Object.entries(obj || {}).length