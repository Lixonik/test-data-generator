import { ClassFields, Language, MeaningfulStringOpts, NumberOpts, PartNameOpts, StringOpts } from './types'
import { ENGLISH_ALPHABET } from './constants'

/**
 * initialization classes
 */
export class CPartNameOpts implements PartNameOpts {
    gender: PartNameOpts['gender'] = 'male'
    type: PartNameOpts['type'] = 'surname'
    length: PartNameOpts['length'] = 'medium'
    language: PartNameOpts['language'] = 'en'
    padej: PartNameOpts['padej'] = 'nominative'

    constructor(opts: Partial<ClassFields<CPartNameOpts>>) {
        Object.assign(this, opts)
    }
}

export class CStringOpts implements StringOpts {
    charSet: StringOpts['charSet'] = ENGLISH_ALPHABET
    length: StringOpts['length'] = 5

    constructor(opts: Partial<ClassFields<CStringOpts>>) {
        Object.assign(this, opts)
    }
}

export class CNumberOpts implements NumberOpts {
    min = 0
    max = 100

    constructor(opts: Partial<ClassFields<CNumberOpts>>) {
        Object.assign(this, opts)
    }
}

export class CMeaningfulStringOpts implements MeaningfulStringOpts {
    length = 5
    language: Language = 'en'
    separator = ''

    constructor(opts: Partial<ClassFields<CMeaningfulStringOpts>>) {
        Object.assign(this, opts)
    }
}
