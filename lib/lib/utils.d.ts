import { Trie } from './trie/trie';
import { ClassFields, Nil, NumberOpts, PartNameOpts, StringOpts } from './types';
/**
 * Fisher-Yates Sorting Algorithm
 * https://www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/
 * @param array
 */
export declare function shuffleArray<T>(array: T[]): T[];
export declare const generatePreparedTrie: () => Trie;
export declare const generatePreparedRuTrie: () => Trie;
export declare const isEmpty: (obj: any) => boolean;
export declare const isNil: (value: unknown) => value is Nil;
export declare const isDefined: <T>(value: T | Nil) => value is T;
export declare const mergeInitValueWithPartialOpts: <T extends object>(partialOpts: Partial<T>, initOpts: T) => T;
export declare class CPartNameOpts {
    gender: PartNameOpts['gender'];
    type: PartNameOpts['type'];
    length: PartNameOpts['length'];
    language: PartNameOpts['language'];
    padej: PartNameOpts['padej'];
    constructor(opts: Partial<ClassFields<CPartNameOpts>>);
}
export declare class CStringOpts {
    charSet: StringOpts['charSet'];
    length: StringOpts['length'];
    constructor(opts: Partial<ClassFields<CStringOpts>>);
}
export declare class CNumberOpts {
    min: NumberOpts['min'];
    max: NumberOpts['max'];
    constructor(opts: Partial<ClassFields<CNumberOpts>>);
}
