import { Trie, TrieNode } from './trie/trie'

export type CashedValues = {
    cashedArrayForUUID: Uint8Array
    tries: {
        rus: Trie,
        en: Trie
    }
}

export type UUID = `${string}-${string}-${string}-${string}-${string}`

export type Nil = null | undefined

export type StackItem = { node: TrieNode, word: string, accumulatedLength: number }

/**
 * length = 'extra-larger depends on last name
 */
export type PartNameOpts = {
    gender: 'male' | 'female'
    type: 'name' | 'surname' | 'patronymic'
    length?: 'small' | 'medium' | 'large' | 'extra_large'
    language?: 'en' | 'rus'
    padej?: Case
}

export type Case = 'nominative' | 'genitive' | 'dative' | 'accusative' | 'instrumental' | 'prepositional'

export type NameData = {
    male: {
        small: string[]
        medium: string[]
        large: string[]
        extra_large: string[]
    };
    female: {
        small: string[]
        medium: string[]
        large: string[]
        extra_large: string[]
    };
}

export type PersonsList = {
    name: NameData
    surname: NameData
    patronymic: NameData
}