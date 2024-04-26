import { Trie } from './trie/trie';
import { Nil } from './types';
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
