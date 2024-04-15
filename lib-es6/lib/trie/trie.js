var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
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
import { isNil, shuffleArray } from '../utils';
var TrieNode = /** @class */ (function () {
    function TrieNode() {
        this.children = new Map();
        this.isEndOfWord = false;
    }
    return TrieNode;
}());
export { TrieNode };
var Trie = /** @class */ (function () {
    function Trie() {
        this.root = new TrieNode();
    }
    Trie.prototype.insert = function (word) {
        this.insertAfterNode(this.root, word);
    };
    Trie.prototype.insertDictionary = function (prefixes, roots, suffixes) {
        this.insertAllIntoOrigin(prefixes);
        this.insertAllIntoTails(roots);
        this.insertAllIntoTails(suffixes);
    };
    Trie.prototype.search = function (word) {
        var current = this.root;
        for (var i = 0; i < word.length; i++) {
            var ch = word.charAt(i);
            var node = current.children.get(ch);
            if (isNil(node)) {
                return false;
            }
            current = node;
        }
        return current.isEndOfWord;
    };
    Trie.prototype.delete = function (word) {
        var current = this.root;
        var parentsStack = [];
        for (var i = 0; i < word.length; i++) {
            var ch = word[i];
            parentsStack.push(current);
            if (!current.children.has(ch)) {
                return false;
            }
            current = current.children.get(ch);
        }
        if (!current.isEndOfWord) {
            return false;
        }
        current.isEndOfWord = false;
        var isLeaf = current.children.size === 0;
        for (var i = word.length - 1; i >= 0; i--) {
            var ch = word[i];
            var parent_1 = parentsStack.pop();
            if (isLeaf) {
                parent_1.children.delete(ch);
            }
            isLeaf = parent_1.children.size === 0 && !parent_1.isEndOfWord;
            if (!isLeaf) {
                break;
            }
        }
        return true;
    };
    Trie.prototype.insertAllIntoOrigin = function (words) {
        this.insertAllAfterNode(this.root, words);
    };
    Trie.prototype.insertAllIntoTails = function (words) {
        var _this = this;
        var tails = this.findTails();
        tails.forEach(function (tail) { return _this.insertAllAfterNode(tail, words); });
    };
    /**
     * DFS approach based on stack (if you exchange a stack for a queue it will be BFS)
     * @param length
     * @param separator
     */
    Trie.prototype.getRandomFullString = function (length, separator) {
        var e_1, _a;
        if (separator === void 0) { separator = ''; }
        var stack = [{ node: this.root, word: '', accumulatedLength: 0 }];
        var wordsArray = [];
        while (stack.length > 0 && wordsArray.join(separator).length < length) {
            var _b = stack.pop(), node = _b.node, word = _b.word, accumulatedLength = _b.accumulatedLength;
            if (node.isEndOfWord) {
                var newWord = "".concat(wordsArray.join(separator)).concat(separator).concat(word);
                if (newWord.length <= length) {
                    wordsArray.push(word);
                }
                else {
                    break;
                }
            }
            var shuffledChildren = shuffleArray(Array.from(node.children.entries()));
            try {
                for (var shuffledChildren_1 = (e_1 = void 0, __values(shuffledChildren)), shuffledChildren_1_1 = shuffledChildren_1.next(); !shuffledChildren_1_1.done; shuffledChildren_1_1 = shuffledChildren_1.next()) {
                    var _c = __read(shuffledChildren_1_1.value, 2), char = _c[0], nextNode = _c[1];
                    stack.push({
                        node: nextNode,
                        word: word + char,
                        accumulatedLength: accumulatedLength + char.length,
                    });
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (shuffledChildren_1_1 && !shuffledChildren_1_1.done && (_a = shuffledChildren_1.return)) _a.call(shuffledChildren_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return wordsArray.join(separator).substring(0, length);
    };
    Trie.prototype.insertAfterNode = function (root, word) {
        var current = root;
        for (var i = 0; i < word.length; i++) {
            var ch = word.charAt(i);
            var node = current.children.get(ch);
            if (isNil(node)) {
                node = new TrieNode();
                current.children.set(ch, node);
            }
            current = node;
        }
        current.isEndOfWord = true;
    };
    Trie.prototype.insertAllAfterNode = function (root, words) {
        var _this = this;
        words.forEach(function (word) { return _this.insertAfterNode(root, word); });
    };
    Trie.prototype.findTails = function () {
        var e_2, _a;
        var tails = [];
        var stack = [this.root];
        while (stack.length > 0) {
            var node = stack.pop();
            if (node.isEndOfWord) {
                tails.push(node);
            }
            try {
                for (var _b = (e_2 = void 0, __values(node.children.values())), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var child = _c.value;
                    stack.push(child);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        return tails;
    };
    return Trie;
}());
export { Trie };
