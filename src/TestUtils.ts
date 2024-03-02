import { randomUUID as nativeGenerator, UUID } from 'node:crypto'
import {
    arrayToUUID,
    generatePreparedRusTrie,
    generatePreparedTrie,
    randomArray16bytes,
    shuffleUint8Array,
} from './utils'
import { CashedValues } from './types'

export default class TestUtils {
    private static cashed: CashedValues = {
        array: randomArray16bytes(),
        tries: {
            rus: generatePreparedRusTrie(),
            en: generatePreparedTrie(),
        },
    }

    static generateUUID(strictRandom: boolean = false): UUID {
        if (strictRandom) return nativeGenerator()

        TestUtils.shuffleCashedArray()

        return TestUtils.generateUUIDFromCashedArray()
    }

    static comparePerformance(...functions: Function[]) {
        functions.forEach(fn => TestUtils.measurePerformance(fn))
    }

    private static measurePerformance(fn: Function) {
        const count = 1_000

        let all = []
        for (let i = 0; i < count; i++) {
            performance.mark(`start ${fn.name}`)
            fn()
            performance.mark(`end ${fn.name}`)
            performance.measure(`${fn.name}`, `start ${fn.name}`, `end ${fn.name}`)
            all.push(performance.getEntriesByName(`${fn.name}`)[0].duration)
        }

        console.log(`${fn.name}: avg ${count} loops = ${all.reduce((acc, v) => acc + v, 0) / all.length} ms`)
    }

    private static generateUUIDFromCashedArray(): UUID {
        const randomArray = TestUtils.cashed.array ?? randomArray16bytes()

        // set bits for v4 and `clock_seq_hi_and_reserved`
        randomArray[6] = (randomArray[6] & 0x0f) | 0x40
        randomArray[8] = (randomArray[8] & 0x3f) | 0x80

        return arrayToUUID(randomArray)
    }

    private static shuffleCashedArray() {
        shuffleUint8Array(TestUtils.cashed.array)
    }

    static generateMeaningfulString(length: number, separator?: string): string {
        return this.cashed.tries.en.getRandomFullString(length, separator)
    }

    static generateMeaningfulRusString(length: number, separator?: string): string {
        return this.cashed.tries.rus.getRandomFullString(length, separator)
    }
}
