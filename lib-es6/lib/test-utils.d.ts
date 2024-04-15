import { NumberOpts, PartNameOpts, StringOpts, UUID } from './types';
export declare const generateUUID: (strictRandom?: boolean) => UUID;
export declare const generateMeaningfulString: (length: number, separator?: string) => string;
export declare const generateMeaningfulRuString: (length: number, separator?: string) => string;
export declare const generateRandomString: (opts?: Partial<StringOpts>) => string;
export declare const generateRandomNumber: (opts?: Partial<NumberOpts>) => number;
/**
 * @param opts - Options object for length, gender, and type of name component
 * @param padej - The grammatical case in Russian
 */
export declare const generatePerson: (opts?: Partial<PartNameOpts>) => string;
