import { isNil, shuffleArray } from '../utils'
import { StackItem } from '../types'

export class TrieNode {
    children: Map<string, TrieNode>
    isEndOfWord: boolean

    constructor() {
        this.children = new Map<string, TrieNode>()
        this.isEndOfWord = false
    }
}

export class Trie {
    private readonly root: TrieNode

    constructor() {
        this.root = new TrieNode()
    }

    insert(word: string) {
        this.insertAfterNode(this.root, word)
    }

    insertDictionary(prefixes: string[], roots: string[], suffixes: string[]) {
        this.insertAllIntoOrigin(prefixes)
        this.insertAllIntoTails(roots)
        this.insertAllIntoTails(suffixes)
    }


    search(word: string): boolean {
        let current = this.root
        for (let i = 0; i < word.length; i++) {
            let ch = word.charAt(i)
            let node = current.children.get(ch)
            if (isNil(node)) {
                return false
            }
            current = node
        }

        return current.isEndOfWord
    }

    delete(word: string): boolean {
        let current = this.root
        let parentsStack = []
        for (let i = 0; i < word.length; i++) {
            let ch = word[i]
            parentsStack.push(current)

            if (!current.children.has(ch)) {
                return false
            }
            current = current.children.get(ch)!
        }

        if (!current.isEndOfWord) {
            return false
        }

        current.isEndOfWord = false
        let isLeaf = current.children.size === 0

        for (let i = word.length - 1; i >= 0; i--) {
            let ch = word[i]
            let parent = parentsStack.pop()!

            if (isLeaf) {
                parent.children.delete(ch)
            }

            isLeaf = parent.children.size === 0 && !parent.isEndOfWord
            if (!isLeaf) {
                break
            }
        }

        return true
    }

    private insertAllIntoOrigin(words: string[]) {
        this.insertAllAfterNode(this.root, words)
    }


    private insertAllIntoTails(words: string[]) {
        const tails = this.findTails()

        tails.forEach(tail => this.insertAllAfterNode(tail, words))
    }

    /**
     * DFS approach based on stack (if you exchange a stack for a queue it will be BFS)
     * @param length
     * @param separator
     */

    getRandomFullString(length: number, separator: string = ''): string {
        const stack: StackItem[] = [{ node: this.root, word: '', accumulatedLength: 0 }]
        const wordsArray: string[] = []

        while (stack.length > 0 && wordsArray.join(separator).length < length) {
            const { node, word, accumulatedLength }: StackItem = stack.pop()!

            if (node.isEndOfWord) {
                const newWord = `${wordsArray.join(separator)}${separator}${word}`

                if (newWord.length <= length) {
                    wordsArray.push(word)
                } else {
                    break
                }
            }

            const shuffledChildren = shuffleArray(Array.from(node.children.entries()))

            for (const [char, nextNode] of shuffledChildren) {
                stack.push({
                    node: nextNode,
                    word: word + char,
                    accumulatedLength: accumulatedLength + char.length,
                })
            }
        }

        return wordsArray.join(separator).substring(0, length)
    }

    private insertAfterNode(root: TrieNode, word: string) {
        let current = root
        for (let i = 0; i < word.length; i++) {
            let ch = word.charAt(i)
            let node = current.children.get(ch)
            if (isNil(node)) {
                node = new TrieNode()
                current.children.set(ch, node)
            }
            current = node
        }
        current.isEndOfWord = true
    }

    private insertAllAfterNode(root: TrieNode, words: string[]) {
        words.forEach(word => this.insertAfterNode(root, word))
    }

    private findTails(): TrieNode[] {
        let tails: TrieNode[] = []
        let stack: TrieNode[] = [this.root]

        while (stack.length > 0) {
            let node = stack.pop()!

            if (node.isEndOfWord) {
                tails.push(node)
            }

            for (let child of node.children.values()) {
                stack.push(child)
            }
        }

        return tails
    }
}