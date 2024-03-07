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