import { shuffleArray } from '../utils'

class TrieNode {
    children: Map<string, TrieNode>
    isEndOfWord: boolean

    constructor() {
        this.children = new Map<string, TrieNode>()
        this.isEndOfWord = false
    }
}

export class Trie {
    root: TrieNode

    constructor() {
        this.root = new TrieNode()
    }

    insert(word: string) {
        let current = this.root
        for (let i = 0; i < word.length; i++) {
            let ch = word.charAt(i)
            let node = current.children.get(ch)
            if (node == null) {
                node = new TrieNode()
                current.children.set(ch, node)
            }
            current = node
        }
        current.isEndOfWord = true
    }

    search(word: string): boolean {
        let current = this.root
        for (let i = 0; i < word.length; i++) {
            let ch = word.charAt(i)
            let node = current.children.get(ch)
            if (node == null) {
                return false
            }
            current = node
        }
        return current.isEndOfWord
    }

    delete(word: string): boolean {
        return this.deleteRecursive(this.root, word, 0)
    }

    private deleteRecursive(current: TrieNode, word: string, index: number): boolean {
        if (index === word.length) {
            if (!current.isEndOfWord) {
                return false
            }
            current.isEndOfWord = false
            return current.children.size === 0
        }
        let ch = word.charAt(index)
        let node = current.children.get(ch)
        if (node == null) {
            return false
        }
        let shouldDeleteCurrentNode = this.deleteRecursive(node, word, index + 1)

        if (shouldDeleteCurrentNode) {
            current.children.delete(ch)
            return current.children.size === 0
        }
        return false
    }

    getRandomFullString(length: number): string {
        const wordsArray: string[] = []
        let lengthOfUpdatedWordsArray: number = 0

        const traverseTrie = (node: TrieNode, prefix: string) => {
            lengthOfUpdatedWordsArray = [...wordsArray, prefix].join('').length

            if (node.isEndOfWord && lengthOfUpdatedWordsArray <= length) {
                wordsArray.push(prefix)
                return
            }
            const shuffledChildren = shuffleArray(Array.from(node.children.entries()))

            shuffledChildren.forEach(([char, child]) => traverseTrie(child, prefix + char))
        }

        // 1st level of recursion
        traverseTrie(this.root, '')

        const fullString = wordsArray.join('')
        const lengthDiff = length - fullString.length

        if (wordsArray.length === 0) {
            throw new Error('No meaningful words of specified length found.')
        }

        return lengthDiff === 0
            ? fullString
            // 2nd level of recursion
            : `${fullString}${this.getRandomFullString(lengthDiff)}`
    }

}