import { Trie } from './trie/trie'

export type CashedValues = {
    array: Uint8Array
    trie: Trie
}

export type Nil = null | undefined
