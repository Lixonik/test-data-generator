import { Case, NumberOpts, PartNameOpts, StringOpts } from './types'

const ENGLISH_ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
export const initGenStringOpts: StringOpts = {
    charSet: ENGLISH_ALPHABET,
    length: 5
}

export const initGenNumberOpts: NumberOpts = {
    min: 0,
    max: 100
}

export const initGenPartNameOpts: PartNameOpts = {
    gender: 'male',
    type: 'surname',
    length:'medium',
    language: 'en',
    padej: 'nominative'
}