import { v4 as uuidGenerator } from 'uuid'
import {
    arrayToUUID,
    generatePreparedRusTrie,
    generatePreparedTrie,
    randomArray16bytes,
    shuffleUint8Array,
} from './utils'
import { CashedValues, UUID } from './types'

export default class TestUtils {
    private static cashedArrayForUUID = randomArray16bytes()
    private static tries = {
        rus: generatePreparedRusTrie(),
        en: generatePreparedTrie(),
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

    static generateUUID(strictRandom: boolean = false): UUID {
        if (strictRandom) return uuidGenerator() as UUID

        TestUtils.shuffleCashedArray()

        return TestUtils.generateUUIDFromCashedArray()
    }


    private static generateUUIDFromCashedArray(): UUID {
        const randomArray = TestUtils.cashedArrayForUUID ?? randomArray16bytes()

        // set bits for v4 and `clock_seq_hi_and_reserved`
        randomArray[6] = (randomArray[6] & 0x0f) | 0x40
        randomArray[8] = (randomArray[8] & 0x3f) | 0x80

        return arrayToUUID(randomArray)
    }

    private static shuffleCashedArray() {
        shuffleUint8Array(TestUtils.cashedArrayForUUID)
    }

    static generateMeaningfulString(length: number, separator?: string): string {
        return this.tries.en.getRandomFullString(length, separator)
    }

    static generateMeaningfulRusString(length: number, separator?: string): string {
        return this.tries.rus.getRandomFullString(length, separator)
    }
}
