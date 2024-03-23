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
    length: 'small' | 'medium' | 'large' | 'extra_large'
    gender: 'male' | 'female'
    type: 'name' | 'surname' | 'patronymic'
}

export type Case = 'nominative' | 'genitive' | 'dative' | 'accusative' | 'instrumental' | 'prepositional';