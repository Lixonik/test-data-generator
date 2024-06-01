import { TrieNode } from './trie/trie'

export type UUID = `${string}-${string}-${string}-${string}-${string}`

export type Nil = null | undefined

export type StackItem = { node: TrieNode, word: string, accumulatedLength: number }

export type Language = 'en' | 'ru'

/**
 * length = 'extra-larger depends on last name
 */
export type PartNameOpts = {
    gender: 'male' | 'female'
    type: 'name' | 'surname' | 'patronymic'
    length: 'small' | 'medium' | 'large' | 'extra_large'
    language: Language
    padej: Case
}

export type ClassFields<Model> = {
    [field in keyof Model as Model[field] extends (...args: any[]) => any ? never : field]: Model[field]
}

export type Case = 'nominative' | 'genitive' | 'dative' | 'accusative' | 'instrumental' | 'prepositional'

export type StringOpts = {
    charSet: string[] | string
    length: number
}

export type NumberOpts = {
    min: number
    max: number
}

export type MeaningfulStringOpts = {
    length: number
    separator: string
    language: Language
}