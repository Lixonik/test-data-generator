var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import { Trie } from './trie/trie';
import { PREFIXES as EN_PREFIXES, SUFFIXES as EN_SUFFIXES, WORDS as EN_WORDS } from './locales/en/dictionary';
import { PREFIXES as RU_PREFIXES, SUFFIXES as RU_SUFFIXES, WORDS as RU_WORDS } from './locales/ru/dictionary';
import { ENGLISH_ALPHABET } from './constants';
/**
 * Fisher-Yates Sorting Algorithm
 * https://www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/
 * @param array
 */
export function shuffleArray(array) {
    var _a;
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = __read([array[j], array[i]], 2), array[i] = _a[0], array[j] = _a[1];
    }
    return array;
}
export var generatePreparedTrie = function () {
    var trie = new Trie();
    trie.insertDictionary(EN_PREFIXES, EN_WORDS, EN_SUFFIXES);
    return trie;
};
export var generatePreparedRuTrie = function () {
    var trie = new Trie();
    trie.insertDictionary(RU_PREFIXES, RU_WORDS, RU_SUFFIXES);
    return trie;
};
export var isEmpty = function (obj) {
    return [Object, Array].includes((obj || {}).constructor) && !Object.entries(obj || {}).length;
};
export var isNil = function (value) { return value === undefined || value === null; };
export var isDefined = function (value) { return !isNil(value); };
export var mergeInitValueWithPartialOpts = function (partialOpts, initOpts) { return Object.assign(Object.create(initOpts.constructor.prototype), __assign(__assign({}, initOpts), partialOpts)); };
var CPartNameOpts = /** @class */ (function () {
    function CPartNameOpts(opts) {
        this.gender = 'male';
        this.type = 'surname';
        this.length = 'medium';
        this.language = 'en';
        this.padej = 'nominative';
        Object.assign(this, opts);
    }
    return CPartNameOpts;
}());
export { CPartNameOpts };
var CStringOpts = /** @class */ (function () {
    function CStringOpts(opts) {
        this.charSet = ENGLISH_ALPHABET;
        this.length = 5;
        Object.assign(this, opts);
    }
    return CStringOpts;
}());
export { CStringOpts };
var CNumberOpts = /** @class */ (function () {
    function CNumberOpts(opts) {
        this.min = 0;
        this.max = 100;
        Object.assign(this, opts);
    }
    return CNumberOpts;
}());
export { CNumberOpts };
