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

    private insertAllIntoOrigin(words: string[]) {
        this.insertAllAfterNode(this.root, words)
    }

    private insertAllIntoTails(words: string[]) {
        const tails = this.findTails()

        tails.forEach(tail => this.insertAllAfterNode(tail, words))
    }

    /**
     * DFS approach based on stack (if you exchange a stack for a queue it will be BFS :D)
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