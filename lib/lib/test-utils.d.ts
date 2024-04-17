import { MeaningfulStringOpts, NumberOpts, PartNameOpts, StringOpts, UUID } from './types';
export declare const generateUUID: (strictRandom?: boolean) => UUID;
export declare const generateNumber: (opts?: Partial<NumberOpts>) => number;
export declare const generateString: (opts?: Partial<StringOpts>) => string;
/**
 * @param opts - Options object for length, gender, and type of name component
 * @param padej - The grammatical case in Russian
 */
export declare const generatePerson: (opts?: Partial<PartNameOpts>) => string;
export declare const generateMeaningfulString: (opts?: Partial<MeaningfulStringOpts>) => string;
