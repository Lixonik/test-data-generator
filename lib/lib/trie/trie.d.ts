export declare class TrieNode {
    children: Map<string, TrieNode>;
    isEndOfWord: boolean;
    constructor();
}
export declare class Trie {
    private readonly root;
    constructor();
    insert(word: string): void;
    insertDictionary(prefixes: string[], roots: string[], suffixes: string[]): void;
    private insertAllIntoOrigin;
    private insertAllIntoTails;
    /**
     * DFS approach based on stack (if you exchange a stack for a queue it will be BFS :D)
     * @param length
     * @param separator
     */
    getRandomFullString(length: number, separator?: string): string;
    private insertAfterNode;
    private insertAllAfterNode;
    private findTails;
}
