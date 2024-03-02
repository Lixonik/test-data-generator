import { Trie } from './trie/trie'

export type CashedValues = {
    array: Uint8Array
    tries: {
        rus: Trie,
        en: Trie
    }
}

export type Nil = null | undefined
