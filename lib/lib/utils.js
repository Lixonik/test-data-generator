"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeInitValueWithPartialOpts = exports.isDefined = exports.isNil = exports.isEmpty = exports.generatePreparedRuTrie = exports.generatePreparedTrie = exports.shuffleArray = void 0;
var trie_1 = require("./trie/trie");
var dictionary_1 = require("./locales/en/dictionary");
var dictionary_2 = require("./locales/ru/dictionary");
/**
 * Fisher-Yates Sorting Algorithm
 * https://www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/
 * @param array
 */
function shuffleArray(array) {
    var _a;
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = __read([array[j], array[i]], 2), array[i] = _a[0], array[j] = _a[1];
    }
    return array;
}
exports.shuffleArray = shuffleArray;
var generatePreparedTrie = function () {
    var trie = new trie_1.Trie();
    trie.insertDictionary(dictionary_1.PREFIXES, dictionary_1.WORDS, dictionary_1.SUFFIXES);
    return trie;
};
exports.generatePreparedTrie = generatePreparedTrie;
var generatePreparedRuTrie = function () {
    var trie = new trie_1.Trie();
    trie.insertDictionary(dictionary_2.PREFIXES, dictionary_2.WORDS, dictionary_2.SUFFIXES);
    return trie;
};
exports.generatePreparedRuTrie = generatePreparedRuTrie;
var isEmpty = function (obj) {
    return [Object, Array].includes((obj || {}).constructor) && !Object.entries(obj || {}).length;
};
exports.isEmpty = isEmpty;
var isNil = function (value) { return value === undefined || value === null; };
exports.isNil = isNil;
var isDefined = function (value) { return !(0, exports.isNil)(value); };
exports.isDefined = isDefined;
var mergeInitValueWithPartialOpts = function (partialOpts, initOpts) { return Object.assign(Object.create(initOpts.constructor.prototype), __assign(__assign({}, initOpts), partialOpts)); };
exports.mergeInitValueWithPartialOpts = mergeInitValueWithPartialOpts;
