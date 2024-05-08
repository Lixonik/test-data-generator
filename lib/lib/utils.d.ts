import { Trie } from './trie/trie';
import { Nil, PartNameOpts } from './types';
/**
 * Fisher-Yates Sorting Algorithm
 * https://www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/
 * @param array
 */
export declare function shuffleArray<T>(array: T[]): T[];
export declare const generatePreparedTrie: () => Trie;
export declare const generatePreparedRuTrie: () => Trie;
/**
 * Declines the given Russian word based on its type and case.
 */
export declare const declineWord: (word: string, type: PartNameOpts['type'], gender: PartNameOpts['gender'], padej: PartNameOpts['padej']) => string;
export declare const isNil: (value: unknown) => value is Nil;
