/**
 * initialization classes
 */
import { ClassFields, Language, MeaningfulStringOpts, NumberOpts, PartNameOpts, StringOpts } from './types';
export declare class CPartNameOpts implements PartNameOpts {
    gender: PartNameOpts['gender'];
    type: PartNameOpts['type'];
    length: PartNameOpts['length'];
    language: PartNameOpts['language'];
    padej: PartNameOpts['padej'];
    constructor(opts: Partial<ClassFields<CPartNameOpts>>);
}
export declare class CStringOpts implements StringOpts {
    charSet: StringOpts['charSet'];
    length: StringOpts['length'];
    constructor(opts: Partial<ClassFields<CStringOpts>>);
}
export declare class CNumberOpts implements NumberOpts {
    min: number;
    max: number;
    constructor(opts: Partial<ClassFields<CNumberOpts>>);
}
export declare class CMeaningfulStringOpts implements MeaningfulStringOpts {
    length: number;
    language: Language;
    separator: string;
    constructor(opts: Partial<ClassFields<CMeaningfulStringOpts>>);
}
